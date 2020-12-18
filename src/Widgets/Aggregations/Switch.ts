import template from './../../Html/Aggregations/switch.html';
import { Aggregation } from './../../Imports/BaseClasses';
import Mustache from "mustache";
import {Events, URIHelper} from "../../Imports/Helpers";
import {SwitchSettings} from "../../Imports/Interfaces";

export class Switch extends Aggregation {
    discriminator: string = 'Switch';
    onValue: string = 'On';
    offValue: string = 'Off';
    attributeValue: string;

    constructor(options: SwitchSettings = {}) {
        super(options);

        this.onValue = options.on_value || this.onValue;
        this.offValue = options.off_value || this.offValue;
        this.attributeValue = options.attribute_value || this.attributeValue;

        this.value = {
            field: this.attribute,
            value: '',
            is_aggregation: true,
            exclude_from_search: true,
        }
    }

    setAttributeValue(attributeValue: string): Switch {
        this.attributeValue = attributeValue;
        return this;
    }

    getAttributeValue(): string {
        return this.attributeValue;
    }

    setOnValue(onValue: string): Switch {
        this.onValue = onValue;
        return this;
    }

    getOnValue(): string {
        return this.onValue;
    }

    setOffValue(offValue: string): Switch {
        this.offValue = offValue;
        return this;
    }

    getOffValue(): string {
        return this.offValue;
    }

    getTemplate(): string {
        if (this.template) {
            return this.template;
        }

        return template;
    }

    /**
     * Renders the template for the aggregation
     * @param options
     */
    render(): string {
        let template = this.getTemplate();
        return Mustache.render(template, {
            title: this.getTitle(),
            classTitle: this.classTitle,
            name: this.getTitle(),
            onValue: this.getOnValue(),
            offValue: this.getOffValue(),
            collapsible: (this.getCollapsible()) ? 'needletail-collapsible' : '',
            collapsed: (this.getCollapsible() && this.getDefaultCollapsed()) ? 'needletail-collapsed' : ''
        });
    }

    /**
     * Add listeners, set the default value
     */
    executeJS() {
        let title = this.getTitle();
        let prevVal = URIHelper.getSearchParam(title);

        document.querySelectorAll(`.needletail-aggregation-switch-input.needletail-aggregation-switch-input-${this.classTitle}`).forEach((element: HTMLInputElement) => {
            // Set the default value
            element.checked = (URIHelper.getSearchParam(title) === this.getAttributeValue());

            element.addEventListener('change', () => {
                this.handle(element);
            });
        });

        document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-switch.needletail-aggregation-switch-${this.classTitle}`).forEach((element) => {
            if (this.getCollapsible()) {
                element.addEventListener('click', (e) => {
                    if (element.classList.contains('needletail-collapsed')) {
                        element.classList.remove('needletail-collapsed');
                    } else {
                        element.classList.add('needletail-collapsed');
                    }
                });
            }
        });

        this.values[prevVal] = prevVal;
        this.value = {
            field: this.attribute,
            value: prevVal,
            is_aggregation: true
        };
    }

    /**
     * Handles the setting of the URL and putting the correct value in for the search
     * @param element
     * @param skipHistory
     */
    handle(element: any, skipHistory = false) {
        let attributeValue = this.getAttributeValue();
        if (!skipHistory) {
            URIHelper.addToHistory(this.getTitle(), attributeValue, true);
        }

        if (this.values[attributeValue]) {
            delete this.values[attributeValue];
        }
        else {
            this.values[attributeValue] = attributeValue
        }

        this.value = {
            field: this.attribute,
            value: (this.values[attributeValue]) ? attributeValue : '',
            is_aggregation: true
        };

        if (!this.values[attributeValue]) {
            this.value = {
                field: this.attribute,
                value: '',
                is_aggregation: true,
                exclude_from_search: true,
            }
        }

        Events.emit(Events.onBeforeResultRequest, {});
    }

    reset() {
        document.querySelectorAll(`.needletail-aggregation-switch-input.needletail-aggregation-switch-input-${this.classTitle}`).forEach((element: HTMLInputElement) => {
            if (element.checked) {
                element.checked = false;
                this.handle(element);
            }
        });
    }
}
