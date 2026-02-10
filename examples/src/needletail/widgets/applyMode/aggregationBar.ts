import {AggregationBar} from '@needletail/ui';

import CheckboxBrand from '../../aggregations/checkboxBrand';

/**
 * AggregationBar for the "Apply mode" demo page.
 */

if (document.getElementById('aggregation-bar')) {
    const aggregationBar = new AggregationBar({
        el: '#aggregation-bar',

        clear_filters: {
            use: true,
            top: true,
            bottom: false,
            text: 'Clear filters',
            hide_on_none_active: true,
        },

        use_skeleton: false,
    })
        .addField(CheckboxBrand);

    // eslint-disable-next-line no-unsafe-optional-chaining
    (window as any).needletail.addWidget(aggregationBar);
}

