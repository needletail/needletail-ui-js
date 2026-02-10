declare module '@needletail/ui' {
    import {Client as NeedletailClient} from '@needletail/js';

    /* eslint-disable camelcase */

    export interface WidgetSettings {
        el?: string;
    }

    export interface AggregationSettings {
        title?: string;
        template?: string;
        attribute?: string;
        collapsible?: boolean;
        default_collapsed?: boolean;
        use_skeleton?: boolean;
        skeleton_template?: string;
    }

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
        };
        skeleton_item_count?: number;
    }

    export interface RadioSettings extends AggregationSettings {
        hide_on_empty?: boolean;
        option_order?: string[];
        filter_options?: string[];
        show_more_options?: {
            use?: boolean;
            text?: string;
            less_text?: string;
            load?: number;
        };
        skeleton_item_count?: number;
    }

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

    export interface SwitchSettings extends AggregationSettings {
        on_value?: string;
        off_value?: string;
        attribute_value?: string;
        default_on?: boolean;
    }

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

    export interface AggregationBarSettings extends WidgetSettings {
        clear_filters?: {
            use?: boolean;
            top?: boolean;
            bottom?: boolean;
            text?: string;
            hide_on_none_active?: boolean;
        };
        use_skeleton?: boolean;
    }

    export interface AutocompleteBarSettings extends WidgetSettings {
        // Simplified: kept broad for compatibility
        [key: string]: any;
    }

    export interface GroupedSearchBarSettings extends WidgetSettings {
        [key: string]: any;
    }

    export interface ResultSettings extends WidgetSettings {
        [key: string]: any;
    }

    export class Events {
        static initNeedletail: string;
        static onSubmitGroupedSearch: string;
        static onGroupedSearch: string;
        static onBeforeGroupedSearch: string;
        static onAfterGroupedSearch: string;
        static onArrowMovementGroupedSearch: string;
        static groupedSearchOpened: string;
        static groupedSearchClosed: string;
        static onSubmitSearch: string;
        static onSearch: string;
        static onBeforeSearch: string;
        static onAfterSearch: string;
        static onArrowMovementSearch: string;
        static onForceResultBlur: string;
        static searchOpened: string;
        static searchClosed: string;
        static onResultRequest: string;
        static onBeforeResultRequest: string;
        static onAfterResultRequest: string;
        static onPageChange: string;
        static onClickResult: string;
        static onAggsUpdate: string;
        static onAggregationValueChange: string;
        static autocompleteBarFinished: string;
        static groupedSearchBarFinished: string;
        static resultFinished: string;
        static aggregationFinished: string;
        static initializeSlider: string;
        static initializeSwitch: string;
        static initializeDateFilter: string;
        static emit(name: string, data?: {}): void;
    }

    export class URIHelper {
        static addToHistory(name: string, value: string, deleteOnExist?: boolean): void;
        static getSearchParam(name: string): string;
        static getSearchParams(name: string): string[];
    }

    class Widget {
        el: string;
        template: string;
        client: Client;
        constructor(options?: WidgetSettings);
        setClient(client: Client): Widget;
        build(options?: {}): void;
        render(options?: {}): Node;
        executeJS(): void;
    }

    class Aggregation {
        title: string;
        classTitle: string;
        template?: string;
        skeletonTemplate: string;
        parent: AggregationBar;
        values: any;
        value: any;
        attribute: string;
        collapsible: boolean;
        defaultCollapsed: boolean;
        hasActiveAggregation: boolean;
        useSkeleton?: boolean;
        constructor(options?: AggregationSettings);
        getTitle(): string;
        getClassTitle(): string;
        getAttribute(): string;
        render(): string;
        renderSkeleton(): string;
        executeJS(): void;
        reset(): void;
    }

    export class Switch extends Aggregation {
        discriminator: string;
        constructor(options?: SwitchSettings);
    }

    export class Checkbox extends Aggregation {
        discriminator: string;
        constructor(options?: CheckboxSettings);
    }

    export class Radio extends Aggregation {
        discriminator: string;
        constructor(options?: RadioSettings);
    }

    export class Slider extends Aggregation {
        discriminator: string;
        constructor(options?: SliderSettings);
    }

    export class DateFilter extends Aggregation {
        discriminator: string;
        constructor(options?: DateFilterSettings);
    }

    export type FieldOptions =
        | Switch
        | Checkbox
        | Radio
        | Slider
        | DateFilter;

    export class AggregationBar extends Widget {
        discriminator: string;
        constructor(options?: AggregationBarSettings);
        addField(field: FieldOptions): AggregationBar;
        addMultipleFields(fields: FieldOptions[]): AggregationBar;
        getValues(): any[];
    }

    export class AutocompleteBar extends Widget {
        discriminator: string;
        constructor(options?: AutocompleteBarSettings);
    }

    export class GroupedSearchBar extends Widget {
        discriminator: string;
        constructor(options?: GroupedSearchBarSettings);
    }

    export class Result extends Widget {
        discriminator: string;
        constructor(options?: ResultSettings);
    }

    export type WidgetOptions =
        | AutocompleteBar
        | GroupedSearchBar
        | Result
        | AggregationBar;

    export class WidgetCollection {
        autocompleteBar: AutocompleteBar[];
        groupedSearchBar: GroupedSearchBar[];
        result: Result[];
        aggregationBar: AggregationBar[];
        add(widget: WidgetOptions): void;
        addMultiple(widgets: WidgetOptions[]): void;
    }

    export class Client extends NeedletailClient {
        widgets: WidgetCollection;
        constructor(readKey: string, baseUrl?: string | null);
        addWidget(widget: WidgetOptions): Client;
        addMultipleWidgets(widgets: WidgetOptions[]): Client;
        init(): void;
    }
}