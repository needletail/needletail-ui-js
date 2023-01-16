import {Widget} from './../Imports/BaseClasses';
import template from './../Html/grouped_search_bar.html';
import resultTemplate from './../Html/grouped_search_bar_results.html';
import defaultResultTemplate from './../Html/grouped_search_bar_results_default.html';
import Mustache from 'mustache';
import _debounce from 'lodash/debounce';
import {Events, optional, URIHelper} from '../Imports/Helpers';
// eslint-disable-next-line no-unused-vars
import {GroupedSearchBarSettings} from '../Imports/Interfaces';

export class GroupedSearchBar extends Widget {
    /**
     * The template used for the result dropdown
     */
    resultTemplate: string;
    innerResultTemplate: string;
    /**
     * The discriminator used for sorting the widget
     */
    discriminator: string = 'GroupedSearchBar';
    /**
     * Use debounce or not
     */
    debounce: boolean = true;
    /**
     * The time to wait for the debounce
     */
    debounceWait: number = 200;
    /**
     * The time to wait for the URL debounce
     */
    debounceUrlWait: number = 2000;
    /**
     * The name used in the URL for the field
     */
    query: string = 'groupedSearchBar';
    /**
     * Save the value in the url
     */
    inUrl: boolean = true;
    /**
     * Which buckets to search on
     */
    buckets: string[] = [];
    /**
     * Which attribute to search on
     */
    attribute: string|string[];
    /**
     * The placeholder of the input field
     */
    placeholder: string = 'Start typing to search';
    /**
     * The message to show if there are no results
     */
    noResultMessage: string = 'No results where found';
    /**
     * The result that has the active class on it
     */
    selectedResult: number = -1;
    /**
     * The value to send to the search
     */
    value: {} = {};
    /**
     * The amount of results to show
     */
    size: number = 3;
    /**
     * The minimum amount of characters before executing.
     */
    minimumCharacters: number = 3;
    groupBy: string = '';
    sortBy: string = '';
    sortDirection: string = 'asc';
    /**
     * Show the results below the search bar
     */
    showResults: boolean = true;
    searchOnContentLoaded: boolean = true;
    initialInput: boolean = true;
    fillInputOnClick: boolean = false;
    sortMode: string = 'min';
    allowedDirections: string[] = ['asc', 'desc'];

    constructor(options: GroupedSearchBarSettings = {}) {
        super(options);

        this.setUseDebounce((typeof optional(options.debounce).use !== 'undefined') ?
            options.debounce.use : this.getUseDebounce());
        this.setDebounceWait(optional(options.debounce).wait || this.getDebounceWait());
        this.setDebounceUrlWait(optional(options.debounce).url_wait || this.getDebounceUrlWait());
        this.setInUrl((typeof options.in_url !== 'undefined') ?
            options.in_url : this.getInUrl());
        this.setQuery(options.query || this.getQuery());
        this.setAttribute(optional(options.search).attribute || '');
        this.setAttributes(optional(options.search).attributes || '');
        this.setBuckets(optional(options.search).buckets || []);
        this.setPlaceholder(options.placeholder || this.getPlaceholder());
        this.setNoResultMessage(options.no_result_message || this.getNoResultMessage());
        this.setSize(optional(options.search).size || this.getSize());
        this.setGroupBy(optional(options.search).group_by || '');
        this.setSortBy(optional(options.search).sort_by || '');
        this.setSortDirection(optional(options.search).sort_direction || this.getSortDirection());
        this.setSortMode(optional(options.search).sort_mode || this.getSortMode());
        this.setMinimumCharacters((typeof options.minimum_characters !== 'undefined') ?
            options.minimum_characters : this.getMinimumCharacters());
        this.setShowResults((typeof options.show_results !== 'undefined') ?
            options.show_results : this.getShowResults());
        this.setSearchOnContentLoaded((typeof options.search_on_content_loaded !== 'undefined') ?
            options.search_on_content_loaded : this.getSearchOnContentLoaded());
        this.setInitialInput((typeof options.initial_input !== 'undefined') ?
            options.initial_input : this.getInitialInput());
        this.setFillInputOnClick((typeof options.fill_input_on_click !== 'undefined') ?
            options.fill_input_on_click : this.getFillInputOnClick());
    }

