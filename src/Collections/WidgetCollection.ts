import {AutocompleteBar, GroupedSearchBar, Result, AggregationBar} from '../Imports/Widgets';
import { WidgetOptions } from '../Imports/Types';
import {Client} from "../Client";

export class WidgetCollection {
    /**
     * @type {AutocompleteBar[]} All the autocomplete bar widgets
     */
    autocompleteBar: AutocompleteBar[] = [];
    /**
     * @type {GroupedSearchBar[]} All the grouped search bar widgets
     */
    groupedSearchBar: GroupedSearchBar[] = [];
    /**
     * @type {Result[]} All the result widgets
     */
    result: Result[] = [];
    /**
     * @type {AggregationBar[]} All the aggregation bar widgets
     */
    aggregationBar: AggregationBar[] = [];
    /**
     * @type {Client} The client used to make API calls
     */
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Add a widget to the correct array
     * @param widget
     */
    add(widget: WidgetOptions): void {
        switch (widget.discriminator) {
            case 'AutocompleteBar':
                this.autocompleteBar.push(widget as AutocompleteBar);
                break;
            case 'GroupedSearchBar':
                this.groupedSearchBar.push(widget as GroupedSearchBar);
                break;
            case 'Result':
                this.result.push(widget as Result);
                break;
            case 'AggregationBar':
                this.aggregationBar.push(widget as AggregationBar);
                break;
            default:
                // If the widget does not have an array throw an error
                console.error(widget);
                throw 'Unsupported widget: ' + widget.discriminator;
        }

        widget.setClient(this.client)
            .build();
    }

    /**
     * Add multiple widgets at the same time
     * @param widgets
     */
    addMultiple(widgets: WidgetOptions[]): void {
        widgets.forEach((widget) => {
            this.add(widget);
        });
    }
}