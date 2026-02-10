import {Result} from '@needletail/ui';
import {loadConfig} from '../../../shared/config';

/**
 * Result widget for the "All widgets" page.
 *
 * This widget listens to filter/search events, builds the Needletail query payload,
 * and renders results + pagination + sort select.
 */

if (document.getElementById('result')) {
    const config = loadConfig();

    const result = new Result({
        el: '#result', // The element the Result widget will be put in.

        // Query name used in internal payloads (and sometimes templates).
        query: 'result', // Default: 'result'

        // Pagination / paging.
        per_page: 10, // Records per page. Default: 10
        minify_pages: 5, // Number of "middle" pages to show. Default: 5
        pagination: {
            previous: 'Previous', // Button label. Default: 'Previous'
            next: 'Next', // Button label. Default: 'Next'
            first: 'First', // Button label. Default: 'First'
            last: 'Last', // Button label. Default: 'Last'

            show_quick_pagination: true, // Show "first/last" buttons. Default: false
            scroll_back_to_top: true, // Scroll to top after navigation. Default: true
            scroll_offset: 100, // Scroll offset (px). Default: 100

            active_class: 'active', // Active page class. Default: 'active'
            hide_on_single_page: true, // Hide pagination if only 1 page. Default: true

            // Infinite scroll mode (optional).
            infinite_scroll: false, // Default: false
            bottom_scroll_offset: 0, // Trigger offset (px). Default: 0
        },

        // Templates (optional).
        result_template: '', // Custom template for a single result item (mustache). Default: built-in
        group_by: '', // Grouping field (optional). Default: ''

        // Sort settings.
        sort_by: '', // Default sort field (can be overridden by URL `sort`). Default: ''
        sort_direction: '', // Default sort direction (can be overridden by URL `direction`). Default: ''
        sort_mode: 'min', // Default: 'min'
        sort_select: {
            relevance: {name: 'relevance', display_name: 'Relevance', attribute: '', direction: 'asc'},
            priceAsc: {name: 'priceAsc', display_name: 'Price ↑', attribute: 'price', direction: 'asc'},
            priceDesc: {name: 'priceDesc', display_name: 'Price ↓', attribute: 'price', direction: 'desc'},
        },
        sort_select_default: 'relevance', // Default selected sort. Default: ''

        // Result behavior / messages.
        no_result_message: 'No results where found', // Default: 'No results where found'
        loader: null, // Loader style: 'round-dots'|'round-line'|'straight-bars'|'straight-dots'|null
        total_results_text: ':count total results', // Supports `:count` placeholder.

        // Which buckets to search.
        buckets: [],

        // Extra options passed to Needletail (advanced).
        extra_options: {},

        // Skeleton loading (optional).
        use_skeleton: false, // Default: false
        skeleton_template: '', // Optional custom skeleton template.
    });

    // eslint-disable-next-line no-unsafe-optional-chaining
    (window as any).needletail.addWidget(result);
}

