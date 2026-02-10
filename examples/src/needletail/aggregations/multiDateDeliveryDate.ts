import {MultiDate} from '@needletail/ui';

/**
 * MultiDate aggregation.
 *
 * Stores multiple values as repeated URL params: `?Delivery%20dates%20multi=2026-02-04&Delivery%20dates%20multi=2026-02-13`
 */

export default new MultiDate({
    title: 'Delivery dates multi',
    attribute: 'postDate',

    template: '', // Custom template (Mustache). Leave empty to use the default template.
    use_skeleton: false,

    collapsible: false,
    default_collapsed: false,

    input_type: 'date', // 'date' | 'datetime-local'. Default: 'date'
    min_date: '', // Optional min constraint
    max_date: '', // Optional max constraint

    any_label: 'Pick a date', // Placeholder. Default: 'Select a date'
    add_label: 'Add', // Button label. Default: 'Add'
});

