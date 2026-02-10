import {Result} from '@needletail/ui';
import {loadConfig} from '../../../shared/config';

/**
 * Result widget for the "Dates (Flatpickr)" page.
 */

if (document.getElementById('result')) {
    const config = loadConfig();

    const result = new Result({
        el: '#result',

        query: 'result',
        per_page: 10,

        // Keep defaults explicit (so copy/paste is easy).
        minify_pages: 5,
        pagination: {
            previous: 'Previous',
            next: 'Next',
            first: 'First',
            last: 'Last',
            show_quick_pagination: false,
            scroll_back_to_top: true,
            scroll_offset: 100,
            active_class: 'active',
            hide_on_single_page: true,
            infinite_scroll: false,
            bottom_scroll_offset: 0,
        },

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

