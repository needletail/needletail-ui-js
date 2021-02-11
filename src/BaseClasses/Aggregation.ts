import {AggregationSettings} from "../Imports/Interfaces";

export class Aggregation {
    /**
     * @type {string} The title of the aggregation, this will be parsed into the html
     */
    title: string;
    /**
     * @type {string} The title used in the class name
     */
    classTitle: string;
    /**
     * @type {string} A custom template for the aggregation, if not set a default will be used
     */
    template?: string = null;
    /**
     * The values that are set for the aggregation
     */
    values: any = {};
    /**
     * The value sent to the search
     */
    value: any = {};
    /**
     * The attribute used to search on
     */
    attribute: string;
    /**
     * Is the item collapsible or not
     */
    collapsible: boolean = false;
    /**
     * Is the item default collapsed
     */
    defaultCollapsed: boolean = false

    constructor(options: AggregationSettings = {}) {
        this.title = options.title || '';
        this.classTitle = this.title.replace(/ /g, '-') || '';
        this.template = options.template || '';
        this.attribute = options.attribute || this.title;
        this.collapsible = options.collapsible || this.collapsible;
        this.defaultCollapsed = options.default_collapsed || this.defaultCollapsed;
    }

    setAttribute(attribute: string): Aggregation {
        this.attribute = attribute;

        if (!this.value.field) {
            this.value = {
                field: this.attribute,
                value: '',
                is_aggregation: true,
                exclude_from_search: true,
            }
        }
        return this;
    }

    getAttribute(): string {
        return this.attribute;
    }

    setCollapsible(collapsible: boolean): Aggregation {
        this.collapsible = collapsible;
        return this;
    }

    getCollapsible(): boolean {
        return this.collapsible;
    }

    setDefaultCollapsed(defaultCollapsed: boolean): Aggregation {
        this.defaultCollapsed = defaultCollapsed;
        return this;
    }

    getDefaultCollapsed(): boolean {
        return this.defaultCollapsed;
    }

    setTitle(title: string): Aggregation {
        this.title = title;
        this.classTitle = title.replace(' ', '-');
        return this;
    }

    getTitle(): string {
        return this.title;
    }

    setTemplate(template: string): Aggregation {
        this.template = template;
        return this;
    }

    getTemplate(): string {
        return this.template;
    }

    /**
     * This function will be used to render the HTML
     * This is done by using Mustache-JS
     */
    render(): string {
        return this.getTemplate();
    }

    /**
     * The after load Javascript, used for event listeners etc.
     */
    executeJS(): void {

    }

    reset() {

    }
}
