import {Switch} from '@needletail/ui';

/**
 * Switch aggregation.
 *
 * Emits a match filter when enabled/disabled.
 */

export default new Switch({
    title: 'In stock', // The title shown above the switch.
    attribute: 'in_stock', // The attribute we filter on.

    template: '', // Custom HTML template (Mustache). Leave empty to use the default template.
    use_skeleton: false, // Render a skeleton until first results. Default: inherits from AggregationBar (or false).

    collapsible: false, // Can the aggregation be collapsed. Default: false
    default_collapsed: false, // Is it collapsed by default. Default: false

    on_value: 'yes', // Value used when toggled "on". Default: 'On'
    off_value: 'no', // Value used when toggled "off". Default: 'Off'

    // Optional: value to send to the index field (defaults to on_value).
    attribute_value: 'yes',
});

