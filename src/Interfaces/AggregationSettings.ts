/**
 * Contains the base settings for all aggregations
 */
export interface AggregationSettings {
    title?: string;
    template?: string;
    attribute?: string;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
}

/**
 * Contains the specific settings for the checkbox aggregation
 */
export interface CheckboxSettings extends AggregationSettings {

}

/**
 * Contains the specific settings for the radio aggregation
 */
export interface RadioSettings extends AggregationSettings {

}

/**
 * Contains the specific settings for the slider aggregation
 */
export interface SliderSettings extends AggregationSettings {
    min?: number;
    max?: number;
    defaultValue?: number;
}

/**
 * Contains the specific settings for the switch aggregation
 */
export interface SwitchSettings extends AggregationSettings {
    onValue?: string;
    offValue?: string;
    attributeValue?: string;
}