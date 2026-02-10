import {Result} from '@needletail/ui';
import {loadConfig} from '../../../shared/config';

/**
 * Result widget for the "Apply mode" demo page.
 *
 * Apply-mode is enabled automatically when `ApplyFilters` widget exists.
 */

if (document.getElementById('result')) {
    const config = loadConfig();

    const result = new Result({
        el: '#result',

        query: 'result',

        per_page: 10,
        minify_pages: 5,
        pagination: {
            previous: 'Previous',
            next: 'Next',
            first: 'First',
            last: 'Last',

            show_quick_pagination: true,
            scroll_back_to_top: true,
            scroll_offset: 100,

            active_class: 'active',
            hide_on_single_page: true,

            infinite_scroll: false,
            bottom_scroll_offset: 0,
        },

        // Sorting demo
        sort_select: {
            relevance: {name: 'relevance', display_name: 'Relevance', attribute: '', direction: 'asc'},
            priceAsc: {name: 'priceAsc', display_name: 'Price ↑', attribute: 'price', direction: 'asc'},
            priceDesc: {name: 'priceDesc', display_name: 'Price ↓', attribute: 'price', direction: 'desc'},
        },
        sort_select_default: 'relevance',

        no_result_message: 'No results where found',
        total_results_text: ':count total results',

        buckets: [config.productsBucket],

        extra_options: {},

        use_skeleton: false,
        skeleton_template: '',
    });

    // eslint-disable-next-line no-unsafe-optional-chaining
    (window as any).needletail.addWidget(result);
}

