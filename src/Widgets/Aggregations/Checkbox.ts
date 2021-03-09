import template from './../../Html/Aggregations/checkbox.html';
import {Aggregation} from './../../Imports/BaseClasses';
import Mustache from 'mustache';
import {Events, URIHelper} from '../../Imports/Helpers';
// eslint-disable-next-line no-unused-vars
import {CheckboxSettings} from '../../Imports/Interfaces';

export class Checkbox extends Aggregation {
    discriminator: string = 'Checkbox';
    hideOnEmpty: boolean = true;

    constructor(options: CheckboxSettings = {}) {
        super(options);

        this.setHideOnEmpty(options.hide_on_empty || this.getHideOnEmpty());

        this.value = {
            field: this.getAttribute(),
            value: '',
            is_aggregation: true,
            exclude_from_search: true,
        };
    }

    getTemplate(): string {
        if (this.template) {
            return this.template;
        }

        return template;
    }

    setHideOnEmpty(hideOnEmpty: boolean): Checkbox {
        this.hideOnEmpty = hideOnEmpty;
        return this;
    }

    getHideOnEmpty(): boolean {
        return this.hideOnEmpty;
    }

    render(options: {}[] = []): string {
        const template = this.getTemplate();
        return Mustache.render(template, {
            title: this.getTitle(),
            classTitle: this.getClassTitle(),
            options: options,
            collapsible: (this.getCollapsible()) ? 'needletail-collapsible' : '',
            collapsed: (this.getCollapsible() && this.getDefaultCollapsed()) ? 'needletail-collapsed' : '',
        });
    }

    /**
     * Add listeners, set the default value
     */
    executeJS() {
        const title = this.getTitle();

        document.addEventListener(Events.onAggsUpdate, (e: CustomEvent) => {
            if (e.detail[this.getAttribute()]) {
                const options: {}[] = [];
                e.detail[this.getAttribute()].forEach((val: any) => {
                    options.push({
                        name: title,
                        ...val,
                    });
                });

                // Whenever the aggregation gets updated it has to be rerendered
                const textElement = this.render(options);
                const node = document.createRange().createContextualFragment(textElement);
                let wasCollapsed = false;
                // eslint-disable-next-line max-len
                document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-checkbox.needletail-aggregation-checkbox-${this.getClassTitle()}`)
                    .forEach((element) => {
                        wasCollapsed = element.classList.contains('needletail-collapsed');
                        element.replaceWith(node.cloneNode(true));
                    });

                // eslint-disable-next-line max-len
                document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-checkbox.needletail-aggregation-checkbox-${this.getClassTitle()}`)
                    .forEach((element) => {
                        if (this.getCollapsible()) {
                            element.addEventListener('click', (e) => {
                                if (element.classList.contains('needletail-collapsed')) {
                                    element.classList.remove('needletail-collapsed');
                                } else {
                                    element.classList.add('needletail-collapsed');
                                }
                            });

                            if (wasCollapsed) {
                                element.classList.add('needletail-collapsed');
                            }
                        }

                        element.setAttribute('data-option-count', options.length.toString());

                        if (this.getHideOnEmpty()) {
                            if (options.length === 0) {
                                element.classList.add('needletail-empty');
                            } else {
                                element.classList.remove('needletail-empty');
                            }
                        }
                    });

                // eslint-disable-next-line max-len
                document.querySelectorAll(`.needletail-aggregation-checkbox-option-input.needletail-aggregation-checkbox-option-input-${this.getClassTitle()}`)
                    .forEach((element: HTMLInputElement) => {
                        element.addEventListener('change', () => {
                            this.handle(element);
                        });
                    });

                // Set the default value for the aggregation
                const params = URIHelper.getSearchParams(title);

                if (params) {
                    params.forEach((value: string) => {
                        // eslint-disable-next-line max-len
                        const elements = document.querySelectorAll(`.needletail-aggregation-checkbox-option-input-${this.getClassTitle()}[value='${value}']`);

                        elements.forEach((element: HTMLInputElement) => {
                            element.checked = true;
                        });
                    });
                }
            }
        });

        const params = URIHelper.getSearchParams(title);

        // On load set the values for the aggregation search
        if (params) {
            params.forEach((value: string) => {
                if (value) {
                    this.values[value] = value;
                }
            });

            this.value = {
                field: this.getAttribute(),
                value: Object.keys(this.values),
                is_aggregation: true,
            };

            this.hasActiveAggregation = true;
            if (Object.keys(this.values).length === 0) {
                this.hasActiveAggregation = false;

                this.value = {
                    field: this.getAttribute(),
                    value: '',
                    is_aggregation: true,
                    exclude_from_search: true,
                };
            }

            Events.emit(Events.onAggregationValueChange, {
                'name': this.getAttribute(),
                'hasActive': this.hasActiveAggregation,
            });
        }
    }

    handle(element: any, skipHistory = false) {
        if (!skipHistory) {
            URIHelper.addToHistory(this.getTitle(), element.value, true);
        }

        if (this.values[element.value]) {
            delete this.values[element.value];
        } else {
            this.values[element.value] = element.value;
        }

        this.value = {
            field: this.getAttribute(),
            value: Object.keys(this.values),
            is_aggregation: true,
        };

        this.hasActiveAggregation = true;
        if (Object.keys(this.values).length === 0) {
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
        this.value = {
            field: this.getAttribute(),
            value: '',
            is_aggregation: true,
            exclude_from_search: true,
        };

        // eslint-disable-next-line max-len
        document.querySelectorAll(`.needletail-aggregation-checkbox-option-input.needletail-aggregation-checkbox-option-input-${this.getClassTitle()}`)
            .forEach((element: HTMLInputElement) => {
                if (element.checked) {
                    element.checked = false;
                    this.handle(element);
                }
            });
    }
}
