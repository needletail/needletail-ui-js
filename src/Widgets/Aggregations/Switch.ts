import template from './../../Html/Aggregations/switch.html';
import skeletonTemplate from './../../Html/Skeletons/switch.html';
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
    defaultOn: boolean = false;

    constructor(options: SwitchSettings = {}) {
        super(options);

        this.setOnValue(options.on_value || this.getOnValue());
        this.setOffValue(options.off_value || this.getOffValue());
        this.setAttributeValue((typeof options.attribute_value !== 'undefined') ?
            options.attribute_value : this.getOnValue());
        this.setDefaultOn((typeof options.default_on !== 'undefined') ?
            options.default_on : this.getDefaultOn());

        // Ensure the initial value is correct for the very first request (even when using skeletons)
        const title = this.getTitle();
        const urlVal = URIHelper.getSearchParam(title);
        const attributeValue = this.getAttributeValue();
        const hasUrlValue = (urlVal !== null && urlVal !== '');
        const isOn = (hasUrlValue) ? (urlVal === attributeValue) : this.getDefaultOn();

        this.values = {};
        this.hasActiveAggregation = isOn;

        this.value = {
            field: this.getAttribute(),
            value: (isOn) ? attributeValue : '',
            is_aggregation: true,
        };

        if (!isOn) {
            this.value.exclude_from_search = true;
        } else {
            this.values[attributeValue] = attributeValue;
        }
    }

    setAttributeValue(attributeValue: string): Switch {
        this.attributeValue = attributeValue;
        return this;
    }

    getAttributeValue(): string {
        return String(this.attributeValue ?? '');
    }

    setDefaultOn(defaultOn: boolean): Switch {
        this.defaultOn = defaultOn;
        return this;
    }

    getDefaultOn(): boolean {
        return this.defaultOn;
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

    getSkeletonTemplate(): string {
        if (this.skeletonTemplate) {
            return this.skeletonTemplate;
        }

        return skeletonTemplate;
    }

    renderSkeleton(): string {
        const rendered = Mustache.render(this.getSkeletonTemplate(), {
            class_title: this.getClassTitle(),
        });

        return rendered;
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
        if (this.getUseSkeleton()) {
            document.addEventListener(Events.onAfterResultRequest, (e: CustomEvent) => {
                const textElement = this.render();
                const node = document.createRange().createContextualFragment(textElement);

                document.querySelectorAll(`.needletail-aggregation-switch-${this.getClassTitle()}`).forEach((element) => {
                    element.replaceWith(node);
                    this.initialize();
                    Events.emit(Events.initializeSwitch);
                });
            });
        } else {
            this.initialize();

            document.addEventListener(Events.initNeedletail, () => {
                Events.emit(Events.initializeSwitch);
            });
        }
    }

    initialize() {
        const title = this.getTitle();
        const urlVal = URIHelper.getSearchParam(title);
        const attributeValue = this.getAttributeValue();
        const hasUrlValue = (urlVal !== null && urlVal !== '');
        const isOn = (hasUrlValue) ? (urlVal === attributeValue) : this.getDefaultOn();

        // eslint-disable-next-line max-len
        document.querySelectorAll(`.needletail-aggregation-switch-input.needletail-aggregation-switch-input-${this.getClassTitle()}`)
            .forEach((element: HTMLInputElement) => {
                // Set the default value
                element.checked = isOn;

                element.addEventListener('change', () => {
                    this.handle(element);
                });
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

        // Sync internal state for initial request building
        this.values = {};
        this.hasActiveAggregation = isOn;

        if (isOn) {
            this.values[attributeValue] = attributeValue;
            this.value = {
                field: this.getAttribute(),
                value: attributeValue,
                is_aggregation: true,
            };

            Events.emit(Events.onAggregationValueChange, {
                'initial': true,
                'name': this.getAttribute(),
                'hasActive': this.hasActiveAggregation,
                'value': attributeValue,
            });
        } else {
            this.value = {
                field: this.getAttribute(),
                value: '',
                is_aggregation: true,
                exclude_from_search: true,
            };
        }
    }

    handle(element: any, skipHistory = false) {
        const attributeValue = this.getAttributeValue();
        if (!skipHistory) {
            URIHelper.addToHistory(this.getTitle(), (element.checked) ? attributeValue : '');
        }

        if (element.checked) {
            this.values[attributeValue] = attributeValue;
        } else if (this.values[attributeValue]) {
            delete this.values[attributeValue];
        }

        this.value = {
            field: this.getAttribute(),
            value: (element.checked) ? attributeValue : '',
            is_aggregation: true,
        };

        this.hasActiveAggregation = element.checked;
        if (!element.checked) {
            this.value.exclude_from_search = true;
        }

        Events.emit(Events.onBeforeResultRequest, {});
        Events.emit(Events.onAggregationValueChange, {
            'initial': false,
            'name': this.getAttribute(),
            'hasActive': this.hasActiveAggregation,
            'value': this.value.value,
        });
    }

    reset() {
        const desired = this.getDefaultOn();
        let didHandle = false;

        // eslint-disable-next-line max-len
        document.querySelectorAll(`.needletail-aggregation-switch-input.needletail-aggregation-switch-input-${this.getClassTitle()}`)
            .forEach((element: HTMLInputElement) => {
                const shouldHandle = (!didHandle && element.checked !== desired);
                element.checked = desired;

                if (shouldHandle) {
                    didHandle = true;
                    this.handle(element);
                }
            });
    }
}
