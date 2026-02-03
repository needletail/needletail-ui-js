import templateExact from './../../Html/Aggregations/date_filter.html';
import templateRange from './../../Html/Aggregations/date_filter_range.html';
import skeletonTemplateExact from './../../Html/Skeletons/date_filter.html';
import skeletonTemplateRange from './../../Html/Skeletons/date_filter_range.html';
import {Aggregation} from './../../Imports/BaseClasses';
import Mustache from 'mustache';
import {Events, URIHelper} from '../../Imports/Helpers';
// eslint-disable-next-line no-unused-vars
import {DateFilterSettings} from '../../Imports/Interfaces';

type DateFilterMode = 'range' | 'exact';
type DateFilterInputType = 'date' | 'datetime-local';
type DateFilterExactQuery = 'match' | 'range_day';

type AvailableDateOption = { value: string; count: number; selected?: boolean };

export class DateFilter extends Aggregation {
    discriminator: string = 'DateFilter';

    mode: DateFilterMode = 'range';
    inputType: DateFilterInputType = 'date';

    minDate: string = '';
    maxDate: string = '';

    defaultFrom: string = '';
    defaultTo: string = '';
    defaultExact: string = '';

    onlyAggregationValues: boolean = false;
    useAggregationValues: boolean = false;

    exactQuery: DateFilterExactQuery = 'match';

    selectorExactInput: string;
    selectorExactSelect: string;
    selectorFrom: string;
    selectorTo: string;

    availableDates: AvailableDateOption[] = [];
    availableValues: Set<string> = new Set();

    anyLabel: string = 'Any date';
    labelFrom: string = 'From';
    labelTo: string = 'To';

    constructor(options: DateFilterSettings = {}) {
        super(options);

        this.setMode(options.mode || this.getMode());
        // Support a Slider-like boolean as an alternative config style
        if (typeof (options as any).range !== 'undefined') {
            this.setMode(((options as any).range) ? 'range' : 'exact');
        }

        this.setInputType(options.input_type || this.getInputType());
        this.setMinDate(options.min_date || this.getMinDate());
        this.setMaxDate(options.max_date || this.getMaxDate());
        this.setDefaultFrom(options.default_from || this.getDefaultFrom());
        this.setDefaultTo(options.default_to || this.getDefaultTo());
        this.setDefaultExact(options.default_exact || this.getDefaultExact());
        this.setOnlyAggregationValues((typeof options.only_aggregation_values !== 'undefined') ?
            options.only_aggregation_values : this.getOnlyAggregationValues());
        this.setUseAggregationValues((typeof options.use_aggregation_values !== 'undefined') ?
            options.use_aggregation_values : this.getUseAggregationValues());
        this.setExactQuery(options.exact_query || this.getExactQuery());
        this.setAnyLabel(options.any_label || this.getAnyLabel());
        this.setLabelFrom(options.label_from || this.getLabelFrom());
        this.setLabelTo(options.label_to || this.getLabelTo());

        // Selectors: allow custom templates / date plugins to wire up easily
        const selectors = options.selectors || {};
        this.setSelectorExactInput(selectors.exact || this.getDefaultSelectorExactInput());
        this.setSelectorExactSelect(selectors.exact || this.getDefaultSelectorExactSelect());
        this.setSelectorFrom(selectors.from || this.getDefaultSelectorFrom());
        this.setSelectorTo(selectors.to || this.getDefaultSelectorTo());

        // Ensure the initial value is present but excluded from search
        this.setInactiveValue();
    }

    setMode(mode: DateFilterMode): DateFilter {
        if (mode !== 'range' && mode !== 'exact') {
            mode = 'range';
        }
        this.mode = mode;
        return this;
    }

    getMode(): DateFilterMode {
        return this.mode;
    }

    setInputType(inputType: DateFilterInputType): DateFilter {
        if (inputType !== 'date' && inputType !== 'datetime-local') {
            inputType = 'date';
        }
        this.inputType = inputType;
        return this;
    }

    getInputType(): DateFilterInputType {
        return this.inputType;
    }

    setMinDate(minDate: string): DateFilter {
        this.minDate = minDate;
        return this;
    }

    getMinDate(): string {
        return this.minDate;
    }

    setMaxDate(maxDate: string): DateFilter {
        this.maxDate = maxDate;
        return this;
    }

    getMaxDate(): string {
        return this.maxDate;
    }

    setDefaultFrom(defaultFrom: string): DateFilter {
        this.defaultFrom = defaultFrom;
        return this;
    }

    getDefaultFrom(): string {
        return this.defaultFrom;
    }

