import template from './../../Html/Aggregations/radio.html';
import {Aggregation} from './../../Imports/BaseClasses';
import Mustache from 'mustache';
// eslint-disable-next-line no-unused-vars
import {RadioSettings} from '../../Imports/Interfaces';
import {Events, URIHelper} from '../../Imports/Helpers';

export class Radio extends Aggregation {
    discriminator: string = 'Radio';
    hideOnEmpty: boolean = true;

    constructor(options: RadioSettings = {}) {
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

    setHideOnEmpty(hideOnEmpty: boolean): Radio {
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
        const prevVal = URIHelper.getSearchParam(title);

        document.addEventListener(Events.onAggsUpdate, (e: CustomEvent) => {
            if (e.detail[this.getAttribute()]) {
                const options: {}[] = [];
                e.detail[this.getAttribute()].forEach((val: any) => {
                    options.push({
                        name: title,
                        ...val,
                    });
                });

                // Re-render the options
                const textElement = this.render(options);
                const node = document.createRange().createContextualFragment(textElement);
                let wasCollapsed = false;
                // eslint-disable-next-line max-len
                document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-radio.needletail-aggregation-radio-${this.getClassTitle()}`)
                    .forEach((element) => {
                        wasCollapsed = element.classList.contains('needletail-collapsed');
                        element.replaceWith(node.cloneNode(true));
                    });

                // eslint-disable-next-line max-len
                document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-radio.needletail-aggregation-radio-${this.getClassTitle()}`)
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
                document.querySelectorAll(`.needletail-aggregation-radio-option-input.needletail-aggregation-radio-option-input-${this.getClassTitle()}`)
                    .forEach((element: HTMLInputElement) => {
                        element.addEventListener('change', () => {
                            this.handle(element);
                        });
                    });

                // eslint-disable-next-line max-len
                document.querySelectorAll(`.needletail-aggregation-radio-option-input.needletail-aggregation-radio-option-input-${this.getClassTitle()}`)
                    .forEach((element: HTMLInputElement) => {
                    // If the value is in the parameters check it
                        element.checked = (URIHelper.getSearchParam(title) === element.value);
                        element.addEventListener('change', () => {
                            this.handle(element);
                        });
                    });
            }
        });

        this.value = {
            field: this.getAttribute(),
            value: prevVal,
            is_aggregation: true,
        };
    }

    handle(element: any, skipHistory = false, removeFromHistory = false) {
        if (!skipHistory) {
            URIHelper.addToHistory(this.getTitle(), element.value, removeFromHistory);
        }

        if (removeFromHistory) {
            element.value = '';
        }

        this.value = {
            field: this.getAttribute(),
            value: element.value,
            is_aggregation: true,
        };

        this.hasActiveAggregation = true;
        if (!element.value) {
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
        document.querySelectorAll(`.needletail-aggregation-radio-option-input.needletail-aggregation-radio-option-input-${this.getClassTitle()}`)
            .forEach((element: HTMLInputElement) => {
                if (element.checked) {
                    element.checked = false;
                    this.handle(element, false, true);
                }
            });
    }
}
