import template from './../../Html/Aggregations/radio.html';
import {Aggregation} from './../../Imports/BaseClasses';
import skeletonTemplate from './../../Html/Skeletons/radio.html';
import Mustache from 'mustache';
// eslint-disable-next-line no-unused-vars
import {RadioSettings} from '../../Imports/Interfaces';
import {Events, optional, URIHelper} from '../../Imports/Helpers';
import {applyFilterOptions, applyOptionOrder} from '../../Helpers/AggregationOptionUtils';
import _debounce from 'lodash/debounce';

export class Radio extends Aggregation {
    discriminator: string = 'Radio';
    hideOnEmpty: boolean = true;
    useShowMoreOptions: boolean = true;
    showMoreOptionsText: string = 'Show more options';
    showLessOptionsText: string = 'Show less options';
    showMoreOptionsLoad: number = 10;
    optionOrder: string[] = [];
    filterOptions: string[] = [];
    skeletonItemCount: number = 10;
    useSearch: boolean = false;
    searchPlaceholder: string = 'Search...';
    searchDebounce: number = 150;
    searchMinOptions: number = 15;

    constructor(options: RadioSettings = {}) {
        super(options);

        this.setHideOnEmpty(options.hide_on_empty || this.getHideOnEmpty());
        this.setUseShowMoreOptions((typeof optional(options.show_more_options).use !== 'undefined') ?
            options.show_more_options.use : this.getUseShowMoreOptions());
        this.setShowMoreOptionsText(optional(options.show_more_options).text ?
            options.show_more_options.text : this.getShowMoreOptionsText());
        this.setShowLessOptionsText(optional(options.show_more_options).less_text ?
            options.show_more_options.less_text : this.getShowLessOptionsText());
        this.setShowMoreOptionsLoad(optional(options.show_more_options).load ?
            options.show_more_options.load : this.getShowMoreOptionsLoad());
        this.setSkeletonItemCount(options.skeleton_item_count || this.getSkeletonItemCount());
        this.setOptionOrder(options.option_order || this.getOptionOrder());
        this.setFilterOptions(options.filter_options || this.getFilterOptions());

        this.setUseSearch((typeof optional(options.search).use !== 'undefined') ?
            optional(options.search).use : this.getUseSearch());
        this.setSearchPlaceholder(optional(options.search).placeholder || this.getSearchPlaceholder());
        this.setSearchDebounce(optional(options.search).debounce || this.getSearchDebounce());
        this.setSearchMinOptions(optional(options.search).min_options || this.getSearchMinOptions());

        this.value = {
            field: this.getAttribute(),
            value: '',
            is_aggregation: true,
            exclude_from_search: true,
        };
    }

    setSkeletonItemCount(skeletonItemCount: number): Radio {
        this.skeletonItemCount = skeletonItemCount;
        return this;
    }

    getSkeletonItemCount(): number {
        return this.skeletonItemCount;
    }

    setUseSearch(useSearch: boolean): Radio {
        this.useSearch = useSearch;
        return this;
    }

    getUseSearch(): boolean {
        return this.useSearch;
    }

    setSearchPlaceholder(searchPlaceholder: string): Radio {
        this.searchPlaceholder = searchPlaceholder;
        return this;
    }

    getSearchPlaceholder(): string {
        return this.searchPlaceholder;
    }

    setSearchDebounce(searchDebounce: number): Radio {
        this.searchDebounce = searchDebounce;
        return this;
    }

    getSearchDebounce(): number {
        return this.searchDebounce;
    }

    setSearchMinOptions(searchMinOptions: number): Radio {
        this.searchMinOptions = searchMinOptions;
        return this;
    }

    getSearchMinOptions(): number {
        return this.searchMinOptions;
    }

    setOptionOrder(optionOrder: string[]): Radio {
        this.optionOrder = optionOrder.map((o: string) => {
            return o.toLowerCase();
        });
        return this;
    }

