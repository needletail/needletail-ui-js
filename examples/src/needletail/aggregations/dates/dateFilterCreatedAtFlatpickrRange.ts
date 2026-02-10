import {DateFilter} from '@needletail/ui';

import DateFilterRangeFlatpickrTemplate from '../../../templates/date_filter_range_flatpickr';

/**
 * DateFilter RANGE mode configured for Flatpickr.
 *
 * - Uses a visible `<input type="text">` for Flatpickr
 * - Mirrors into hidden inputs that the DateFilter listens to
 */

export const createdAtFlatpickrRange = new DateFilter({
    title: 'Created at flatpickr range',
    attribute: 'created_at',

    template: '', // We'll override via `.setTemplate()` below.
    use_skeleton: false,

    collapsible: false,
    default_collapsed: false,

    mode: 'range',
    range: true,
    input_type: 'date',

    min_date: '',
    max_date: '',
    default_from: '',
    default_to: '',
    default_exact: '',

    only_aggregation_values: false,
    use_aggregation_values: false,
    exact_query: 'match',

    any_label: 'Any date',
    label_from: 'From',
    label_to: 'To',

    selectors: {
        from: '',
        to: '',
        exact: '',
    },
}).setTemplate(DateFilterRangeFlatpickrTemplate);

export default createdAtFlatpickrRange;