    setMinimumCharacters(minimumCharacters: number): GroupedSearchBar {
        this.minimumCharacters = minimumCharacters;
        return this;
    }

    getMinimumCharacters(): number {
        return this.minimumCharacters;
    }

    setSize(size: number): GroupedSearchBar {
        this.size = size;
        return this;
    }

    getSize(): number {
        return this.size;
    }

    setPlaceholder(placeholder: string): GroupedSearchBar {
        this.placeholder = placeholder;
        return this;
    }

    getPlaceholder(): string {
        return this.placeholder;
    }

    setNoResultMessage(noResultMessage: string): GroupedSearchBar {
        this.noResultMessage = noResultMessage;
        return this;
    }

    getNoResultMessage(): string {
        return this.noResultMessage;
    }

    setAttribute(attribute: string|string[]): GroupedSearchBar {
        this.attribute = attribute;
        return this;
    }

    getAttribute(): string|string[] {
        return this.attribute;
    }

    setAttributes(attribute: string|string[]): GroupedSearchBar {
        if (this.attribute === '') {
            this.attribute = attribute;
        }
        return this;
    }

    getAttributes(): string|string[] {
        return this.attribute;
    }

    setBuckets(buckets: string[]): GroupedSearchBar {
        this.buckets = buckets;
        return this;
    }

    getBuckets(): string[] {
        return this.buckets;
    }

    setUseDebounce(use: boolean = true): GroupedSearchBar {
        this.debounce = use;
        return this;
    }

    getUseDebounce(): boolean {
        return this.debounce;
    }

    setDebounceWait(wait: number): GroupedSearchBar {
        this.debounceWait = wait;
        return this;
    }

    getDebounceWait(): number {
        return this.debounceWait;
    }

    setDebounceUrlWait(wait: number): GroupedSearchBar {
        this.debounceUrlWait = wait;
        return this;
    }

    getDebounceUrlWait(): number {
        return this.debounceUrlWait;
    }

    getTemplate(): string {
        if (this.template) {
            return this.template;
        }

        return template;
    }

    setResultTemplate(template: string): GroupedSearchBar {
        this.resultTemplate = template;
        return this;
    }

    getResultTemplate(): string {
        if (this.resultTemplate) {
            return this.resultTemplate;
        }

        return resultTemplate;
    }

    setInnerResultTemplate(template: string): GroupedSearchBar {
        this.innerResultTemplate = template;
        return this;
    }

    getInnerResultTemplate(): string {
        if (this.innerResultTemplate) {
            return this.innerResultTemplate;
        }

        return defaultResultTemplate;
    }


    setInUrl(inUrl: boolean): GroupedSearchBar {
        this.inUrl = inUrl;
        return this;
    }

    getInUrl(): boolean {
        return this.inUrl;
    }

    setShowResults(showResults: boolean): GroupedSearchBar {
        this.showResults = showResults;
        return this;
    }

    getShowResults(): boolean {
        return this.showResults;
    }

    setDiscriminator(discriminator: string): GroupedSearchBar {
        this.discriminator = discriminator;
        return this;
    }

    getDiscriminator(): string {
        return this.discriminator;
    }

    setSearchOnContentLoaded(search: boolean): GroupedSearchBar {
        this.searchOnContentLoaded = search;
        return this;
    }

    getSearchOnContentLoaded(): boolean {
        return this.searchOnContentLoaded;
    }

    setInitialInput(initialInput: boolean): GroupedSearchBar {
        this.initialInput = initialInput;
        return this;
    }

    getInitialInput(): boolean {
        return this.initialInput;
    }

    setGroupBy(groupBy: string): GroupedSearchBar {
        this.groupBy = groupBy;
        return this;
    }

    getGroupBy(): string {
        return this.groupBy;
    }

    setSortBy(sortBy: string): GroupedSearchBar {
        this.sortBy = sortBy;
        return this;
    }

    getSortBy(): string {
        return this.sortBy;
    }

    setSortMode(sortMode: string): GroupedSearchBar {
        this.sortMode = sortMode;
        return this;
    }

    getSortMode(): string {
        return this.sortMode;
    }

    setSortDirection(sortDirection: string): GroupedSearchBar {
        if (this.allowedDirections.indexOf(sortDirection) === -1) {
            sortDirection = 'asc';
        }

        this.sortDirection = sortDirection;
        return this;
    }

