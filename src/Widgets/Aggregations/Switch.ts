import template from './../../Html/Aggregations/switch.html';
import {Aggregation} from './../../Imports/BaseClasses';
import Mustache from 'mustache';
import {Events, URIHelper} from '../../Imports/Helpers';
// eslint-disable-next-line no-unused-vars
import {SwitchSettings} from '../../Imports/Interfaces';

export class Switch extends Aggregation {
    discriminator: string = 'Switch';
    onValue: string = 'On';
    offValue: string = 'Off';
    attributeValue: string;

    constructor(options: SwitchSettings = {}) {
        super(options);

        this.setOnValue(options.on_value || this.getOnValue());
        this.setOffValue(options.off_value || this.getOffValue());
        this.setAttributeValue(options.attribute_value || this.getAttributeValue());

        this.value = {
            field: this.getAttribute(),
            value: '',
            is_aggregation: true,
            exclude_from_search: true,
        };
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

    render(): string {
        const template = this.getTemplate();
        return Mustache.render(template, {
            title: this.getTitle(),
            class_title: this.getClassTitle(),
            name: this.getClassTitle(),
            on_value: this.getOnValue(),
            off_value: this.getOffValue(),
            collapsible: (this.getCollapsible()) ? 'needletail-collapsible' : '',
            collapsed: (this.getCollapsible() && this.getDefaultCollapsed()) ? 'needletail-collapsed' : '',
        });
    }

    /**
     * Add listeners, set the default value
     */
    executeJS() {
        const title = this.getTitle();
        const prevVal = URIHelper.getSearchParam(title);

        // eslint-disable-next-line max-len
        document.querySelectorAll(`.needletail-aggregation-switch-input.needletail-aggregation-switch-input-${this.getClassTitle()}`)
            .forEach((element: HTMLInputElement) => {
                // Set the default value
                element.checked = (URIHelper.getSearchParam(title) === this.getAttributeValue());

                element.addEventListener('change', () => {
                    this.handle(element);
                });

                if (element.checked) {
                    this.hasActiveAggregation = true;
                    Events.emit(Events.onAggregationValueChange, {
                        'name': this.getAttribute(),
                        'hasActive': this.hasActiveAggregation,
                    });
                }
            });

        // eslint-disable-next-line max-len
        document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-switch.needletail-aggregation-switch-${this.getClassTitle()}`)
            .forEach((element) => {
                if (this.getCollapsible()) {
                    element.querySelector('.needletail-aggregation-switch-title')
                        .addEventListener('click', (e) => {
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
            field: this.getAttribute(),
            value: prevVal,
            is_aggregation: true,
        };
    }

    handle(element: any, skipHistory = false) {
        const attributeValue = this.getAttributeValue();
        if (!skipHistory) {
            URIHelper.addToHistory(this.getTitle(), attributeValue, true);
        }

        if (this.values[attributeValue]) {
            delete this.values[attributeValue];
        } else {
            this.values[attributeValue] = attributeValue;
        }

        this.value = {
            field: this.getAttribute(),
            value: (this.values[attributeValue]) ? attributeValue : '',
            is_aggregation: true,
        };

        this.hasActiveAggregation = true;
        if (!this.values[attributeValue]) {
            this.value = {
                field: this.getAttribute(),
                value: '',
                is_aggregation: true,
                exclude_from_search: true,
            };

            this.hasActiveAggregation = false;
        }

        Events.emit(Events.onBeforeResultRequest, {});
        Events.emit(Events.onAggregationValueChange, {
            'name': this.getAttribute(),
            'hasActive': this.hasActiveAggregation,
        });
    }

    reset() {
        // eslint-disable-next-line max-len
        document.querySelectorAll(`.needletail-aggregation-switch-input.needletail-aggregation-switch-input-${this.getClassTitle()}`)
            .forEach((element: HTMLInputElement) => {
                if (element.checked) {
                    element.checked = false;
                    this.handle(element);
                }
            });
    }
}
