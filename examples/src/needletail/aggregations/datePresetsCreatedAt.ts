import {DatePresets} from '@needletail/ui';

/**
 * DatePresets aggregation.
 *
 * Presets update the same URL params as a range DateFilter:
 * - `${title}[min]`
 * - `${title}[max]`
 */

export default new DatePresets({
    title: 'Created at presets',
    attribute: 'postDate',

    template: '', // Custom template (Mustache). Leave empty to use the default template.
    use_skeleton: false,

    collapsible: false,
    default_collapsed: false,

    // Preset definitions (override defaults if desired).
    presets: [
        {key: 'today', label: 'Today'},
        {key: 'last_7_days', label: 'Last 7 days'},
        {key: 'this_month', label: 'This month'},
        {key: 'custom', label: 'Custom'},
    ],

    show_custom: true, // Show the custom range UI. Default: true
    input_type: 'date', // 'date' | 'datetime-local'. Default: 'date'

    min_date: '', // Optional min constraint
    max_date: '', // Optional max constraint

    any_label: 'Any', // Default: 'Any'
    label_from: 'From', // Default: 'From'
    label_to: 'To', // Default: 'To'
});