    setDefaultTo(defaultTo: string): DateFilter {
        this.defaultTo = defaultTo;
        return this;
    }

    getDefaultTo(): string {
        return this.defaultTo;
    }

    setDefaultExact(defaultExact: string): DateFilter {
        this.defaultExact = defaultExact;
        return this;
    }

    getDefaultExact(): string {
        return this.defaultExact;
    }

    setOnlyAggregationValues(onlyAggregationValues: boolean): DateFilter {
        this.onlyAggregationValues = onlyAggregationValues;
        if (onlyAggregationValues) {
            // If we want to restrict to aggs, we must consume aggs
            this.setUseAggregationValues(true);
        }
        return this;
    }

    getOnlyAggregationValues(): boolean {
        return this.onlyAggregationValues;
    }

    setUseAggregationValues(useAggregationValues: boolean): DateFilter {
        this.useAggregationValues = useAggregationValues;
        return this;
    }

    getUseAggregationValues(): boolean {
        return this.useAggregationValues;
    }

    setExactQuery(exactQuery: DateFilterExactQuery): DateFilter {
        if (exactQuery !== 'match' && exactQuery !== 'range_day') {
            exactQuery = 'match';
        }
        this.exactQuery = exactQuery;
        return this;
    }

    getExactQuery(): DateFilterExactQuery {
        return this.exactQuery;
    }

    setAnyLabel(anyLabel: string): DateFilter {
        this.anyLabel = anyLabel;
        return this;
    }

    getAnyLabel(): string {
        return this.anyLabel;
    }

    setLabelFrom(labelFrom: string): DateFilter {
        this.labelFrom = labelFrom;
        return this;
    }

    getLabelFrom(): string {
        return this.labelFrom;
    }

    setLabelTo(labelTo: string): DateFilter {
        this.labelTo = labelTo;
        return this;
    }

    getLabelTo(): string {
        return this.labelTo;
    }

    getDefaultSelectorExactInput(): string {
        return `.needletail-aggregation-date-filter-input-exact-${this.getClassTitle()}`;
    }

    getDefaultSelectorExactSelect(): string {
        return `.needletail-aggregation-date-filter-exact-select-${this.getClassTitle()}`;
    }

    getDefaultSelectorFrom(): string {
        return `.needletail-aggregation-date-filter-input-from-${this.getClassTitle()}`;
    }

    getDefaultSelectorTo(): string {
        return `.needletail-aggregation-date-filter-input-to-${this.getClassTitle()}`;
    }

    setSelectorExactInput(selector: string): DateFilter {
        this.selectorExactInput = selector;
        return this;
    }

    getSelectorExactInput(): string {
        return this.selectorExactInput;
    }

    setSelectorExactSelect(selector: string): DateFilter {
        this.selectorExactSelect = selector;
        return this;
    }

    getSelectorExactSelect(): string {
        return this.selectorExactSelect;
    }

    /**
     * The selector that represents the active exact-date control.
     * If only-aggregation-values is enabled, we default to the select element.
     * @return {string}
     */
    getSelectorExact(): string {
        return (this.getOnlyAggregationValues()) ? this.getSelectorExactSelect() : this.getSelectorExactInput();
    }

    setSelectorFrom(selector: string): DateFilter {
        this.selectorFrom = selector;
        return this;
    }

    getSelectorFrom(): string {
        return this.selectorFrom;
    }

    setSelectorTo(selector: string): DateFilter {
        this.selectorTo = selector;
        return this;
    }

    getSelectorTo(): string {
        return this.selectorTo;
    }

    getTemplate(): string {
        if (this.template) {
            return this.template;
        }

        if (this.getMode() === 'exact') {
            return templateExact;
        }

        return templateRange;
    }

    getSkeletonTemplate(): string {
        if (this.skeletonTemplate) {
            return this.skeletonTemplate;
        }

        if (this.getMode() === 'exact') {
            return skeletonTemplateExact;
        }

        return skeletonTemplateRange;
    }

    setAvailableDates(availableDates: AvailableDateOption[]): DateFilter {
        this.availableDates = availableDates;
        this.availableValues = new Set(availableDates.map((d) => d.value));
        return this;
    }

    getAvailableDates(): AvailableDateOption[] {
        return this.availableDates;
    }

    getAvailableValuesJson(): string {
        return JSON.stringify(Array.from(this.availableValues));
    }

    getParamExact(): string {
        return this.getTitle();
    }

    getParamMin(): string {
        return `${this.getTitle()}[min]`;
    }

    getParamMax(): string {
        return `${this.getTitle()}[max]`;
    }

