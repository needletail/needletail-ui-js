import { Widget } from './../Imports/BaseClasses';
import { FieldOptions } from './../Imports/Types';
import {AggregationBarSettings} from './../Imports/Interfaces';
import template from './../Html/aggregation_bar.html';
import clearFiltersTemplate from './../Html/clear_filters.html';
import Mustache from 'mustache';
import {Events, optional, URIHelper} from "../Imports/Helpers";
import {Slider} from "./Aggregations/Slider";

export class AggregationBar extends Widget {
    discriminator: string = 'AggregationBar';
    private fields: FieldOptions[]
    useClearFilters: boolean = false;
    clearFiltersTop: boolean = false;
    clearFiltersBottom: boolean = false;
    clearFiltersText: string = 'Clear filters';
    clearFiltersTemplate: string;
    clearFiltersHideOnNoneActive: boolean = true;
    private aggregationActives: { [key: string]: boolean } = {};

    constructor(options: AggregationBarSettings = {}) {
        super(options);

        this.fields = [];
        this.useClearFilters = optional(options.clear_filters).use || this.useClearFilters;
        this.clearFiltersTop = optional(options.clear_filters).top || this.clearFiltersTop;
        this.clearFiltersBottom = optional(options.clear_filters).bottom || this.clearFiltersBottom;
        this.clearFiltersText = optional(options.clear_filters).text || this.clearFiltersText;
        this.clearFiltersHideOnNoneActive = optional(options.clear_filters).hide_on_none_active || this.clearFiltersHideOnNoneActive;
    }

    setUseClearFilters(useClearFilters: boolean): AggregationBar {
        this.useClearFilters = useClearFilters;
        return this;
    }

    setClearFiltersTop(clearFiltersTop: boolean): AggregationBar {
        this.clearFiltersTop = clearFiltersTop;
        return this;
    }

    setClearFiltersBottom(clearFiltersBottom: boolean): AggregationBar {
        this.clearFiltersBottom = clearFiltersBottom;
        return this;
    }

    setClearFiltersText(clearFiltersText: string): AggregationBar {
        this.clearFiltersText = clearFiltersText;
        return this;
    }

    setClearFiltersHideOnNoneActive(hideOnNoneActive: boolean): AggregationBar {
        this.clearFiltersHideOnNoneActive = hideOnNoneActive;
        return this;
    }

    addField(field: FieldOptions): AggregationBar {
        this.fields.push(field);
        return this;
    }

    addMultipleFields(fields: FieldOptions[]): AggregationBar {
        fields.forEach((field: FieldOptions) => {
            this.fields.push(field);
        })
        return this;
    }

    getTemplate(): string {
        if (this.template) {
            return this.template;
        }

        return template;
    }

    /**
     * Render the template for the aggregation bar
     * This includes rendering all the fields that are added to the bar
     */
    render(): Node {
        let template = this.getTemplate();
        let fields: string[] = [];

        this.fields.forEach((field: FieldOptions) => {
            let renderedField = field.render();
            fields.push(renderedField);
        });

        let rendered = Mustache.render(template, {
            fields: fields,
            clearFilters: this.renderClearFilters(),
            showClearFiltersTop: this.clearFiltersTop,
            showClearFiltersBottom: this.clearFiltersBottom,
        });

        return document.createRange().createContextualFragment(rendered);
    }

    setClearFiltersTemplate(template: string): AggregationBar {
        this.clearFiltersTemplate = template;
        return this;
    }

    getClearFiltersTemplate(): string {
        if (this.clearFiltersTemplate) {
            return this.clearFiltersTemplate;
        }

        return clearFiltersTemplate;
    }

    renderClearFilters() {
        let template = this.getClearFiltersTemplate();

        return Mustache.render(template, {
            text: this.clearFiltersText,
            hidden: (this.clearFiltersHideOnNoneActive) ? 'needletail-hidden' : ''
        });
    }

    /**
     * Execute the JS for all the added fields
     */
    executeJS() {
        let elements = document.getElementsByClassName('needletail-clear-filters');
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', () => {
                this.fields.forEach((field: FieldOptions) => {
                    field.reset();
                });
            });
        }

        document.addEventListener("DOMContentLoaded", () => {
            this.fields.forEach((field: FieldOptions) => {
                // Dirty second fix, but works
                setTimeout(() => {
                    field.setDefaultCollapsed(false);
                }, 1000);
            });

            Events.emit(Events.onAggregationValueChange, {});
        });

        document.addEventListener(Events.onAggregationValueChange, (e: CustomEvent) => {
            this.aggregationActives[e.detail.name] = e.detail.hasActive;

            console.log(123);
            let clearFilters: HTMLCollection = document.getElementsByClassName('needletail-clear-filters');
            let hasShown = false;

            this.fields.forEach((field: FieldOptions) => {
                let title = field.getTitle();

                if (field.discriminator === 'Range') {
                    title = field.getTitle() + '[min]';
                }

                if (!hasShown && URIHelper.getSearchParam(title)) {
                    for (let i = 0; i < clearFilters.length; i++) {
                        clearFilters[i].classList.remove('needletail-hidden');
                    }
                    hasShown = true;
                }
            });

            if (!hasShown) {
                for (let i = 0; i < clearFilters.length; i++) {
                    clearFilters[i].classList.add('needletail-hidden');
                }
            }
        });

        this.fields.forEach((field: FieldOptions) => {
            field.executeJS();
        });

        Events.emit(Events.aggregationFinished, {
            name: this.discriminator,
        });
    }

    /**
     * Fetch all the values of the fields
     */
    getValues() {
        return this.fields.reduce((res, field) => {
            if (Object.keys(field.value).length > 0) {
                res.push(field.value);
            }
            return res;
        }, []);
    }
}
