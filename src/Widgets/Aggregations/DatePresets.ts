import template from './../../Html/Aggregations/date_presets.html';
import skeletonTemplate from './../../Html/Skeletons/date_presets.html';
import {Aggregation} from './../../Imports/BaseClasses';
import Mustache from 'mustache';
import {Events, optional, URIHelper} from '../../Imports/Helpers';
// eslint-disable-next-line no-unused-vars
import {DatePresetsSettings} from '../../Imports/Interfaces';

type PresetKey = 'today' | 'last_7_days' | 'this_month' | 'custom';

type Preset = {
    key: PresetKey;
    label: string;
};

export class DatePresets extends Aggregation {
    discriminator: string = 'DatePresets';

    labelFrom: string = 'From';
    labelTo: string = 'To';
    anyLabel: string = 'Any';
    inputType: 'date' | 'datetime-local' = 'date';
    showCustom: boolean = true;

    minDate: string = '';
    maxDate: string = '';

    presets: Preset[] = [
        {key: 'today', label: 'Today'},
        {key: 'last_7_days', label: 'Last 7 days'},
        {key: 'this_month', label: 'This month'},
        {key: 'custom', label: 'Custom'},
    ];

    constructor(options: DatePresetsSettings = {}) {
        super(options);

        this.setLabelFrom(options.label_from || this.getLabelFrom());
        this.setLabelTo(options.label_to || this.getLabelTo());
        this.setAnyLabel(options.any_label || this.getAnyLabel());
        this.setInputType(options.input_type || this.getInputType());
        this.setShowCustom((typeof optional(options).show_custom !== 'undefined') ?
            optional(options).show_custom : this.getShowCustom());
        this.setMinDate(options.min_date || this.getMinDate());
        this.setMaxDate(options.max_date || this.getMaxDate());

        if (options.presets && Array.isArray(options.presets) && options.presets.length > 0) {
            this.setPresets(options.presets as Preset[]);
        }

        this.value = {
            field: this.getAttribute(),
            value: '',
            is_aggregation: true,
            exclude_from_search: true,
        };
    }

    setPresets(presets: Preset[]): DatePresets {
        this.presets = presets;
        return this;
    }

    getPresets(): Preset[] {
        return this.presets;
    }

    setLabelFrom(labelFrom: string): DatePresets {
        this.labelFrom = labelFrom;
        return this;
    }

    getLabelFrom(): string {
        return this.labelFrom;
    }

    setLabelTo(labelTo: string): DatePresets {
        this.labelTo = labelTo;
        return this;
    }

    getLabelTo(): string {
        return this.labelTo;
    }

    setAnyLabel(anyLabel: string): DatePresets {
        this.anyLabel = anyLabel;
        return this;
    }

    getAnyLabel(): string {
        return this.anyLabel;
    }

    setInputType(inputType: 'date' | 'datetime-local'): DatePresets {
        this.inputType = inputType;
        return this;
    }

    getInputType(): 'date' | 'datetime-local' {
        return this.inputType;
    }

    setShowCustom(showCustom: boolean): DatePresets {
        this.showCustom = showCustom;
        return this;
    }

    getShowCustom(): boolean {
        return this.showCustom;
    }

    setMinDate(minDate: string): DatePresets {
        this.minDate = minDate;
        return this;
    }

    getMinDate(): string {
        return this.minDate;
    }