    getSortDirection(): string {
        return this.sortDirection;
    }

    setFillInputOnClick(fillInputOnClick: boolean): GroupedSearchBar {
        this.fillInputOnClick = fillInputOnClick;
        return this;
    }

    getFillInputOnClick(): boolean {
        return this.fillInputOnClick;
    }

    render(options = {}): Node {
        const template = this.getTemplate();

        options = {
            name: this.getQuery(),
            placeholder: this.getPlaceholder(),
            results: this.renderResults(),
            ...options,
        };

        const rendered = Mustache.render(template, options);

        return document.createRange().createContextualFragment(rendered);
    }

    renderResults(options: any = {}) {
        const template = this.getResultTemplate();

        options = {
            no_result_message: this.getNoResultMessage(),
            ...options,
        };

        return Mustache.render(template, options);
    }

    renderResultTemplates(options: any = {}, template: any = null) {
        const use = (template) ? template : this.getInnerResultTemplate();

        return Mustache.render(use, options);
    }

    getQuery(): string {
        return this.query;
    }

    setQuery(query: string): GroupedSearchBar {
        this.query = query;
        return this;
    }

    /**
     * Set listeners
     */
    executeJS(): void {
        const prevVal = URIHelper.getSearchParam(this.getQuery());

        document.querySelectorAll(`${this.getEl()} .needletail-grouped-search-bar-input`)
            .forEach((element: HTMLInputElement) => {
                element.value = (prevVal) ? prevVal : '';
                // On load call the handle function to trigger a search
                document.addEventListener('DOMContentLoaded', () => {
                    if (this.getSearchOnContentLoaded()) {
                        this.handle(element);
                    }
                });

                element.addEventListener('focus', () => {
                    element.classList.add('active');
                });

                element.addEventListener('blur', () => {
                    setTimeout(() => {
                        element.classList.remove('active');
                    }, 100);
                });

                if (this.getInitialInput()) {
                    element.addEventListener('input', (e) => {
                        // eslint-disable-next-line max-len
                        const initialInput = document.querySelectorAll(`${this.getEl()} .needletail-grouped-search-bar-result.needletail-initial-input`);
                        initialInput.forEach((r: Element) => {
                            r.innerHTML = element.value;
                            r.setAttribute('data-attribute', element.value);
                        });

                        element.setAttribute('data-initial-value', element.value);
                    });
                }

                if (this.getUseDebounce()) {
                    // If debounce is turned on
                    element.addEventListener('input', _debounce(() => {
                        // eslint-disable-next-line max-len
                        const results: any = document.querySelectorAll(`${this.getEl()} .needletail-grouped-search-bar-result`);
                        this.selectedResult = -1;
                        this.switchActiveClass(results);
                        this.handle(element);
                    }, this.getDebounceWait()));

                    if (this.getInUrl()) {
                    // If the data should be saved in the URL
                        element.addEventListener('input', _debounce(() => {
                            this.handleUrlChange(element);
                        }, this.getDebounceUrlWait()));
                    }
                } else {
                    element.addEventListener('input', () => {
                        // eslint-disable-next-line max-len
                        const results: any = document.querySelectorAll(`${this.getEl()} .needletail-grouped-search-bar-result`);
                        this.selectedResult = -1;
                        this.switchActiveClass(results);
                        // If the data should be saved in the URL
                        this.handleUrlChange(element);
                        this.handle(element);
                    });
                }

                element.addEventListener('keydown', (e) => {
                    element.classList.add('active');

                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                        e.preventDefault();
                        // eslint-disable-next-line max-len
                        const results: any = document.querySelectorAll(`${this.getEl()} .needletail-grouped-search-bar-result`);
                        if (results.length < 1) {
                            return;
                        }

                        if (e.key === 'ArrowUp') {
                            // Move the active class up one
                            if (this.selectedResult > 0) {
                                this.selectedResult--;
                            }
                        } else if (e.key === 'ArrowDown') {
                            // Move the active class down one
                            if (this.selectedResult < results.length - 1) {
                                this.selectedResult++;
                            }
                        }

                        this.switchActiveClass(results);

                        element.value = results[this.selectedResult].getAttribute('data-attribute');

                        Events.emit(Events.onArrowMovementGroupedSearch, {
                            query: this.getQuery(),
                            value: results[this.selectedResult].dataset,
                        });
                    } else if (e.key === 'Enter') {
                        // eslint-disable-next-line max-len
                        const results: any = document.querySelectorAll(`${this.getEl()} .needletail-grouped-search-bar-result`);

                        // Handle on enter key and fire an event.
                        // this.handle(element);
                        Events.emit(Events.onSubmitGroupedSearch, {
                            query: this.getQuery(),
                            value: (results[this.selectedResult]) ? results[this.selectedResult].dataset : element.value,
                        });
                    } else if (e.key === 'Escape') {
                        if (this.getInitialInput()) {
                            element.value = element.getAttribute('data-initial-value');
                        }
                        // Remove the focus on escape to close the dropdown
                        document.querySelectorAll(':focus').forEach((el: HTMLInputElement) => el.blur());
                    }
                });
            });

