/**
 * Contains the base settings for widgets
 */
export interface WidgetSettings {
    el?: string;
}

/**
 * Contains the specific settings for the aggregation bar widget
 */
export interface AggregationBarSettings extends WidgetSettings {
    clear_filters?: {
        use?: boolean;
        top?: boolean;
        bottom?: boolean;
        text?: string;
    }
}

/**
 * Contains the specific settings for the autocomplete bar widget
 */
export interface AutocompleteBarSettings extends WidgetSettings {
    debounce?: {
        use?: boolean;
        wait?: number;
        url_wait?: number;
    },
    placeholder?: string;
    no_result_message?: string;
    in_url?: boolean;
    query?: string;
    search?: {
        buckets?: string;
        attribute?: string;
        size?: number;
        group_by?: string;
        sort_by?: string;
    }
    minimum_characters?: number;
    show_results?: boolean;
    use_in_results?: boolean;
    search_on_content_loaded?: boolean;
    live_results?: boolean;
    initial_input?: boolean;
    force_use_of_result?: boolean;
}

/**
 * Contains the specific settings for the grouped search bar widget
 */
export interface GroupedSearchBarSettings extends WidgetSettings {
    debounce?: {
        use?: boolean;
        wait?: number;
        url_wait?: number;
    },
    placeholder?: string;
    no_result_message?: string;
    in_url?: boolean;
    query?: string;
    search?: {
        buckets?: string;
        attribute?: string;
        size?: number;
        group_by?: string;
        sort_by?: string;
    }
    minimum_characters?: number;
    show_results?: boolean;
    search_on_content_loaded?: boolean;
    initial_input?: boolean;
}

/**
 * Contains the specific settings for the result widet
 */
export interface ResultSettings extends WidgetSettings {
    per_page?: number;
    minify_pages?: number;
    pagination?: {
        previous?: string;
        next?: string;
        first?: string;
        last?: string;
        show_quick_pagination?: boolean;
    },
    result_template?: string;
    group_by?: string;
    sort_by?: string;
}