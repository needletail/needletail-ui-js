import {AutocompleteBar} from '@needletail/ui';
import {loadConfig} from '../../../shared/config';

/**
 * AutocompleteBar widget for the "All widgets" page.
 */

if (document.getElementById('autocomplete-bar')) {
    const config = loadConfig();

    const autocompleteBar = new AutocompleteBar({
        el: '#autocomplete-bar', // The element the AutocompleteBar will be put in.

        // Debounce settings (recommended: on).
        debounce: {
            use: true, // Default: true
            wait: 200, // Default: 200ms
            url_wait: 2000, // Default: 2000ms (URL updates are less frequent)
        },

        placeholder: 'Type to search (AutocompleteBar)', // Placeholder text. Default: 'Start typing to search'
        no_result_message: 'No results where found', // Default: 'No results where found'

        in_url: true, // Store the input value in the URL. Default: true
        query: 'q', // URL param name. Default: 'autocompleteBar'

        // Search request configuration sent to Needletail.
        search: {
            buckets: [config.productsBucket], // Which buckets to search.

            // Which fields to search in (Needletail fuzzy search).
            // Both `attribute` (string|string[]) and `attributes` exist for backwards compatibility.
            attribute: ['title'],
            attributes: [],

            size: 6, // Amount of suggestions to show. Default: 10

            // Optional grouping/sorting for suggestions.
            group_by: '',
            sort_by: '',
            sort_direction: 'asc',
            sort_mode: 'min',

            // Optional: show bucket labels in results (useful when searching multiple buckets).
            show_bucket: false,
            bucket_mapping: {}, // Map raw bucket names -> display labels.
        },

        minimum_characters: 3, // Minimum characters before searching. Default: 3
        show_results: true, // Show the suggestions dropdown. Default: true
        use_in_results: true, // Include the selected value in Result's query. Default: true
        search_on_content_loaded: true, // Run initial search from URL on load. Default: true

        // If true, update Result live while typing (can be gated by Apply-mode when ApplyFilters exists).
        live_results: true, // Default: false

        initial_input: true, // Render the input initially. Default: true
        force_use_of_result: false, // Force selecting a suggestion instead of free text. Default: false
        fill_input_on_click: false, // Copy clicked suggestion into the input. Default: false
    });

    // eslint-disable-next-line no-unsafe-optional-chaining
    (window as any).needletail.addWidget(autocompleteBar);
}

