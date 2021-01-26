import {Client as NeedletailClient} from '@needletail/js';

declare module '@needletail/ui';
declare namespace NeedletailUi {

    export class Aggregation {
        field: string;
        title: string;
        template?: string;
        setField(field: string): Aggregation;
        getField(): string;
        setTitle(title: string): Aggregation;
        getTitle(): string;
        setTemplate(template: string): Aggregation;
    }

    export class Boolean extends Aggregation {
        getTemplate(): string;
    }

    export class Checkbox extends Aggregation {
        getTemplate(): string;
    }

    export class Radio extends Aggregation {
        getTemplate(): string;
    }

    export class Range extends Aggregation {
        min: number;
        max: number;
        setMin(min: number): Range;
        getMin(): number;
        setMax(max: number): Range;
        getMax(): number;
        setRange(min: number, max: number): Range;
        getTemplate(): string;
    }

    type FieldOptions = 
        | Boolean
        | Checkbox
        | Radio
        | Range;

    export interface ClientHooks {
        beforeGroupedSearch: () => any;
        afterGroupedSearch: () => any;
        updateResult: () => any;
        beforeSearch: () => any;
        beforeUpdateResult: () => any;
    }

    export class Widget {
        el: string;
        template: string;
    }

    export class AggregationBar extends Widget {
        fields: FieldOptions[]
        addField(field: FieldOptions): AggregationBar;
        addMultipleFields(field: FieldOptions[]): AggregationBar;
    }

    export class AutocompleteBar extends Widget {
        
    }

    export class GroupedSearchBar extends Widget {
        
    }

    export class Result extends Widget {
        
    }
    type WidgetOptions =
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
        hooks: ClientHooks;
        widgets: WidgetCollection;
        events: {};
        bulkSearch(): void;
        onBeforeGroupedSearch(callback: () => any): Client;
        onAfterGroupedSearch(callback: () => any): Client;
        onUpdateResult(callback: () => any): Client;
        onBeforeSearch(callback: () => any): Client;
        onBeforeUpdateResult(callback: () => any): Client;
    }
}