import {DropdownSelect} from '@needletail/ui';

/**
 * DropdownSelect aggregation.
 */

export default new DropdownSelect({
    title: 'Brand dropdown', // The title shown above the select.
    attribute: 'employmentType.title', // The attribute we filter on.

    template: '', // Custom template (Mustache). Leave empty to use the default template.
    use_skeleton: false, // Render a skeleton until first results. Default: inherits from AggregationBar (or false).

    collapsible: false, // Can the filter be collapsed. Default: false
    default_collapsed: false, // Is it collapsed by default. Default: false

    hide_on_empty: true, // Hide when there are no options. Default: true
    option_order: [], // Force option ordering (optional).
    filter_options: [], // Filter options (optional).
    any_label: 'Any brand', // Label for the empty option. Default: 'Any'
});