    getOptionOrder(): string[] {
        return this.optionOrder;
    }

    setFilterOptions(filterOptions: string[]): Radio {
        this.filterOptions = filterOptions.map((o: string) => {
            return o.toLowerCase();
        });
        return this;
    }

    getFilterOptions(): string[] {
        return this.filterOptions;
    }

    setUseShowMoreOptions(useShowMoreOptions: boolean): Radio {
        this.useShowMoreOptions = useShowMoreOptions;
        return this;
    }

    getUseShowMoreOptions(): boolean {
        return this.useShowMoreOptions;
    }

    setShowMoreOptionsText(showMoreOptionsText: string): Radio {
        this.showMoreOptionsText = showMoreOptionsText;
        return this;
    }

    getShowMoreOptionsText(): string {
        return this.showMoreOptionsText;
    }

    setShowLessOptionsText(showLessOptionsText: string): Radio {
        this.showLessOptionsText = showLessOptionsText;
        return this;
    }

    getShowLessOptionsText(): string {
        return this.showLessOptionsText;
    }

    setShowMoreOptionsLoad(showMoreOptionsLoad: number): Radio {
        this.showMoreOptionsLoad = showMoreOptionsLoad;
        return this;
    }

    getShowMoreOptionsLoad(): number {
        return this.showMoreOptionsLoad;
    }

    getTemplate(): string {
        if (this.template) {
            return this.template;
        }

        return template;
    }

    setHideOnEmpty(hideOnEmpty: boolean): Radio {
        this.hideOnEmpty = hideOnEmpty;
        return this;
    }

    getHideOnEmpty(): boolean {
        return this.hideOnEmpty;
    }

    getSkeletonTemplate(): string {
        if (this.skeletonTemplate) {
            return this.skeletonTemplate;
        }

        return skeletonTemplate;
    }

    renderSkeleton(): string {
        const rendered = Mustache.render(this.getSkeletonTemplate(), {
            class_title: this.getClassTitle(),
            options: new Array(this.getSkeletonItemCount()).fill(null),
        });

        return rendered;
    }

    render(options: {}[] = []): string {
        const template = this.getTemplate();
        options = applyOptionOrder(options, this.getOptionOrder());
        options = applyFilterOptions(options, this.getFilterOptions());

        const useSearch = (this.getUseSearch() && options.length >= this.getSearchMinOptions());

        return Mustache.render(template, {
            title: this.getTitle(),
            class_title: this.getClassTitle(),
            name: this.getClassTitle(),
            options: options,
            collapsible: (this.getCollapsible()) ? 'needletail-collapsible' : '',
            collapsed: (this.getCollapsible() && this.getDefaultCollapsed()) ? 'needletail-collapsed' : '',
            show_more_options: this.getUseShowMoreOptions(),
            show_more_options_text: this.getShowMoreOptionsText(),
            show_less_options_text: this.getShowLessOptionsText(),
            use_search: useSearch,
            search_placeholder: this.getSearchPlaceholder(),
        });
    }

