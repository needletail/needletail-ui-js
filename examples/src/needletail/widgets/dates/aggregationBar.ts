import {AggregationBar} from '@needletail/ui';

import CreatedAtFlatpickrRange from '../../aggregations/dates/dateFilterCreatedAtFlatpickrRange';
import CreatedAtFlatpickrExactWhitelist from '../../aggregations/dates/dateFilterCreatedAtFlatpickrExactWhitelist';
import MultiDateDeliveryDate from '../../aggregations/multiDateDeliveryDate';

/**
 * AggregationBar for the "Dates (Flatpickr)" page.
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
        .addField(CreatedAtFlatpickrRange)
        .addField(CreatedAtFlatpickrExactWhitelist)
        .addField(MultiDateDeliveryDate);

    // eslint-disable-next-line no-unsafe-optional-chaining
    (window as any).needletail.addWidget(aggregationBar);
}

