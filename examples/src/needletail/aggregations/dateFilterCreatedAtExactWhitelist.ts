import {DateFilter} from '@needletail/ui';

/**
 * DateFilter aggregation (EXACT mode) with aggregation values enabled.
 *
 * - `use_aggregation_values: true` exposes `available_dates` in the Mustache template
 * - you can combine this with a custom template/plugin (like Flatpickr) to whitelist available dates
 */

export default new DateFilter({
    title: 'Created at exact whitelist',
    attribute: 'postDate',

    template: '', // Custom template (Mustache). Leave empty to use the default template.
    use_skeleton: false,

    collapsible: false,
    default_collapsed: false,

    mode: 'exact',
    range: false, // Slider-like alternative config style: false => exact

    input_type: 'date',

    min_date: '',
    max_date: '',

    default_from: '',
    default_to: '',
    default_exact: '',

    // Use agg values from Needletail, so the template can render a list/datalist (and plugins can read it).
    use_aggregation_values: true, // Default: false

    // If true, selecting an unavailable date will be cleared.
    // For strict "only available dates" behavior, set this to true.
    only_aggregation_values: false, // Default: false

    // Exact can either be a match (value='2026-01-14') or a day-bounded range for datetime fields.
    exact_query: 'match', // 'match' | 'range_day'

    any_label: 'Any date',
    label_from: 'From',
    label_to: 'To',

    selectors: {
        from: '',
        to: '',
        exact: '',
    },
});

