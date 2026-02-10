import {GroupedSearchBar} from '@needletail/ui';
import {loadConfig} from '../../../shared/config';

/**
 * GroupedSearchBar widget for the "All widgets" page.
 *
 * This widget groups results by a field (e.g. category) and shows a grouped dropdown.
 */

if (document.getElementById('grouped-search-bar')) {
    const config = loadConfig();

    const groupedSearchBar = new GroupedSearchBar({
        el: '#grouped-search-bar', // The element the GroupedSearchBar will be put in.

        debounce: {
            use: true, // Default: true
            wait: 200, // Default: 200ms
            url_wait: 2000, // Default: 2000ms
        },

        placeholder: 'Type to search (GroupedSearchBar)', // Default: 'Start typing to search'
        no_result_message: 'No results where found', // Default: 'No results where found'

        in_url: true, // Store value in URL. Default: true
        query: 'gq', // URL param name. Default: 'groupedSearchBar'

        search: {
            buckets: [config.productsBucket],

            attribute: ['title', 'body'],
            attributes: [],

            size: 3, // Default: 3
            group_by: '', // Grouping field in Needletail (optional)
            sort_by: '',
            sort_direction: 'asc',
            sort_mode: 'min',
        },

        minimum_characters: 3, // Default: 3
        show_results: true, // Default: true
        search_on_content_loaded: true, // Default: true
        initial_input: true, // Default: true
        fill_input_on_click: false, // Default: false
    });

    // eslint-disable-next-line no-unsafe-optional-chaining
    (window as any).needletail.addWidget(groupedSearchBar);
}

