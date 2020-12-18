import template from './../../Html/Aggregations/slider.html';
import {Aggregation} from './../../Imports/BaseClasses';
import Mustache from "mustache";
import {Events, URIHelper} from "../../Imports/Helpers";
import {SliderSettings} from "../../Imports/Interfaces";

export class Slider extends Aggregation {
    discriminator: string = 'Range';
    min: number;
    max: number;
    defaultValue: number;

    constructor(options: SliderSettings = {}) {
        super(options);

        this.min = options.min || 0;
        this.max = options.max || 10;
        this.defaultValue = options.default_value || 5;

        this.value = {
            field: this.attribute,
            value: '',
            is_aggregation: true,
            exclude_from_search: true,
        }
    }

    setMin(min: number): Slider {
        this.min = min;
        return this;
    }

    getMin(): number {
        return this.min;
    }

    setMax(max: number): Slider {
        this.max = max;
        return this;
    }

    getMax(): number {
        return this.max;
    }

    setDefaultValue(value: number): Slider {
        this.defaultValue = value;
        return this;
    }

    getDefaultValue(): number {
        return this.defaultValue;
    }

    setRange(min: number, max: number): Slider {
        this.min = min;
        this.max = max;
        return this;
    }

    getTemplate(): string {
        if (this.template) {
            return this.template;
        }

        return template;
    }

    /**
     * Renders the template for the aggregation
     * @param options
     */
    render(): string {
        let template = this.getTemplate();
        return Mustache.render(template, {
            title: this.getTitle(),
            classTitle: this.classTitle,
            name: this.getTitle(),
            min: this.getMin(),
            max: this.getMax(),
            value: this.getDefaultValue(),
            collapsible: (this.getCollapsible()) ? 'needletail-collapsible' : '',
            collapsed: (this.getCollapsible() && this.getDefaultCollapsed()) ? 'needletail-collapsed' : ''
        });
    }

    /**
     * Add listeners, set the default value
     */
    executeJS() {
        let title = this.getTitle();
        let prevVal = URIHelper.getSearchParam(title);

        document.querySelectorAll(`.needletail-aggregation-slider-input.needletail-aggregation-slider-input-${this.classTitle}`).forEach((element: HTMLInputElement) => {
            element.value = prevVal || this.getDefaultValue().toString();
            document.addEventListener("DOMContentLoaded", () => {
                this.handle(element, true);
            });

            element.addEventListener('change', () => {
                this.handle(element);
            });
        });

        document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-slider.needletail-aggregation-slider-${this.classTitle}`).forEach((element) => {
            if (this.getCollapsible()) {
                element.addEventListener('click', (e) => {
                    if (element.classList.contains('needletail-collapsed')) {
                        element.classList.remove('needletail-collapsed');
                    } else {
                        element.classList.add('needletail-collapsed');
                    }
                });
            }
        });
    }

    /**
     * Handles the setting of the URL and putting the correct value in for the search
     * @param element
     * @param skipHistory
     */
    handle(element: any, skipHistory = false) {
        if (!skipHistory) {
            URIHelper.addToHistory(this.getTitle(), element.value);
        }

        this.value = {
            field: this.attribute,
            value: element.value,
            is_aggregation: true
        };

        if (!element.value) {
            this.value = {
                field: this.attribute,
                value: '',
                is_aggregation: true,
                exclude_from_search: true,
            }
        }

        Events.emit(Events.onBeforeResultRequest, {});
    }

    reset() {
        document.querySelectorAll(`.needletail-aggregation-slider-input.needletail-aggregation-slider-input-${this.classTitle}`).forEach((element: HTMLInputElement) => {
            element.value = this.getDefaultValue().toString();
            this.handle(element);
        });
    }
}
