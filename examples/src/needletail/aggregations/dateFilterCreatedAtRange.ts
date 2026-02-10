import {DateFilter} from '@needletail/ui';

/**
 * DateFilter aggregation (RANGE mode).
 *
 * Uses Needletail `equals.range` under the hood (gte/lte).
 */

export default new DateFilter({
    title: 'Created at range', // The title shown above the filter.
    attribute: 'postDate', // The attribute we filter on.

    template: '', // Custom template (Mustache). Leave empty to use the default template.
    use_skeleton: false, // Render a skeleton until first results. Default: inherits from AggregationBar (or false).

    collapsible: false, // Can the filter be collapsed. Default: false
    default_collapsed: false, // Is it collapsed by default. Default: false

    // Mode can be 'range' or 'exact'.
    mode: 'range',

    // Optional alternative config style (Slider-like): range: true|false
    range: true,

    // HTML input type: 'date' | 'datetime-local'
    input_type: 'date',

    // Hard min/max selectable dates (optional).
    min_date: '', // Default: ''
    max_date: '', // Default: ''

    // Default values when URL has none (optional).
    default_from: '', // Default: ''
    default_to: '', // Default: ''
    default_exact: '', // Default: ''

    // Aggregation-value behavior (mostly useful for exact mode).
    only_aggregation_values: false, // If true, exact mode restricts to values returned in aggs.
    use_aggregation_values: false, // If true, exposes `available_dates` to the template.

    // Exact-mode query style (ignored in range mode).
    exact_query: 'match', // 'match' | 'range_day'

    // Labels (used in templates).
    any_label: 'Any date', // Placeholder for the main input. Default: 'Any date'
    label_from: 'From', // Default: 'From'
    label_to: 'To', // Default: 'To'

    // Optional: selectors for custom templates / datepicker plugins.
    selectors: {
        from: '', // Default: '.needletail-aggregation-date-filter-input-from'
        to: '', // Default: '.needletail-aggregation-date-filter-input-to'
        exact: '', // Default: '.needletail-aggregation-date-filter-input'
    },
});

