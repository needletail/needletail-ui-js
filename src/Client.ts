import {Client as NeedletailClient} from '@needletail/js';
import {WidgetCollection} from './Imports/Collections';
// eslint-disable-next-line no-unused-vars
import {WidgetOptions} from './Imports/Types';

export class Client extends NeedletailClient {
    widgets: WidgetCollection;

    constructor(readKey: string) {
        super(readKey);

        this.widgets = new WidgetCollection(this);
    }

    /**
     * Add a widget to the client
     * @param {WidgetOptions} widget
     * @return {Client}
     */
    addWidget(widget: WidgetOptions): Client {
        this.widgets.add(widget);
        return this;
    }

    /**
     * Add multiple widgets at the same time
     * @param {WidgetOptions[]} widgets
     * @return {Client}
     */
    addMultipleWidgets(widgets: WidgetOptions[]): Client {
        this.widgets.addMultiple(widgets);
        return this;
    }
}
