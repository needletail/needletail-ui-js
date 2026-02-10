import template from './../../Html/Aggregations/dropdown_select.html';
import skeletonTemplate from './../../Html/Skeletons/dropdown_select.html';
import {Aggregation} from './../../Imports/BaseClasses';
import Mustache from 'mustache';
import {Events, URIHelper} from '../../Imports/Helpers';
import {applyFilterOptions, applyOptionOrder} from '../../Helpers/AggregationOptionUtils';
// eslint-disable-next-line no-unused-vars
import {DropdownSelectSettings} from '../../Imports/Interfaces';

export class DropdownSelect extends Aggregation {
    discriminator: string = 'DropdownSelect';
    hideOnEmpty: boolean = true;
    optionOrder: string[] = [];
    filterOptions: string[] = [];
    anyLabel: string = 'Any';
    skeletonItemCount: number = 1;

    constructor(options: DropdownSelectSettings = {}) {
        super(options);

        this.setHideOnEmpty(options.hide_on_empty || this.getHideOnEmpty());
        this.setOptionOrder(options.option_order || this.getOptionOrder());
        this.setFilterOptions(options.filter_options || this.getFilterOptions());
        this.setAnyLabel(options.any_label || this.getAnyLabel());

        this.value = {
            field: this.getAttribute(),
            value: '',
            is_aggregation: true,
            exclude_from_search: true,
        };
    }

    setHideOnEmpty(hideOnEmpty: boolean): DropdownSelect {
        this.hideOnEmpty = hideOnEmpty;
        return this;
    }

    getHideOnEmpty(): boolean {
        return this.hideOnEmpty;
    }

    setAnyLabel(anyLabel: string): DropdownSelect {
        this.anyLabel = anyLabel;
        return this;
    }

    getAnyLabel(): string {
        return this.anyLabel;
    }

    setOptionOrder(optionOrder: string[]): DropdownSelect {
        this.optionOrder = optionOrder.map((o: string) => {
            return o.toLowerCase();
        });
        return this;
    }

    getOptionOrder(): string[] {
        return this.optionOrder;
    }

    setFilterOptions(filterOptions: string[]): DropdownSelect {
        this.filterOptions = filterOptions.map((o: string) => {
            return o.toLowerCase();
        });
        return this;
    }

