import {Client as NeedletailClient} from 'needletail-js';
import {WidgetCollection} from './Imports/Collections';
import { WidgetOptions } from './Imports/Types';

export class Client extends NeedletailClient {
    widgets: WidgetCollection;

    constructor(readKey: string) {
        super(readKey);

        this.widgets = new WidgetCollection(this);
    }

    /**
     * Add a widget to the client
     * @param widget
     */
    addWidget(widget: WidgetOptions): Client {
        this.widgets.add(widget);
        return this;
    }

    /**
     * Add multiple widgets at the same time
     * @param widgets
     */
    addMultipleWidgets(widgets: WidgetOptions[]): Client {
        this.widgets.addMultiple(widgets);
        return this;
    }
}