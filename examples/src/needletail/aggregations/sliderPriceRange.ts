import {Slider} from '@needletail/ui';

/**
 * Slider aggregation (range value).
 */

export default new Slider({
    title: 'Price range', // The title shown above the filter.
    attribute: 'minHours', // The attribute we filter on.

    template: '', // Custom HTML template (Mustache). Leave empty to use the default template.
    use_skeleton: false, // Render a skeleton until first results. Default: inherits from AggregationBar (or false).

    collapsible: false, // Can the filter be collapsed. Default: false
    default_collapsed: false, // Is it collapsed by default. Default: false

    min: 0,
    max: 200,

    // Range slider mode
    range: true, // Default: false
    default_range_min: 0, // Default: min
    default_range_max: 200, // Default: max

    // Range slider forces this internally, but we keep it explicit.
    type: 'from:to', // Allowed: 'to' | 'from' | 'from:to'

    inputs: 'top', // 'top' | 'bottom'. Default: 'top'
    display_only: false, // Default: false
});

