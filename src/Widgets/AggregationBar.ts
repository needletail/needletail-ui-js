import {Widget} from './../Imports/BaseClasses';
// eslint-disable-next-line no-unused-vars
import {FieldOptions} from './../Imports/Types';
// eslint-disable-next-line no-unused-vars
import {AggregationBarSettings} from './../Imports/Interfaces';
import template from './../Html/aggregation_bar.html';
import clearFiltersTemplate from './../Html/clear_filters.html';
import Mustache from 'mustache';
import {Events, optional, URIHelper} from '../Imports/Helpers';

export class AggregationBar extends Widget {
    discriminator: string = 'AggregationBar';
    private fields: FieldOptions[];
    useClearFilters: boolean = false;
    clearFiltersTop: boolean = false;
    clearFiltersBottom: boolean = false;
    clearFiltersText: string = 'Clear filters';
    clearFiltersTemplate: string;
    clearFiltersHideOnNoneActive: boolean = true;
    useSkeleton: boolean = false;
    aggregationSkeletonTemplate: string;

    private aggregationActives: { [key: string]: boolean } = {};

    constructor(options: AggregationBarSettings = {}) {
        super(options);

        this.fields = [];
        this.setUseClearFilters(optional(options.clear_filters).use || this.getUseClearFilters());
        this.setClearFiltersTop(optional(options.clear_filters).top || this.getClearFiltersTop());
        this.setClearFiltersBottom(optional(options.clear_filters).bottom || this.getClearFiltersBottom());
        this.setClearFiltersText(optional(options.clear_filters).text || this.getClearFiltersText());
        this.setClearFiltersHideOnNoneActive(optional(options.clear_filters).hide_on_none_active ||
            this.getClearFiltersHideOnNoneActive());
        this.setUseSkeleton((typeof optional(options).use_skeleton !== 'undefined') ?
            optional(options).use_skeleton : this.getUseSkeleton());
    }

    getUseSkeleton(): boolean {
        return this.useSkeleton;
    }

    setUseSkeleton(useSkeleton: boolean): AggregationBar {
        this.useSkeleton = useSkeleton;
        return this;
    }

    setUseClearFilters(useClearFilters: boolean): AggregationBar {
        this.useClearFilters = useClearFilters;
        return this;
    }

    getUseClearFilters(): boolean {
        return this.useClearFilters;
    }

    setClearFiltersTop(clearFiltersTop: boolean): AggregationBar {
        this.clearFiltersTop = clearFiltersTop;
        return this;
    }

    getClearFiltersTop(): boolean {
        return this.clearFiltersTop;
    }

    setClearFiltersBottom(clearFiltersBottom: boolean): AggregationBar {
        this.clearFiltersBottom = clearFiltersBottom;
        return this;
    }

    getClearFiltersBottom(): boolean {
        return this.clearFiltersBottom;
    }

    setClearFiltersText(clearFiltersText: string): AggregationBar {
        this.clearFiltersText = clearFiltersText;
        return this;
    }

    getClearFiltersText(): string {
        return this.clearFiltersText;
    }

    setClearFiltersHideOnNoneActive(hideOnNoneActive: boolean): AggregationBar {
        this.clearFiltersHideOnNoneActive = hideOnNoneActive;
        return this;
    }

    getClearFiltersHideOnNoneActive(): boolean {
        return this.clearFiltersHideOnNoneActive;
    }

    addField(field: FieldOptions): AggregationBar {
        field.parent = this;
        this.fields.push(field);
        return this;
    }

    addMultipleFields(fields: FieldOptions[]): AggregationBar {
        fields.forEach((field: FieldOptions) => {
            field.parent = this;

            this.fields.push(field);
        });
        return this;
    }

    getTemplate(): string {
        if (this.template) {
            return this.template;
        }

        return template;
    }

    setDiscriminator(discriminator: string): AggregationBar {
        this.discriminator = discriminator;
        return this;
    }

    getDiscriminator(): string {
        return this.discriminator;
    }

    render(): Node {
        const template = this.getTemplate();
        const fields: string[] = [];

        this.fields.forEach((field: FieldOptions) => {
            let renderedField: string = '';
            if (field.getUseSkeleton()) {
                renderedField = field.renderSkeleton();
            } else {
                renderedField = field.render();
            }

            fields.push(renderedField);
        });

        const rendered = Mustache.render(template, {
            fields: fields,
            clear_filters: this.renderClearFilters(),
            show_clear_filters_top: this.getClearFiltersTop(),
            show_clear_filters_bottom: this.getClearFiltersBottom(),
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
        const template = this.getClearFiltersTemplate();

        return Mustache.render(template, {
            text: this.getClearFiltersText(),
            hidden: (this.getClearFiltersHideOnNoneActive()) ? 'needletail-hidden' : '',
        });
    }

    /**
     * Execute the JS for all the added fields
     */
    executeJS() {
        const elements = document.getElementsByClassName('needletail-clear-filters');
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', () => {
                this.fields.forEach((field: FieldOptions) => {
                    field.reset();
                });
            });
        }

        document.addEventListener(Events.initNeedletail, () => {
            this.fields.forEach((field: FieldOptions) => {
                // Dirty second fix, but works
                setTimeout(() => {
                    field.setDefaultCollapsed(false);
                }, 1000);
            });

            Events.emit(Events.onAggregationValueChange, {
                initial: true,
            });
        });

        document.addEventListener(Events.onAggregationValueChange, (e: CustomEvent) => {
            this.aggregationActives[e.detail.name] = e.detail.hasActive;

            const clearFilters: HTMLCollection = document.getElementsByClassName('needletail-clear-filters');
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
            name: this.getDiscriminator(),
        });
    }

    getValues() {
        return this.fields.reduce((res, field) => {
            if (Object.keys(field.value).length > 0) {
                res.push(field.value);
            }
            return res;
        }, []);
    }
}
