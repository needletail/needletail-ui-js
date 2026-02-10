import {Checkbox} from '@needletail/ui';

/**
 * Checkbox aggregation (searchable).
 */

export default new Checkbox({
    title: 'Employment Type', // The title shown above the filter.
    attribute: 'employmentType.title', // The attribute we filter on.

    template: '', // Custom HTML template (Mustache). Leave empty to use the default template.
    use_skeleton: false, // Render a skeleton until first results. Default: inherits from AggregationBar (or false).

    collapsible: false, // Can the filter be collapsed. Default: false
    default_collapsed: false, // Is it collapsed by default. Default: false

    hide_on_empty: true, // Hide the filter when there are no options. Default: true

    // Sometimes you want a fixed order for the options. Put them in this array to force ordering.
    // Leaving options out will put them below the forced order (alphabetically).
    option_order: [],

    // If you want to show only specific options, put them here (case-insensitive).
    filter_options: [],

    // Show checked items even if their count is 0 (useful when a filter leads to empty results).
    show_selected_zero: true, // Default: true

    show_more_options: {
        use: true, // Show a "show more" button. Default: true
        text: 'Show more options', // Button text. Default: 'Show more options'
        less_text: 'Show less options', // Button text after expanding. Default: 'Show less options'
        load: 5, // How many options to show before "show more". Default: 10
        never_hide_checked: true, // Never hide already-checked items. Default: true
    },

    // Search within options (turns this into "SearchableCheckbox").
    search: {
        use: true, // Enable search. Default: false
        placeholder: 'Search brands…', // Default: 'Search...'
        debounce: 150, // Debounce input (ms). Default: 150
        min_options: 1, // Only show search UI when there are >= N options. Default: 15
    },

    // Skeleton options count when `use_skeleton` is enabled.
    skeleton_item_count: 10, // Default: 10
});

