import template from './../../Html/Aggregations/multi_date.html';
import skeletonTemplate from './../../Html/Skeletons/multi_date.html';
import {Aggregation} from './../../Imports/BaseClasses';
import Mustache from 'mustache';
import {Events, URIHelper} from '../../Imports/Helpers';
// eslint-disable-next-line no-unused-vars
import {MultiDateSettings} from '../../Imports/Interfaces';

export class MultiDate extends Aggregation {
    discriminator: string = 'MultiDate';

    inputType: 'date' | 'datetime-local' = 'date';
    anyLabel: string = 'Select a date';
    addLabel: string = 'Add';
    minDate: string = '';
    maxDate: string = '';

    private listenersBound: boolean = false;

    constructor(options: MultiDateSettings = {}) {
        super(options);

        this.setInputType(options.input_type || this.getInputType());
        this.setAnyLabel(options.any_label || this.getAnyLabel());
        this.setAddLabel(options.add_label || this.getAddLabel());
        this.setMinDate(options.min_date || this.getMinDate());
        this.setMaxDate(options.max_date || this.getMaxDate());

        this.value = {
            field: this.getAttribute(),
            value: '',
            is_aggregation: true,
            exclude_from_search: true,
        };
    }

    setInputType(inputType: 'date' | 'datetime-local'): MultiDate {
        this.inputType = inputType;
        return this;
    }

    getInputType(): 'date' | 'datetime-local' {
        return this.inputType;
    }

    setAnyLabel(anyLabel: string): MultiDate {
        this.anyLabel = anyLabel;
        return this;
    }

    getAnyLabel(): string {
        return this.anyLabel;
    }

    setAddLabel(addLabel: string): MultiDate {
        this.addLabel = addLabel;
        return this;
    }

    getAddLabel(): string {
        return this.addLabel;
    }

    setMinDate(minDate: string): MultiDate {
        this.minDate = minDate;
        return this;
    }

    getMinDate(): string {
        return this.minDate;
    }

    setMaxDate(maxDate: string): MultiDate {
        this.maxDate = maxDate;
        return this;
    }

    getMaxDate(): string {
        return this.maxDate;
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

    getValuesFromUrl(): string[] {
        const params = URIHelper.getSearchParams(this.getTitle()) || [];
        const unique = Array.from(new Set(params.filter(Boolean)));
        unique.sort((a, b) => a.localeCompare(b));
        return unique;
    }

    syncStateFromUrl(emitInitial = false) {
        const values = this.getValuesFromUrl();

        if (values.length > 0) {
            this.value = {
                field: this.getAttribute(),
                value: values,
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

        if (emitInitial) {
            Events.emit(Events.onAggregationValueChange, {
                initial: true,
                name: this.getAttribute(),
                hasActive: this.hasActiveAggregation,
                value: this.value.value,
            });
        }
    }

    render(): string {
        const template = this.getTemplate();
        const values = this.getValuesFromUrl();

        return Mustache.render(template, {
            title: this.getTitle(),
            class_title: this.getClassTitle(),
            name: this.getClassTitle(),
            collapsible: (this.getCollapsible()) ? 'needletail-collapsible' : '',
            collapsed: (this.getCollapsible() && this.getDefaultCollapsed()) ? 'needletail-collapsed' : '',
            input_type: this.getInputType(),
            any_label: this.getAnyLabel(),
            add_label: this.getAddLabel(),
            min_date: this.getMinDate(),
            max_date: this.getMaxDate(),
            selected: values.map((v) => ({value: v})),
        });
    }

    rerender() {
        const textElement = this.render();
        const node = document.createRange().createContextualFragment(textElement);
        let wasCollapsed = false;

        const rootSelector = '.needletail-aggregation.needletail-aggregation-multi-date' +
            `.needletail-aggregation-multi-date-${this.getClassTitle()}`;

        document.querySelectorAll(rootSelector).forEach((element) => {
            wasCollapsed = element.classList.contains('needletail-collapsed');
            element.replaceWith(node.cloneNode(true));
        });

        document.querySelectorAll(rootSelector).forEach((element) => {
            if (wasCollapsed) {
                element.classList.add('needletail-collapsed');
            }
        });

        this.bindHandlers();
    }

    bindHandlers() {
        const classTitle = this.getClassTitle();
        const rootSelector = `.needletail-aggregation-multi-date-${classTitle}`;

        document.querySelectorAll(rootSelector).forEach((root: Element) => {
            if (this.getCollapsible()) {
                const title = root.querySelector('.needletail-aggregation-multi-date-title') as HTMLElement;
                if (title) {
                    title.addEventListener('click', () => {
                        const wrapper = root.closest('.needletail-aggregation') as HTMLElement;
                        if (!wrapper) {
                            return;
                        }

                        if (wrapper.classList.contains('needletail-collapsed')) {
                            wrapper.classList.remove('needletail-collapsed');
                        } else {
                            wrapper.classList.add('needletail-collapsed');
                        }
                    });
                }
            }

            const input = root.querySelector(`.needletail-aggregation-multi-date-input-${classTitle}`) as HTMLInputElement;
            const addButton = root.querySelector('.needletail-aggregation-multi-date-add') as HTMLButtonElement;

            const addValue = () => {
                const value = (input ? (input.value || '').trim() : '');
                if (!value) {
                    return;
                }

                const current = this.getValuesFromUrl();
                if (current.indexOf(value) > -1) {
                    if (input) {
                        input.value = '';
                    }
                    return;
                }

                URIHelper.addToHistory(this.getTitle(), value, true);
                this.syncStateFromUrl(false);

                if (input) {
                    input.value = '';
                }

                Events.emit(Events.onBeforeResultRequest, {});
                Events.emit(Events.onAggregationValueChange, {
                    initial: false,
                    name: this.getAttribute(),
                    hasActive: this.hasActiveAggregation,
                    value: this.value.value,
                    lastValue: value,
                });
            };

            if (addButton) {
                addButton.addEventListener('click', addValue);
            }

            if (input) {
                input.addEventListener('keydown', (e: KeyboardEvent) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        addValue();
                    }
                });
            }

            root.querySelectorAll('.needletail-aggregation-multi-date-chip')
                .forEach((chip: HTMLElement) => {
                    chip.addEventListener('click', () => {
                        const value = chip.getAttribute('data-value') || '';
                        if (!value) {
                            return;
                        }

                        URIHelper.removeParamValue(this.getTitle(), value);
                        this.syncStateFromUrl(false);

                        Events.emit(Events.onBeforeResultRequest, {});
                        Events.emit(Events.onAggregationValueChange, {
                            initial: false,
                            name: this.getAttribute(),
                            hasActive: this.hasActiveAggregation,
                            value: this.value.value,
                            lastValue: value,
                        });
                    });
                });
        });
    }

    executeJS(): void {
        this.syncStateFromUrl(true);
        this.bindHandlers();

        if (this.listenersBound) {
            return;
        }

        this.listenersBound = true;
        document.addEventListener(Events.onUrlChange, () => {
            this.rerender();
        });
    }

    reset(): void {
        const values = this.getValuesFromUrl();
        values.forEach((v) => {
            URIHelper.removeParamValue(this.getTitle(), v);
        });
        this.syncStateFromUrl(false);
        Events.emit(Events.onBeforeResultRequest, {});
    }
}