    getRootSelector(): string {
        const classTitle = this.getClassTitle();
        return '.needletail-aggregation.needletail-aggregation-date-filter' +
            `.needletail-aggregation-date-filter-${classTitle}`;
    }

    getInstanceSelector(): string {
        return `.needletail-aggregation-date-filter-${this.getClassTitle()}`;
    }

    render(): string {
        const template = this.getTemplate();

        const urlExact = URIHelper.getSearchParam(this.getParamExact()) || '';
        const urlFrom = URIHelper.getSearchParam(this.getParamMin()) || '';
        const urlTo = URIHelper.getSearchParam(this.getParamMax()) || '';

        const exact = urlExact || this.getDefaultExact() || '';
        const from = urlFrom || this.getDefaultFrom() || '';
        const to = urlTo || this.getDefaultTo() || '';

        const availableDates: AvailableDateOption[] = this.getAvailableDates().map((d) => {
            return {
                ...d,
                selected: (d.value === exact),
            };
        });

        const collapsible = (this.getCollapsible()) ? 'needletail-collapsible' : '';
        const collapsed = (this.getCollapsible() && this.getDefaultCollapsed()) ? 'needletail-collapsed' : '';

        return Mustache.render(template, {
            title: this.getTitle(),
            class_title: this.getClassTitle(),
            name: this.getClassTitle(),
            attribute: this.getAttribute(),
            mode: this.getMode(),
            mode_exact: (this.getMode() === 'exact'),
            mode_range: (this.getMode() === 'range'),
            input_type: this.getInputType(),
            min_date: this.getMinDate(),
            max_date: this.getMaxDate(),
            exact: exact,
            from: from,
            to: to,
            default_exact: this.getDefaultExact(),
            default_from: this.getDefaultFrom(),
            default_to: this.getDefaultTo(),
            only_aggregation_values: this.getOnlyAggregationValues(),
            use_aggregation_values: this.getUseAggregationValues(),
            available_dates: availableDates,
            available_values_json: this.getAvailableValuesJson(),
            param_exact: this.getParamExact(),
            param_min: this.getParamMin(),
            param_max: this.getParamMax(),
            selector_exact: this.getSelectorExact(),
            selector_exact_input: this.getSelectorExactInput(),
            selector_exact_select: this.getSelectorExactSelect(),
            selector_from: this.getSelectorFrom(),
            selector_to: this.getSelectorTo(),
            any_label: this.getAnyLabel(),
            label_from: this.getLabelFrom(),
            label_to: this.getLabelTo(),
            collapsible: collapsible,
            collapsed: collapsed,
        });
    }

    executeJS() {
        if (this.getUseAggregationValues() || this.getOnlyAggregationValues()) {
            document.addEventListener(Events.onAggsUpdate, (e: CustomEvent) => {
                this.onAggsUpdate(e);
            });
        }

        if (this.getUseSkeleton()) {
            document.addEventListener(Events.onAfterResultRequest, (e: CustomEvent) => {
                const textElement = this.render();
                const node = document.createRange().createContextualFragment(textElement);

                document.querySelectorAll(this.getInstanceSelector())
                    .forEach((element) => {
                        element.replaceWith(node.cloneNode(true));
                    });

                this.initialize();
                Events.emit(Events.initializeDateFilter, {
                    name: this.getAttribute(),
                    mode: this.getMode(),
                });
            });
        } else {
            this.initialize();
            document.addEventListener(Events.initNeedletail, () => {
                Events.emit(Events.initializeDateFilter, {
                    name: this.getAttribute(),
                    mode: this.getMode(),
                });
            });
        }
    }

    onAggsUpdate(e: CustomEvent) {
        const raw = e.detail[this.getAttribute()];
        if (!raw || !Array.isArray(raw)) {
            return;
        }

        const options: AvailableDateOption[] = raw
            .filter((o: any) => o && typeof o.value !== 'undefined')
            .map((o: any) => {
                const count = (typeof o.count === 'number') ? o.count : parseInt(o.count || '0');
                return {
                    value: String(o.value),
                    count: isNaN(count) ? 0 : count,
                };
            });

        this.setAvailableDates(options);

        // If we rendered a skeleton, wait for onAfterResultRequest to swap in real HTML.
        if (this.getUseSkeleton()) {
            return;
        }

        // Re-render so templates (datalist/select) can reflect the new available dates.
        const textElement = this.render();
        const node = document.createRange().createContextualFragment(textElement);
        let wasCollapsed = false;

        document.querySelectorAll(this.getRootSelector())
            .forEach((element) => {
                wasCollapsed = element.classList.contains('needletail-collapsed');
                element.replaceWith(node.cloneNode(true));
            });

        document.querySelectorAll(this.getRootSelector())
            .forEach((element) => {
                if (this.getCollapsible() && wasCollapsed) {
                    element.classList.add('needletail-collapsed');
                }
            });

        this.initialize();
        Events.emit(Events.initializeDateFilter, {
            name: this.getAttribute(),
            mode: this.getMode(),
        });
    }

