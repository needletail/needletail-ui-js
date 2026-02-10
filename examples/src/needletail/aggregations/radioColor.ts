import {Radio} from '@needletail/ui';

/**
 * Radio aggregation (searchable).
 */

export default new Radio({
    title: 'Color', // The title shown above the filter.
    attribute: 'color', // The attribute we filter on.

    template: '', // Custom HTML template (Mustache). Leave empty to use the default template.
    use_skeleton: false, // Render a skeleton until first results. Default: inherits from AggregationBar (or false).

    collapsible: false, // Can the filter be collapsed. Default: false
    default_collapsed: false, // Is it collapsed by default. Default: false

    hide_on_empty: true, // Hide the filter when there are no options. Default: true
    option_order: [], // Force a fixed option order (optional).
    filter_options: [], // Filter the available options (optional).

    show_more_options: {
        use: true, // Show a "show more" button. Default: true
        text: 'Show more options', // Default: 'Show more options'
        less_text: 'Show less options', // Default: 'Show less options'
        load: 10, // Default: 10
    },

    // Search within options (turns this into "SearchableRadio").
    search: {
        use: true, // Default: false
        placeholder: 'Search colors…', // Default: 'Search...'
        debounce: 150, // Default: 150
        min_options: 1, // Default: 15
    },

    skeleton_item_count: 10, // Default: 10
});

