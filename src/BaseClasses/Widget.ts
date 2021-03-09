// eslint-disable-next-line no-unused-vars
import {WidgetSettings} from '../Imports/Interfaces';
// eslint-disable-next-line no-unused-vars
import {Client} from '../Client';

export class Widget {
    /**
     * @type {string} The element where to render the widget, can be both ID's and Classes
     */
    el: string;
    /**
     * @type {string} A custom template in case the base one doesn't suffice
     */
    template: string;
    /**
     * @type {Client} The client used to make calls towards the API
     */
    client: Client;

    constructor(options: WidgetSettings = {}) {
        this.setEl(options.el || '');
    }

    setEl(el: string): Widget {
        this.el = el;
        return this;
    }

    getEl(): string {
        return this.el;
    }

    getTemplate(): string {
        return this.template;
    }

    setTemplate(template: string): Widget {
        this.template = template;
        return this;
    }

    setClient(client: Client): Widget {
        this.client = client;
        return this;
    }

    /**
     * Render the HTML and transform it into a HTML Node
     * @param {{}} options
     * @return {Node}
     */
    render(options = {}): Node {
        const template = this.getTemplate();
        return document.createRange().createContextualFragment(template);
    }

    executeJS(): void {}

    /**
     * Render and append the widgets into the right position
     * @param {{}} options
     */
    build(options = {}): void {
        const elements = document.querySelectorAll(this.getEl());
        const domHtml = this.render(options);

        elements.forEach((element) => {
            element.innerHTML = '';
            element.appendChild(domHtml.cloneNode(true));
        });

        this.executeJS();
    }
}