    setMaxDate(maxDate: string): DatePresets {
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

    formatDate(date: Date): string {
        const yyyy = date.getFullYear();
        const mm = `${date.getMonth() + 1}`.padStart(2, '0');
        const dd = `${date.getDate()}`.padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    getPresetRange(key: PresetKey): {from?: string; to?: string} {
        const now = new Date();

        if (key === 'today') {
            const today = this.formatDate(now);
            return {from: today, to: today};
        }

        if (key === 'last_7_days') {
            const to = this.formatDate(now);
            const fromDate = new Date(now);
            fromDate.setDate(fromDate.getDate() - 6);
            const from = this.formatDate(fromDate);
            return {from: from, to: to};
        }

        if (key === 'this_month') {
            const fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
            const toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            return {from: this.formatDate(fromDate), to: this.formatDate(toDate)};
        }

        return {};
    }

    getFromParam(): string {
        return this.getTitle() + '[min]';
    }

    getToParam(): string {
        return this.getTitle() + '[max]';
    }

    getCurrentFrom(): string {
        return URIHelper.getSearchParam(this.getFromParam()) || '';
    }

    getCurrentTo(): string {
        return URIHelper.getSearchParam(this.getToParam()) || '';
    }

    getActivePresetKey(): PresetKey {
        const from = this.getCurrentFrom();
        const to = this.getCurrentTo();

        if (!from && !to) {
            return 'custom';
        }

        const candidates: PresetKey[] = ['today', 'last_7_days', 'this_month'];
        for (let i = 0; i < candidates.length; i++) {
            const key = candidates[i];
            const range = this.getPresetRange(key);
            if ((range.from || '') === from && (range.to || '') === to) {
                return key;
            }
        }

        return 'custom';
    }

    render(): string {
        const template = this.getTemplate();

        const from = this.getCurrentFrom();
        const to = this.getCurrentTo();
        const activeKey = this.getActivePresetKey();
        const customActive = (activeKey === 'custom');

        return Mustache.render(template, {
            title: this.getTitle(),
            class_title: this.getClassTitle(),
            presets: this.getPresets().map((p) => {
                return {
                    ...p,
                    active_class: (p.key === activeKey) ? 'active' : '',
                };
            }),
            show_custom: this.getShowCustom(),
            custom_hidden_class: (customActive) ? '' : 'needletail-date-presets-hidden',
            input_type: this.getInputType(),
            any_label: this.getAnyLabel(),
            label_from: this.getLabelFrom(),
            label_to: this.getLabelTo(),
            min_date: this.getMinDate(),
            max_date: this.getMaxDate(),
            from: from,
            to: to,
        });
    }

    executeJS(): void {
        const rootSelector = `.needletail-aggregation-date-presets-${this.getClassTitle()}`;

        const syncFromUrl = (root: Element) => {
            const from = this.getCurrentFrom();
            const to = this.getCurrentTo();
            const activeKey = this.getActivePresetKey();

            root.querySelectorAll('.needletail-aggregation-date-presets-option')
                .forEach((btn: HTMLElement) => {
                    if (btn.getAttribute('data-preset') === activeKey) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });

            const custom = root.querySelector('.needletail-aggregation-date-presets-custom') as HTMLElement;
            if (custom) {
                if (activeKey === 'custom') {
                    custom.classList.remove('needletail-date-presets-hidden');
                } else {
                    custom.classList.add('needletail-date-presets-hidden');
                }
            }

            const fromInput = root.querySelector('.needletail-aggregation-date-presets-input-from') as HTMLInputElement;
            const toInput = root.querySelector('.needletail-aggregation-date-presets-input-to') as HTMLInputElement;
            if (fromInput) {
                fromInput.value = from;
            }
            if (toInput) {
                toInput.value = to;
            }
        };

        const applyRange = (from: string, to: string) => {
            if (from) {
                URIHelper.setParam(this.getFromParam(), from);
            } else {
                URIHelper.removeParam(this.getFromParam());
            }

            if (to) {
                URIHelper.setParam(this.getToParam(), to);
            } else {
                URIHelper.removeParam(this.getToParam());
            }

            if (!from && !to) {
                this.value = {
                    field: this.getAttribute(),
                    value: '',
                    is_aggregation: true,
                    exclude_from_search: true,
                };
                this.hasActiveAggregation = false;
            } else {
                const next: any = {
                    field: this.getAttribute(),
                    is_aggregation: true,
                };
                if (from) {
                    next.gte = from;
                }
                if (to) {
                    next.lte = to;
                }
                this.value = next;
                this.hasActiveAggregation = true;
            }

            Events.emit(Events.onBeforeResultRequest, {});
            Events.emit(Events.onAggregationValueChange, {
                'initial': false,
                'name': this.getAttribute(),
                'hasActive': this.hasActiveAggregation,
                'value': this.value,
            });
        };

        document.querySelectorAll(rootSelector).forEach((root: Element) => {
            if (this.getCollapsible()) {
                const title = root.querySelector('.needletail-aggregation-date-presets-title') as HTMLElement;
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

            root.querySelectorAll('.needletail-aggregation-date-presets-option')
                .forEach((btn: HTMLButtonElement) => {
                    btn.addEventListener('click', () => {
                        const key = (btn.getAttribute('data-preset') || 'custom') as PresetKey;
                        if (key === 'custom') {
                            syncFromUrl(root);
                            return;
                        }

                        const range = this.getPresetRange(key);
                        applyRange(optional(range).from || '', optional(range).to || '');
                        syncFromUrl(root);
                    });
                });

            const fromInput = root.querySelector('.needletail-aggregation-date-presets-input-from') as HTMLInputElement;
            const toInput = root.querySelector('.needletail-aggregation-date-presets-input-to') as HTMLInputElement;
            if (fromInput) {
                fromInput.addEventListener('change', () => {
                    applyRange(fromInput.value || '', (toInput ? (toInput.value || '') : ''));
                    syncFromUrl(root);
                });
            }
            if (toInput) {
                toInput.addEventListener('change', () => {
                    applyRange((fromInput ? (fromInput.value || '') : ''), toInput.value || '');
                    syncFromUrl(root);
                });
            }

            syncFromUrl(root);
        });

        document.addEventListener(Events.onUrlChange, () => {
            document.querySelectorAll(rootSelector).forEach((root: Element) => {
                syncFromUrl(root);
            });
        });

        // Initial state
        const from = this.getCurrentFrom();
        const to = this.getCurrentTo();
        if (from || to) {
            const next: any = {
                field: this.getAttribute(),
                is_aggregation: true,
            };
            if (from) {
                next.gte = from;
            }
            if (to) {
                next.lte = to;
            }
            this.value = next;
            this.hasActiveAggregation = true;

            Events.emit(Events.onAggregationValueChange, {
                'initial': true,
                'name': this.getAttribute(),
                'hasActive': this.hasActiveAggregation,
                'value': this.value,
            });
        } else {
            this.hasActiveAggregation = false;
        }
    }

    reset(): void {
        URIHelper.removeParam(this.getFromParam());
        URIHelper.removeParam(this.getToParam());
        Events.emit(Events.onBeforeResultRequest, {});
    }
}

