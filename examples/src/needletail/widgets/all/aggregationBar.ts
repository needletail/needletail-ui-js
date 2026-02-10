import {AggregationBar} from '@needletail/ui';

import SwitchInStock from '../../aggregations/switchInStock';
import CheckboxBrand from '../../aggregations/checkboxBrand';
import RadioColor from '../../aggregations/radioColor';
import SliderPrice from '../../aggregations/sliderPrice';
import SliderPriceRange from '../../aggregations/sliderPriceRange';
import DropdownBrand from '../../aggregations/dropdownBrand';
import DateFilterCreatedAtRange from '../../aggregations/dateFilterCreatedAtRange';
import DateFilterCreatedAtExactWhitelist from '../../aggregations/dateFilterCreatedAtExactWhitelist';
import DatePresetsCreatedAt from '../../aggregations/datePresetsCreatedAt';
import MultiDateDeliveryDate from '../../aggregations/multiDateDeliveryDate';
import GeoRadiusLocation from '../../aggregations/geoRadiusLocation';

/**
 * AggregationBar (filters column) for the "All widgets" page.
 */

// Always check if the element actually exists, if not there's no need to start defining the AggregationBar widget.
// If we don't do this Javascript will throw errors.
if (document.getElementById('aggregation-bar')) {
    const aggregationBar = new AggregationBar({
        el: '#aggregation-bar', // The element the AggregationBar will be put in.

        clear_filters: {
            use: true, // Show the "Clear filters" control. Default: false
            top: true, // Render it at the top of the bar. Default: false
            bottom: false, // Render it at the bottom of the bar. Default: false
            text: 'Clear filters', // The link text. Default: 'Clear filters'
            hide_on_none_active: true, // Hide when there are no active filters. Default: true
        },

        use_skeleton: false, // Render skeleton placeholders while waiting for the first results. Default: false
    })
        // Switch
        // .addField(SwitchInStock)
        // Checkbox / Radio / Slider / etc.
        .addField(GeoRadiusLocation)
        .addField(CheckboxBrand)
        // .addField(RadioColor)
        // .addField(SliderPrice)
        .addField(SliderPriceRange)
        .addField(DropdownBrand)
        .addField(DateFilterCreatedAtRange)
        // .addField(DateFilterCreatedAtExactWhitelist)
        // .addField(DatePresetsCreatedAt)
        // .addField(MultiDateDeliveryDate)
        ;

    // Add the widget to Needletail.
    // eslint-disable-next-line no-unsafe-optional-chaining
    (window as any).needletail.addWidget(aggregationBar);
}

