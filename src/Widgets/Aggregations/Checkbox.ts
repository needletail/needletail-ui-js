import template from './../../Html/Aggregations/checkbox.html';
import {Aggregation} from './../../Imports/BaseClasses';
import Mustache from "mustache";
import {Events, URIHelper} from "../../Imports/Helpers";
import {CheckboxSettings} from "../../Imports/Interfaces";

export class Checkbox extends Aggregation {
    discriminator: string = 'Checkbox';

    constructor(options: CheckboxSettings = {}) {
        super(options);

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

        document.addEventListener(Events.onAggsUpdate, (e: CustomEvent) => {
            if (e.detail[this.attribute]) {
                let options: {}[] = [];
                e.detail[this.attribute].forEach((val: any) => {
                    options.push({
                        name: title,
                        value: val.value,
                        count: val.count
                    });
                });

                // Whenever the aggregation gets updated it has to be rerendered
                let textElement = this.render(options);
                let node = document.createRange().createContextualFragment(textElement);
                let wasCollapsed = false;
                document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-checkbox.needletail-aggregation-checkbox-${this.classTitle}`).forEach((element) => {
                    wasCollapsed = element.classList.contains('needletail-collapsed');
                    element.replaceWith(node.cloneNode(true));
                });

                document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-checkbox.needletail-aggregation-checkbox-${this.classTitle}`).forEach((element) => {
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
                });

                document.querySelectorAll(`.needletail-aggregation-checkbox-option-input.needletail-aggregation-checkbox-option-input-${this.classTitle}`).forEach((element: HTMLInputElement) => {
                    element.addEventListener('change', () => {
                        this.handle(element);
                    });
                });

                // Set the default value for the aggregation
                let params = URIHelper.getSearchParams(title);

                if (params) {
                    params.forEach((value: string) => {
                        let elements = document.querySelectorAll(`.needletail-aggregation-checkbox-option-input-${this.classTitle}[value='${value}']`)

                        elements.forEach((element: HTMLInputElement) => {
                            element.checked = true;
                        });
                    });
                }
            }
        });

        let params = URIHelper.getSearchParams(title);

        // On load set the values for the aggregation search
        if (params) {
            params.forEach((value: string) => {
                this.values[value] = value;
            });

            this.value = {
                field: this.attribute,
                value: Object.keys(this.values),
                is_aggregation: true
            }

            if (Object.keys(this.values).length === 0) {
                this.value = {
                    field: this.attribute,
                    value: '',
                    is_aggregation: true,
                    exclude_from_search: true,
                }
            }
        }
    }

    /**
     * Handles the setting of the URL and putting the correct value in for the search
     * @param element
     * @param skipHistory
     */
    handle(element: any, skipHistory = false) {
        if (!skipHistory) {
            URIHelper.addToHistory(this.getTitle(), element.value, true);
        }

        if (this.values[element.value]) {
            delete this.values[element.value];
        }
        else {
            this.values[element.value] = element.value;
        }

        this.value = {
            field: this.attribute,
            value: Object.keys(this.values),
            is_aggregation: true
        }

        if (Object.keys(this.values).length === 0) {
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
        document.querySelectorAll(`.needletail-aggregation-checkbox-option-input.needletail-aggregation-checkbox-option-input-${this.classTitle}`).forEach((element: HTMLInputElement) => {
            if (element.checked) {
                element.checked = false;
                this.handle(element);
            }
        });
    }
}
