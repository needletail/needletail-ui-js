/* eslint-disable camelcase */

/**
 * Contains the base settings for all aggregations
 */
export interface AggregationSettings {
    title?: string;
    template?: string;
    attribute?: string;
    collapsible?: boolean;
    default_collapsed?: boolean;
}

/**
 * Contains the specific settings for the checkbox aggregation
 */
export interface CheckboxSettings extends AggregationSettings {
    hide_on_empty?: boolean;
    option_order?: string[];
    show_more_options?: {
        use?: boolean;
        text?: string;
        less_text?: string;
        load?: number;
        never_hide_checked?: boolean;
    }
}

/**
 * Contains the specific settings for the radio aggregation
 */
export interface RadioSettings extends AggregationSettings {
    hide_on_empty?: boolean;
    option_order?: string[];
    show_more_options?: {
        use?: boolean;
        text?: string;
        less_text?: string;
        load?: number;
    }
}

/**
 * Contains the specific settings for the slider aggregation
 */
export interface SliderSettings extends AggregationSettings {
    min?: number;
    max?: number;
    default_value?: number;
    range?: boolean;
    default_range_min?: number;
    default_range_max?: number;
    type?: string;
    inputs?: string;
    display_only?: boolean;
}

/**
 * Contains the specific settings for the switch aggregation
 */
export interface SwitchSettings extends AggregationSettings {
    on_value?: string;
    off_value?: string;
    attribute_value?: string;
}
