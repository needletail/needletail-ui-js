import {DateFilter} from '@needletail/ui';

import DateFilterExactFlatpickrTemplate from '../../../templates/date_filter_exact_flatpickr';

/**
 * DateFilter EXACT mode configured for Flatpickr + whitelist.
 *
 * - `use_aggregation_values: true` makes DateFilter collect available values from aggs
 * - The template exposes `available_values_json` so Flatpickr can enable only those days
 */

export const createdAtFlatpickrExactWhitelist = new DateFilter({
    title: 'Created at flatpickr exact whitelist',
    attribute: 'created_at',

    template: '', // We'll override via `.setTemplate()` below.
    use_skeleton: false,

    collapsible: false,
    default_collapsed: false,

    mode: 'exact',
    range: false,
    input_type: 'date',

    min_date: '',
    max_date: '',
    default_from: '',
    default_to: '',
    default_exact: '',

    // Important for whitelist:
    use_aggregation_values: true, // Exposes `available_dates` and JSON to the template
    only_aggregation_values: false, // Flatpickr will do the strict enable/disable in this example

    exact_query: 'match',

    any_label: 'Select date…',
    label_from: 'From',
    label_to: 'To',

    selectors: {
        from: '',
        to: '',
        exact: '',
    },
}).setTemplate(DateFilterExactFlatpickrTemplate);

export default createdAtFlatpickrExactWhitelist;