    initialize() {
        const mode = this.getMode();
        const urlExact = URIHelper.getSearchParam(this.getParamExact()) || '';
        const urlFrom = URIHelper.getSearchParam(this.getParamMin()) || '';
        const urlTo = URIHelper.getSearchParam(this.getParamMax()) || '';

        document.querySelectorAll(this.getRootSelector())
            .forEach((element) => {
                if (this.getCollapsible()) {
                    const title = element.querySelector('.needletail-aggregation-date-filter-title');
                    if (title) {
                        title.addEventListener('click', (e) => {
                            if (element.classList.contains('needletail-collapsed')) {
                                element.classList.remove('needletail-collapsed');
                            } else {
                                element.classList.add('needletail-collapsed');
                            }
                        });
                    }
                }

                if (mode === 'range') {
                    const fromInput = element.querySelector(this.getSelectorFrom()) as HTMLInputElement;
                    const toInput = element.querySelector(this.getSelectorTo()) as HTMLInputElement;

                    if (!fromInput && !toInput) {
                        return;
                    }

                    const from = urlFrom || this.getDefaultFrom() || '';
                    const to = urlTo || this.getDefaultTo() || '';

                    if (fromInput) {
                        fromInput.value = from;
                        if (this.getMinDate()) {
                            fromInput.min = this.getMinDate();
                        }
                        if (this.getMaxDate()) {
                            fromInput.max = this.getMaxDate();
                        }
                        fromInput.addEventListener('change', () => {
                            this.handleRange(fromInput, toInput);
                        });
                    }

                    if (toInput) {
                        toInput.value = to;
                        if (this.getMinDate()) {
                            toInput.min = this.getMinDate();
                        }
                        if (this.getMaxDate()) {
                            toInput.max = this.getMaxDate();
                        }
                        toInput.addEventListener('change', () => {
                            this.handleRange(fromInput, toInput);
                        });
                    }

                    this.setRangeValue(from, to);
                    return;
                }

                // Exact mode (input)
                const exactInput = element.querySelector(this.getSelectorExactInput()) as HTMLInputElement;
                if (exactInput) {
                    let exact = urlExact || this.getDefaultExact() || '';

                    if (this.getOnlyAggregationValues() && this.availableValues.size > 0 && exact &&
                        !this.availableValues.has(exact)) {
                        exact = '';
                    }

                    exactInput.value = exact;
                    if (this.getMinDate()) {
                        exactInput.min = this.getMinDate();
                    }
                    if (this.getMaxDate()) {
                        exactInput.max = this.getMaxDate();
                    }

                    exactInput.addEventListener('change', () => {
                        this.handleExact(exactInput);
                    });

                    this.setExactValue(exact);
                    return;
                }

                // Exact mode (select)
                const exactSelect = element.querySelector(this.getSelectorExactSelect()) as HTMLSelectElement;
                if (exactSelect) {
                    let exact = urlExact || this.getDefaultExact() || '';

                    if (this.getOnlyAggregationValues() && this.availableValues.size > 0 && exact &&
                        !this.availableValues.has(exact)) {
                        exact = '';
                    }

                    exactSelect.value = exact;
                    exactSelect.addEventListener('change', () => {
                        this.handleExact(exactSelect);
                    });

                    this.setExactValue(exact);
                }
            });

        // Emit initial state if active (similar to Checkbox/Switch behavior)
        if (this.hasActiveAggregation) {
            Events.emit(Events.onAggregationValueChange, {
                'initial': true,
                'name': this.getAttribute(),
                'hasActive': this.hasActiveAggregation,
            });
        }
    }

    setInactiveValue() {
        this.hasActiveAggregation = false;

        if (this.getMode() === 'exact' && this.getExactQuery() === 'match') {
            this.value = {
                field: this.getAttribute(),
                value: '',
                is_aggregation: true,
                exclude_from_search: true,
            };
            return;
        }

        this.value = {
            field: this.getAttribute(),
            gte: undefined,
            lte: undefined,
            is_aggregation: true,
            exclude_from_search: true,
        };
    }

