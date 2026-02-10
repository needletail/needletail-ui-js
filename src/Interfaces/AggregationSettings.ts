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
    use_skeleton?: boolean;
}

/**
 * Contains the specific settings for the checkbox aggregation
 */
export interface CheckboxSettings extends AggregationSettings {
    hide_on_empty?: boolean;
    option_order?: string[];
    filter_options?: string[];
    show_selected_zero?: boolean;
    show_more_options?: {
        use?: boolean;
        text?: string;
        less_text?: string;
        load?: number;
        never_hide_checked?: boolean;
    },
    search?: {
        use?: boolean;
        placeholder?: string;
        debounce?: number;
        min_options?: number;
    },
    skeleton_item_count?: number;
}

/**
 * Contains the specific settings for the radio aggregation
 */
export interface RadioSettings extends AggregationSettings {
    hide_on_empty?: boolean;
    option_order?: string[];
    filter_options?: string[];
    show_more_options?: {
        use?: boolean;
        text?: string;
        less_text?: string;
        load?: number;
    },
    search?: {
        use?: boolean;
        placeholder?: string;
        debounce?: number;
        min_options?: number;
    },
    skeleton_item_count?: number;
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

/**
 * Contains the specific settings for the date filter aggregation
 */
export interface DateFilterSettings extends AggregationSettings {
    mode?: 'range' | 'exact';
    range?: boolean;
    min_date?: string;
    max_date?: string;
    default_from?: string;
    default_to?: string;
    default_exact?: string;
    input_type?: 'date' | 'datetime-local';
    only_aggregation_values?: boolean;
    use_aggregation_values?: boolean;
    exact_query?: 'match' | 'range_day';
    any_label?: string;
    label_from?: string;
    label_to?: string;
    selectors?: {
        from?: string;
        to?: string;
        exact?: string;
    };
}

/**
 * Contains the specific settings for the dropdown select aggregation
 */
export interface DropdownSelectSettings extends AggregationSettings {
    hide_on_empty?: boolean;
    option_order?: string[];
    filter_options?: string[];
    any_label?: string;
}

/**
 * Contains the specific settings for the date presets aggregation
 */
export interface DatePresetsSettings extends AggregationSettings {
    presets?: {
        key: 'today' | 'last_7_days' | 'this_month' | 'custom';
        label: string;
    }[];
    show_custom?: boolean;
    input_type?: 'date' | 'datetime-local';
    min_date?: string;
    max_date?: string;
    any_label?: string;
    label_from?: string;
    label_to?: string;
}

/**
 * Contains the specific settings for the multi date aggregation
 */
export interface MultiDateSettings extends AggregationSettings {
    input_type?: 'date' | 'datetime-local';
    min_date?: string;
    max_date?: string;
    any_label?: string;
    add_label?: string;
}

/**
 * Contains the specific settings for the geo radius aggregation
 */
export interface GeoRadiusSettings extends AggregationSettings {
    cities_bucket?: string;
    cities_search_fields?: string[] | string;
    display_field?: string;
    lat_field?: string;
    lng_field?: string;

    distance_options?: { value: string; label: string }[];
    default_distance?: string;

    location_placeholder?: string;

    show_geolocation?: boolean;
    geolocate_label?: string;

    min_chars?: number;
    limit?: number;
    debounce?: number;

    no_result_message?: string;
}