        document.addEventListener(Events.onBeforeGroupedSearch, async (e: CustomEvent) => {
            if (e.detail.query !== this.getQuery()) {
                e.preventDefault();
                return;
            }

            e.detail.extra_search_values = {};

            // Start the actual search
            Events.emit(Events.onGroupedSearch, e.detail);
        });

        document.addEventListener(Events.onGroupedSearch, async (e: CustomEvent) => {
            if (e.detail.query !== this.getQuery()) {
                e.preventDefault();
                return;
            }

            const buckets: any = {};

            // Prepare the options for the search
            this.getBuckets().forEach((val: any) => {
                if (typeof val === 'object') {
                    if (val.name) {
                        let attributes: any = val.attribute || this.getAttributes();

                        if (typeof attributes === 'string') {
                            attributes = [attributes];
                        }

                        const search: any = [];

                        attributes.forEach((attribute: string) => {
                            search.push({
                                field: attribute,
                                value: e.detail.value,
                            });
                        });

                        buckets[val.name] = {
                            search: {
                                should: {
                                    fuzzy: search,
                                },
                                ...e.detail.extra_search_values,
                            },
                            sort: val.sort || this.getSortBy(),
                            direction: val.direction || this.getSortDirection(),
                            size: val.size || this.getSize(),
                            group_by: val.group_by || this.getGroupBy(),
                            highlight: true,
                            mode: val.sort_mode || this.getSortMode(),
                        };
                    }
                } else {
                    let attributes: any = this.getAttributes();

                    if (typeof attributes === 'string') {
                        attributes = [attributes];
                    }

                    const search: any = [];

                    attributes.forEach((attribute: string) => {
                        search.push({
                            field: attribute,
                            value: e.detail.value,
                        });
                    });

                    buckets[val] = {
                        search: {
                            should: {
                                fuzzy: search,
                            },
                            ...e.detail.extra_search_values,
                        },
                        sort: this.getSortBy(),
                        direction: this.getSortDirection(),
                        size: this.getSize(),
                        group_by: this.getGroupBy(),
                        highlight: true,
                        mode: this.getSortMode(),
                    };
                }
            });

            // Make the search
            const result = await this.client.bulk({
                buckets: buckets,
            });

            e.detail.status = result.status;

            if (result && result.data) {
                e.detail.search_result = [];

                Object.keys(result.data).forEach((bucketKey: any) => {
                    const r = result.data[bucketKey];
                    const bucket: any = this.getBuckets().find((b: any) => {
                        return (b.name === bucketKey || b === bucketKey);
                    });

                    // If there is data map it to include some easy access values
                    if (r.count > 0) {
                        e.detail.search_result.push({
                            raw: bucket,
                            key: bucket.key ?? bucketKey,
                            results: r.results.map((r: any) => {
                                const mapped = {
                                    id: r.id,
                                    ...r.record,
                                    value: {},
                                    raw: {},
                                };

                                if (r.highlight) {
                                    mapped.highlight = {};
                                }

                                let attributes: any = bucket.attribute ?? this.getAttributes();

                                if (typeof attributes === 'string') {
                                    attributes = [attributes];
                                }

                                attributes.forEach((attribute: string) => {
                                    mapped.value[attribute] = r.record[attribute];
                                    mapped.raw[attribute] = r.record[attribute];

                                    if (r.highlight) {
                                        mapped.highlight[attribute] = r.highlight[attribute];
                                    }
                                });

                                return mapped;
                            }),
                        });
                    }
                });
            }

            Events.emit(Events.onAfterGroupedSearch, e.detail);
        });