    /**
     * Add listeners, set the default value
     */
    executeJS() {
        const title = this.getTitle();
        const prevVal = URIHelper.getSearchParam(title);

        document.addEventListener(Events.onAggsUpdate, (e: CustomEvent) => {
            if (e.detail[this.getAttribute()]) {
                const options: {}[] = [];
                e.detail[this.getAttribute()].forEach((val: any) => {
                    options.push({
                        name: this.getClassTitle(),
                        ...val,
                    });
                });

                // Re-render the options
                const textElement = this.render(options);
                const node = document.createRange().createContextualFragment(textElement);
                let wasCollapsed = false;
                let wasShownMoreOptions = false;

                // eslint-disable-next-line max-len
                document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-radio.needletail-aggregation-radio-${this.getClassTitle()}`)
                    .forEach((element) => {
                        wasCollapsed = element.classList.contains('needletail-collapsed');
                        const showMoreOptionsElement = element.querySelector('.needletail-show-more-options');
                        const showLessOptionsElement = element.querySelector('.needletail-show-less-options');
                        if (this.getUseShowMoreOptions()) {
                            wasShownMoreOptions = !showMoreOptionsElement.classList.contains('needletail-hidden');
                            const bothHidden = (showMoreOptionsElement.classList.contains('needletail-hidden') &&
                                showLessOptionsElement.classList.contains('needletail-hidden'));

                            if (bothHidden) {
                                wasShownMoreOptions = true;
                            }
                        }
                        element.replaceWith(node.cloneNode(true));
                    });

                // eslint-disable-next-line max-len
                document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-radio.needletail-aggregation-radio-${this.getClassTitle()}`)
                    .forEach((element) => {
                        if (this.getCollapsible()) {
                            element.querySelector('.needletail-aggregation-radio-title')
                                .addEventListener('click', (e) => {
                                    if (element.classList.contains('needletail-collapsed')) {
                                        element.classList.remove('needletail-collapsed');
                                    } else {
                                        element.classList.add('needletail-collapsed');
                                    }
                                });

                            if (wasCollapsed) {
                                element.classList.add('needletail-collapsed');
                            }
                        }

                        element.setAttribute('data-option-count', options.length.toString());

                        if (this.getHideOnEmpty()) {
                            if (options.length === 0) {
                                element.classList.add('needletail-empty');
                            } else {
                                element.classList.remove('needletail-empty');
                            }
                        }

                        if (this.getUseShowMoreOptions()) {
                            const showMoreOptions: HTMLElement = element.querySelector('.needletail-show-more-options');
                            const showLessOptions: HTMLElement = element.querySelector('.needletail-show-less-options');
                            const radioOptions = element.querySelectorAll('.needletail-aggregation-radio-option');

                            if (radioOptions.length <= this.getShowMoreOptionsLoad()) {
                                showMoreOptions.classList.add('needletail-hidden');
                            }

                            const max = (this.getShowMoreOptionsLoad() > radioOptions.length) ?
                                radioOptions.length : this.getShowMoreOptionsLoad();
                            for (let i = 0; i < max; i++) {
                                radioOptions.item(i).classList.remove('needletail-hidden');
                            }

                            showMoreOptions.addEventListener('click', (e) => {
                                showMoreOptions.classList.add('needletail-hidden');
                                showLessOptions.classList.remove('needletail-hidden');

                                for (let i = this.getShowMoreOptionsLoad(); i < radioOptions.length; i++) {
                                    radioOptions.item(i).classList.remove('needletail-hidden');
                                }
                            });

                            showLessOptions.addEventListener('click', (e) => {
                                showLessOptions.classList.add('needletail-hidden');
                                showMoreOptions.classList.remove('needletail-hidden');

                                for (let i = this.getShowMoreOptionsLoad(); i < radioOptions.length; i++) {
                                    radioOptions.item(i).classList.add('needletail-hidden');
                                }
                            });

                            if (!wasShownMoreOptions &&
                                radioOptions.length > this.getShowMoreOptionsLoad()) {
                                showMoreOptions.click();
                            }
                        }
                    });

                // eslint-disable-next-line max-len
                document.querySelectorAll(`.needletail-aggregation-radio-option-input.needletail-aggregation-radio-option-input-${this.getClassTitle()}`)
                    .forEach((element: HTMLInputElement) => {
                        element.addEventListener('change', () => {
                            this.handle(element);
                        });
                    });

                this.initializeSearch();

                // eslint-disable-next-line max-len
                document.querySelectorAll(`.needletail-aggregation-radio-option-input.needletail-aggregation-radio-option-input-${this.getClassTitle()}`)
                    .forEach((element: HTMLInputElement) => {
                    // If the value is in the parameters check it
                        element.checked = (URIHelper.getSearchParam(title) === element.value);
                        element.addEventListener('change', () => {
                            this.handle(element);
                        });
                    });
            }
        });

