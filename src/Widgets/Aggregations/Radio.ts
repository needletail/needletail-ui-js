import template from './../../Html/Aggregations/radio.html';
import {Aggregation} from './../../Imports/BaseClasses';
import Mustache from 'mustache';
import {RadioSettings} from "../../Imports/Interfaces";
import {Events, URIHelper} from "../../Imports/Helpers";

export class Radio extends Aggregation {
    discriminator: string = 'Radio';
    hide_on_empty: boolean = true;

    constructor(options: RadioSettings = {}) {
        super(options);

        this.hide_on_empty = options.hide_on_empty || this.hide_on_empty;

        this.value = {
            field: this.attribute,
            value: '',
            is_aggregation: true,
            exclude_from_search: true,
        }
    }

    getTemplate(): string {
        if (this.template) {
            return this.template;
        }

        return template;
    }

    setHideOnEmpty(hideOnEmpty: boolean): Radio {
        this.hide_on_empty = hideOnEmpty;
        return this;
    }

    getHideOnEmpty(): boolean {
        return this.hide_on_empty;
    }

    /**
     * Renders the template for the aggregation
     * @param options
     */
    render(options: {}[] = []): string {
        let template = this.getTemplate();
        return Mustache.render(template, {
            title: this.getTitle(),
            classTitle: this.classTitle,
            options: options,
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

        document.addEventListener(Events.onAggsUpdate, (e: CustomEvent) => {
            if (e.detail[this.attribute]) {
                let options: {}[] = [];
                e.detail[this.attribute].forEach((val: any) => {
                    options.push({
                        name: title,
                        ...val
                    });
                });

                // Re-render the options
                let textElement = this.render(options);
                let node = document.createRange().createContextualFragment(textElement);
                let wasCollapsed = false;
                document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-radio.needletail-aggregation-radio-${this.classTitle}`).forEach((element) => {
                    wasCollapsed = element.classList.contains('needletail-collapsed');
                    element.replaceWith(node.cloneNode(true));
                });

                document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-radio.needletail-aggregation-radio-${this.classTitle}`).forEach((element) => {
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

                document.querySelectorAll(`.needletail-aggregation-radio-option-input.needletail-aggregation-radio-option-input-${this.classTitle}`).forEach((element: HTMLInputElement) => {
                    element.addEventListener('change', () => {
                        this.handle(element);
                    });
                });

                document.querySelectorAll(`.needletail-aggregation-radio-option-input.needletail-aggregation-radio-option-input-${this.classTitle}`).forEach((element: HTMLInputElement) => {
                    // If the value is in the parameters check it
                    element.checked = (URIHelper.getSearchParam(title) === element.value);
                    element.addEventListener('change', () => {
                        this.handle(element);
                    });
                });
            }
        });

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
     * @param removeFromHistory
     */
    handle(element: any, skipHistory = false, removeFromHistory = false) {
        if (!skipHistory) {
            URIHelper.addToHistory(this.getTitle(), element.value, removeFromHistory);
        }

        this.value = {
            field: this.attribute,
            value: element.value,
            is_aggregation: true
        };

        this.hasActiveAggregation = true;
        if (!element.value) {
            this.value = {
                field: this.attribute,
                value: '',
                is_aggregation: true,
                exclude_from_search: true,
            }

            this.hasActiveAggregation = false;
        }

        Events.emit(Events.onBeforeResultRequest, {});
        Events.emit(Events.onAggregationValueChange, {
            'name': this.attribute,
            'hasActive': this.hasActiveAggregation
        });
    }

    reset() {
        document.querySelectorAll(`.needletail-aggregation-radio-option-input.needletail-aggregation-radio-option-input-${this.classTitle}`).forEach((element: HTMLInputElement) => {
            if (element.checked) {
                element.checked = false;
                this.handle(element, false, true);
            }
        });
    }
}