        document.addEventListener(Events.onAfterGroupedSearch, async (e: CustomEvent) => {
            if (e.detail.query !== this.getQuery()) {
                e.preventDefault();
                return;
            }

            // Render the results
            let options = {};

            if (e.detail.search_result && Object.keys(e.detail.search_result).length > 0) {
                options = {
                    results: e.detail.search_result,
                    initial_input: e.detail.value,
                };
            }

            this.buildResults(options);
            Events.emit(Events.groupedSearchBarFinished, {
                name: this.getDiscriminator(),
            });
        });
    }

    buildResults(options: any = {}) {
        if (!this.getShowResults()) {
            return;
        }

        const innerResults: any = [];

        if (options && options.results) {
            options.results.forEach((r: any) => {
                const bucket: any = this.getBuckets().find((b: any) => {
                    return (b.key === r.key || b === r.key);
                });

                if (bucket && bucket.template) {
                    innerResults.push(this.renderResultTemplates(r, bucket.template));
                } else {
                    innerResults.push(this.renderResultTemplates(r));
                }
            });

            options.results = innerResults;
        }

        const results = this.renderResults(options);
        const nodeResults = document.createRange().createContextualFragment(results);

        document.querySelectorAll(`.needletail-grouped-search-bar-${this.getQuery()}`)
            .forEach((element) => {
                const currentChild = element.querySelector('.needletail-grouped-search-bar-results');

                element.replaceChild(nodeResults.cloneNode(true), currentChild);

                const newChild = element.querySelector('.needletail-grouped-search-bar-results');
                const newResults = newChild.querySelectorAll('.needletail-grouped-search-bar-result');

                newResults.forEach((element: HTMLElement) => {
                    element.addEventListener('mouseover', (e) => {
                        this.selectedResult = Array.prototype.indexOf.call(newResults, element);
                        newResults.forEach((rElement) => {
                            rElement.classList.remove('active');
                        });

                        newResults[this.selectedResult].classList.add('active');
                    });

                    // Add the click event
                    element.addEventListener('click', (e) => {
                        if (this.getFillInputOnClick()) {
                        // eslint-disable-next-line max-len
                            const inputs = document.querySelectorAll(`.needletail-grouped-search-bar-${this.getQuery()} .needletail-grouped-search-bar-input`);

                            inputs.forEach((i: HTMLInputElement) => {
                                i.value = element.getAttribute('data-attribute');
                                this.handleUrlChange(i);
                            });
                        }

                        // this.handle(element);
                        Events.emit(Events.onSubmitGroupedSearch, {
                            query: this.getQuery(),
                            value: element.dataset,
                        });
                    });
                });

                const input:any = element.querySelector('.needletail-grouped-search-bar-input');
                if (input && input.value.length > 0) {
                    input.classList.remove('needletail-empty');
                }
            });
    }

    handleUrlChange(element: any) {
        if (!this.getInUrl()) {
            return;
        }

        // Put the value in the url
        URIHelper.addToHistory(this.getQuery(), element.getAttribute('data-initial-value'));
    }

    handle(element: any) {
        let data: {
            // eslint-disable-next-line camelcase
            search_result: {},
            value: string,
            query?: string
        };

        const value = element.value;
        if (value && value.length < this.getMinimumCharacters()) {
            data = {
                value: '',
                search_result: {},
            };
            this.value = {
                field: this.getAttributes(),
                value: '',
            };
        } else {
            data = {
                value: value,
                search_result: {},
            };
            this.value = {
                field: this.getAttributes(),
                value: value,
            };
        }

        if (value.length == 0) {
            element.classList.add('needletail-empty');
        }

        data.query = this.getQuery();

        Events.emit(Events.onBeforeGroupedSearch, data);
    }

    switchActiveClass(results: any) {
        if (!this.getShowResults()) {
            return;
        }

        // Remove the active class from all results
        results.forEach((rElement: Element) => {
            rElement.classList.remove('active');
        });

        if (this.selectedResult > -1) {
            // Add it to the new selected result
            results[this.selectedResult].classList.add('active');
        }
    }
}