        this.value = {
            field: this.getAttribute(),
            value: prevVal,
            is_aggregation: true,
        };
    }

    handle(element: any, skipHistory = false, removeFromHistory = false) {
        if (!skipHistory) {
            URIHelper.addToHistory(this.getTitle(), element.value, removeFromHistory);
        }

        if (removeFromHistory) {
            element.value = '';
        }

        this.value = {
            field: this.getAttribute(),
            value: element.value,
            is_aggregation: true,
        };

        this.hasActiveAggregation = true;
        if (!element.value) {
            this.value = {
                field: this.getAttribute(),
                value: '',
                is_aggregation: true,
                exclude_from_search: true,
            };

            this.hasActiveAggregation = false;
        }

        Events.emit(Events.onBeforeResultRequest, {});
        Events.emit(Events.onAggregationValueChange, {
            'initial': false,
            'name': this.getAttribute(),
            'hasActive': this.hasActiveAggregation,
            'value': this.value.value,
            'lastValue': element.value,
        });
    }

    reset() {
        // eslint-disable-next-line max-len
        document.querySelectorAll(`.needletail-aggregation-radio-option-input.needletail-aggregation-radio-option-input-${this.getClassTitle()}`)
            .forEach((element: HTMLInputElement) => {
                if (element.checked) {
                    element.checked = false;
                    this.handle(element, false, true);
                }
            });
    }

    initializeSearch() {
        const classTitle = this.getClassTitle();
        const rootSelector = '.needletail-aggregation.needletail-aggregation-radio' +
            `.needletail-aggregation-radio-${classTitle}`;
        const inputSelector = `.needletail-aggregation-options-search-input-${classTitle}`;

        document.querySelectorAll(rootSelector).forEach((root) => {
            const searchInput = root.querySelector(inputSelector) as HTMLInputElement;
            if (!searchInput) {
                return;
            }

            const showMoreOptionsElement = root.querySelector('.needletail-show-more-options') as HTMLElement;
            const showLessOptionsElement = root.querySelector('.needletail-show-less-options') as HTMLElement;
            const optionElements: NodeListOf<HTMLElement> =
                root.querySelectorAll('.needletail-aggregation-radio-option');

            let expandedBeforeSearch = false;

            const applySearch = () => {
                const q = (searchInput.value || '').trim().toLowerCase();

                if (q) {
                    if (showLessOptionsElement) {
                        expandedBeforeSearch = !showLessOptionsElement.classList.contains('needletail-hidden');
                    }

                    if (showMoreOptionsElement) {
                        showMoreOptionsElement.classList.add('needletail-hidden');
                    }
                    if (showLessOptionsElement) {
                        showLessOptionsElement.classList.add('needletail-hidden');
                    }

                    optionElements.forEach((opt) => {
                        opt.classList.remove('needletail-hidden');
                        const label = opt.querySelector('.needletail-aggregation-radio-option-label') as HTMLElement;
                        const text = (label ? label.textContent : '').toLowerCase();

                        if (text.indexOf(q) > -1) {
                            opt.classList.remove('needletail-search-hidden');
                        } else {
                            opt.classList.add('needletail-search-hidden');
                        }
                    });

                    return;
                }

                optionElements.forEach((opt) => {
                    opt.classList.remove('needletail-search-hidden');
                });

                if (!this.getUseShowMoreOptions()) {
                    return;
                }

                if (expandedBeforeSearch && showMoreOptionsElement) {
                    showMoreOptionsElement.click();
                } else if (showLessOptionsElement) {
                    showLessOptionsElement.click();
                }
            };

            const handler = _debounce(applySearch, this.getSearchDebounce());
            searchInput.addEventListener('input', handler);
        });
    }
}