    setExactValue(exact: string) {
        this.hasActiveAggregation = true;

        if (!exact) {
            this.setInactiveValue();
            return;
        }

        if (this.getExactQuery() === 'range_day') {
            const bounds = this.dateToDayBounds(exact);
            this.value = {
                field: this.getAttribute(),
                gte: bounds.gte,
                lte: bounds.lte,
                is_aggregation: true,
            };
        } else {
            this.value = {
                field: this.getAttribute(),
                value: exact,
                is_aggregation: true,
            };
        }
    }

    setRangeValue(from: string, to: string) {
        this.hasActiveAggregation = true;

        if (!from && !to) {
            this.setInactiveValue();
            return;
        }

        this.value = {
            field: this.getAttribute(),
            gte: from || undefined,
            lte: to || undefined,
            is_aggregation: true,
        };
    }

    dateToDayBounds(date: string): { gte: string; lte: string } {
        if (this.getInputType() !== 'date') {
            return {gte: date, lte: date};
        }

        return {
            gte: `${date}T00:00:00`,
            lte: `${date}T23:59:59.999`,
        };
    }

    handleExact(element: HTMLInputElement|HTMLSelectElement, skipHistory: boolean = false) {
        if (this.getMode() !== 'exact') {
            return;
        }

        let value = element.value;

        if (this.getOnlyAggregationValues() && this.availableValues.size > 0 && value &&
            !this.availableValues.has(value)) {
            value = '';
            element.value = '';
        }

        // Guard: if a datepicker re-triggers "change" with the same value, don't start a new request loop.
        if (this.getExactQuery() === 'range_day') {
            const currentGte = this.value?.gte || '';
            const currentLte = this.value?.lte || '';
            const next = value ? this.dateToDayBounds(value) : {gte: '', lte: ''};

            if ((currentGte || '') === (next.gte || '') && (currentLte || '') === (next.lte || '')) {
                return;
            }
        } else {
            const currentValue = (this.value && typeof this.value.value === 'string') ? this.value.value : '';
            if ((currentValue || '') === (value || '')) {
                return;
            }
        }

        if (!skipHistory) {
            URIHelper.addToHistory(this.getParamExact(), value);
        }

        this.setExactValue(value);

        Events.emit(Events.onBeforeResultRequest, {});
        Events.emit(Events.onAggregationValueChange, {
            'initial': false,
            'name': this.getAttribute(),
            'hasActive': this.hasActiveAggregation,
            'value': value,
        });
    }

    handleRange(fromInput: HTMLInputElement, toInput: HTMLInputElement, skipHistory: boolean = false) {
        if (this.getMode() !== 'range') {
            return;
        }

        const from = (fromInput) ? fromInput.value : '';
        const to = (toInput) ? toInput.value : '';

        // Guard: prevent repeated change triggers (e.g. datepicker init) from causing request loops.
        const currentFrom = this.value?.gte || '';
        const currentTo = this.value?.lte || '';
        if ((currentFrom || '') === (from || '') && (currentTo || '') === (to || '')) {
            return;
        }

        if (!skipHistory) {
            URIHelper.addToHistory(this.getParamMin(), from);
            URIHelper.addToHistory(this.getParamMax(), to);
        }

        this.setRangeValue(from, to);

        Events.emit(Events.onBeforeResultRequest, {});
        Events.emit(Events.onAggregationValueChange, {
            'initial': false,
            'name': this.getAttribute(),
            'hasActive': this.hasActiveAggregation,
            'value': `${from}:${to}`,
        });
    }

    reset() {
        if (this.getMode() === 'exact') {
            document.querySelectorAll(this.getRootSelector())
                .forEach((element) => {
                    const input = element.querySelector(this.getSelectorExactInput()) as HTMLInputElement;
                    const select = element.querySelector(this.getSelectorExactSelect()) as HTMLSelectElement;

                    if (input) {
                        input.value = this.getDefaultExact() || '';
                        this.handleExact(input);
                    }

                    if (select) {
                        select.value = this.getDefaultExact() || '';
                        this.handleExact(select);
                    }
                });
            return;
        }

        document.querySelectorAll(this.getRootSelector())
            .forEach((element) => {
                const fromInput = element.querySelector(this.getSelectorFrom()) as HTMLInputElement;
                const toInput = element.querySelector(this.getSelectorTo()) as HTMLInputElement;

                const from = this.getDefaultFrom() || '';
                const to = this.getDefaultTo() || '';

                if (fromInput) {
                    fromInput.value = from;
                }
                if (toInput) {
                    toInput.value = to;
                }

                this.handleRange(fromInput, toInput);
            });
    }
}