    getFilterOptions(): string[] {
        return this.filterOptions;
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
            options: new Array(this.skeletonItemCount).fill(null),
        });
        return rendered;
    }

    render(options: {}[] = []): string {
        const template = this.getTemplate();

        options = applyOptionOrder(options, this.getOptionOrder());
        options = applyFilterOptions(options, this.getFilterOptions());

        return Mustache.render(template, {
            title: this.getTitle(),
            class_title: this.getClassTitle(),
            name: this.getClassTitle(),
            options: options,
            any_label: this.getAnyLabel(),
            collapsible: (this.getCollapsible()) ? 'needletail-collapsible' : '',
            collapsed: (this.getCollapsible() && this.getDefaultCollapsed()) ? 'needletail-collapsed' : '',
        });
    }

    updateValueFromUrl(emitInitial = false) {
        const val = URIHelper.getSearchParam(this.getTitle()) || '';

        if (val) {
            this.value = {
                field: this.getAttribute(),
                value: val,
                is_aggregation: true,
            };
            this.hasActiveAggregation = true;
        } else {
            this.value = {
                field: this.getAttribute(),
                value: '',
                is_aggregation: true,
                exclude_from_search: true,
            };
            this.hasActiveAggregation = false;
        }

        if (emitInitial && this.hasActiveAggregation) {
            Events.emit(Events.onAggregationValueChange, {
                'initial': true,
                'name': this.getAttribute(),
                'hasActive': this.hasActiveAggregation,
                'value': this.value.value,
            });
        }
    }

    executeJS() {
        const title = this.getTitle();
        const classTitle = this.getClassTitle();
        // eslint-disable-next-line max-len
        const rootSelector = `.needletail-aggregation.needletail-aggregation-dropdown-select.needletail-aggregation-dropdown-select-${this.getClassTitle()}`;

        const syncFromUrl = () => {
            const current = URIHelper.getSearchParam(title) || '';
            document.querySelectorAll(rootSelector)
                .forEach((element) => {
                    const select = element.querySelector(
                        `.needletail-aggregation-dropdown-select-input-${classTitle}`,
                    ) as HTMLSelectElement;
                    if (select) {
                        select.value = current;
                    }
                });
        };

        document.addEventListener(Events.onAggsUpdate, (e: CustomEvent) => {
            if (e.detail[this.getAttribute()]) {
                const options: {}[] = [];
                e.detail[this.getAttribute()].forEach((val: any) => {
                    options.push({
                        name: this.getClassTitle(),
                        ...val,
                    });
                });

                // Ensure the currently selected value remains visible even if it's not returned in aggs
                // (for example when the API returns a limited set of options).
                const selected = URIHelper.getSearchParam(title) || '';
                if (selected && this.getFilterOptions().length === 0) {
                    const hasSelected = options.some((o: any) => String(o?.value || '') === selected);
                    if (!hasSelected) {
                        options.unshift({
                            name: this.getClassTitle(),
                            value: selected,
                            count: 0,
                        });
                    }
                }

                // Whenever the aggregation gets updated it has to be rerendered
                const textElement = this.render(options);
                const node = document.createRange().createContextualFragment(textElement);
                let wasCollapsed = false;

                // eslint-disable-next-line max-len
                document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-dropdown-select.needletail-aggregation-dropdown-select-${this.getClassTitle()}`)
                    .forEach((element) => {
                        wasCollapsed = element.classList.contains('needletail-collapsed');
                        element.replaceWith(node.cloneNode(true));
                    });

                // eslint-disable-next-line max-len
                document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-dropdown-select.needletail-aggregation-dropdown-select-${this.getClassTitle()}`)
                    .forEach((element) => {
                        if (this.getCollapsible()) {
                            element.querySelector('.needletail-aggregation-dropdown-select-title')
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

                        const select = element.querySelector(
                            `.needletail-aggregation-dropdown-select-input-${classTitle}`,
                        ) as HTMLSelectElement;
                        if (select) {
                            // Always sync from the current URL so re-renders don't reset the chosen value.
                            select.value = URIHelper.getSearchParam(title) || '';
                            select.addEventListener('change', () => {
                                this.handle(select);
                            });
                        }
                    });
            } else {
                if (this.getHideOnEmpty()) {
                    // eslint-disable-next-line max-len
                    document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-dropdown-select.needletail-aggregation-dropdown-select-${this.getClassTitle()}`)
                        .forEach((element) => {
                            element.classList.add('needletail-empty');
                        });
                }
            }
        });

        // Keep UI in sync when URL is changed externally (chips/back/forward/apply-mode cancel).
        document.addEventListener(Events.onUrlChange, () => {
            this.updateValueFromUrl(false);
            syncFromUrl();
        });

        // Initial state
        this.updateValueFromUrl(true);
        syncFromUrl();
    }

    handle(element: HTMLSelectElement, skipHistory = false) {
        if (!skipHistory) {
            URIHelper.addToHistory(this.getTitle(), element.value);
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
            'initial': false,
            'name': this.getAttribute(),
            'hasActive': this.hasActiveAggregation,
            'value': this.value.value,
            'lastValue': element.value,
        });
    }

    reset() {
        // eslint-disable-next-line max-len
        document.querySelectorAll(`.needletail-aggregation-dropdown-select-input.needletail-aggregation-dropdown-select-input-${this.getClassTitle()}`)
            .forEach((element: HTMLSelectElement) => {
                element.value = '';
                this.handle(element);
            });
    }
}

