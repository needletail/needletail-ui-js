import {Slider} from '@needletail/ui';

/**
 * Slider aggregation (single value).
 *
 * Note: Slider contributes to `equals.match` (legacy UI behavior), not `equals.range`.
 */

export default new Slider({
    title: 'Price', // The title shown above the filter.
    attribute: 'minHours', // The attribute we filter on.

    template: '', // Custom HTML template (Mustache). Leave empty to use the default template.
    use_skeleton: false, // Render a skeleton until first results. Default: inherits from AggregationBar (or false).

    collapsible: false, // Can the filter be collapsed. Default: false
    default_collapsed: false, // Is it collapsed by default. Default: false

    min: 0, // Minimum value. Default: 0
    max: 200, // Maximum value. Default: 10
    default_value: 50, // Default value (single slider). Default: 5

    range: false, // Set to true to enable the range slider variant. Default: false
    default_range_min: 0, // Default minimum (range slider). Default: min
    default_range_max: 200, // Default maximum (range slider). Default: max

    type: 'to', // 'to' | 'from' | 'from:to'. Default: 'to' (range mode forces 'from:to')
    inputs: 'top', // 'top' | 'bottom'. Default: 'top'
    display_only: false, // If true, inputs are display-only. Default: false
});

