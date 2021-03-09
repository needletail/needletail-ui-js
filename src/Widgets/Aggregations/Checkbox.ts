import template from './../../Html/Aggregations/checkbox.html';
import {Aggregation} from './../../Imports/BaseClasses';
import Mustache from 'mustache';
import {Events, optional, URIHelper} from '../../Imports/Helpers';
// eslint-disable-next-line no-unused-vars
import {CheckboxSettings} from '../../Imports/Interfaces';

export class Checkbox extends Aggregation {
    discriminator: string = 'Checkbox';
    hideOnEmpty: boolean = true;
    useShowMoreOptions: boolean = true;
    showMoreOptionsText: string = 'Show more options';
    showLessOptionsText: string = 'Show less options';
    showMoreOptionsLoad: number = 10;

    constructor(options: CheckboxSettings = {}) {
        super(options);

        this.setHideOnEmpty(options.hide_on_empty || this.getHideOnEmpty());
        this.setUseShowMoreOptions((typeof optional(options.show_more_options).use !== 'undefined') ?
            options.show_more_options.use : this.getUseShowMoreOptions());
        this.setShowMoreOptionsText(optional(options.show_more_options).text ?
            options.show_more_options.text : this.getShowMoreOptionsText());
        this.setShowLessOptionsText(optional(options.show_more_options).less_text ?
            options.show_more_options.less_text : this.getShowLessOptionsText());
        this.setShowMoreOptionsLoad(optional(options.show_more_options).load ?
            options.show_more_options.load : this.getShowMoreOptionsLoad());

        this.value = {
            field: this.getAttribute(),
            value: '',
            is_aggregation: true,
            exclude_from_search: true,
        };
    }

    setUseShowMoreOptions(useShowMoreOptions: boolean): Checkbox {
        this.useShowMoreOptions = useShowMoreOptions;
        return this;
    }

    getUseShowMoreOptions(): boolean {
        return this.useShowMoreOptions;
    }

    setShowMoreOptionsText(showMoreOptionsText: string): Checkbox {
        this.showMoreOptionsText = showMoreOptionsText;
        return this;
    }

    getShowMoreOptionsText(): string {
        return this.showMoreOptionsText;
    }

    setShowLessOptionsText(showLessOptionsText: string): Checkbox {
        this.showLessOptionsText = showLessOptionsText;
        return this;
    }

    getShowLessOptionsText(): string {
        return this.showLessOptionsText;
    }

    setShowMoreOptionsLoad(showMoreOptionsLoad: number): Checkbox {
        this.showMoreOptionsLoad = showMoreOptionsLoad;
        return this;
    }

    getShowMoreOptionsLoad(): number {
        return this.showMoreOptionsLoad;
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
            show_more_options: this.getUseShowMoreOptions(),
            show_more_options_text: this.getShowMoreOptionsText(),
            show_less_options_text: this.getShowLessOptionsText(),
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
                            element.querySelector('.needletail-aggregation-checkbox-title')
                                .addEventListener('click', (e) => {
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

                        if (this.getUseShowMoreOptions()) {
                            const showMoreOptions = element.querySelector('.needletail-show-more-options');
                            const showLessOptions = element.querySelector('.needletail-show-less-options');
                            const checkboxOptions = element.querySelectorAll('.needletail-aggregation-checkbox-option');

                            if (checkboxOptions.length <= this.getShowMoreOptionsLoad()) {
                                showMoreOptions.classList.add('needletail-hidden');
                            }

                            const max = (this.getShowMoreOptionsLoad() > checkboxOptions.length) ?
                                checkboxOptions.length : this.getShowMoreOptionsLoad();
                            for (let i = 0; i < max; i++) {
                                checkboxOptions.item(i).classList.remove('needletail-hidden');
                            }

                            showMoreOptions.addEventListener('click', (e) => {
                                showMoreOptions.classList.add('needletail-hidden');
                                showLessOptions.classList.remove('needletail-hidden');

                                for (let i = this.getShowMoreOptionsLoad(); i < checkboxOptions.length; i++) {
                                    checkboxOptions.item(i).classList.remove('needletail-hidden');
                                }
                            });

                            showLessOptions.addEventListener('click', (e) => {
                                showLessOptions.classList.add('needletail-hidden');
                                showMoreOptions.classList.remove('needletail-hidden');

                                for (let i = this.getShowMoreOptionsLoad(); i < checkboxOptions.length; i++) {
                                    checkboxOptions.item(i).classList.add('needletail-hidden');
                                }
                            });
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
