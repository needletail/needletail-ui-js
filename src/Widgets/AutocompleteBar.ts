import {Widget} from './../Imports/BaseClasses';
import template from './../Html/autocomplete_bar.html';
import resultTemplate from './../Html/autocomplete_bar_results.html';
import Mustache from 'mustache';
import _debounce from 'lodash/debounce';
import {Events, optional, URIHelper} from '../Imports/Helpers';
// eslint-disable-next-line no-unused-vars
import {AutocompleteBarSettings} from '../Imports/Interfaces';

export class AutocompleteBar extends Widget {
    /**
     * The template used for the result dropdown
     */
    resultTemplate: string;
    /**
     * The discriminator used for sorting the widget
     */
    discriminator: string = 'AutocompleteBar';
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
    query: string = 'autocompleteBar';
    /**
     * Save the value in the url
     */
    inUrl: boolean = true;
    /**
     * Which bucket to search on
     */
    buckets: string[];
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
    size: number = 10;
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
    useInResults: boolean = true;
    searchOnContentLoaded: boolean = true;
    liveResults: boolean = false;
    initialInput: boolean = true;
    forceUseOfResult: boolean = false;
    skipForceResults: number = 0;
    fillInputOnClick: boolean = false;
    showBucket: boolean = false;
    bucketMapping: {[key: string]: string};
    sortMode: string = 'min';
    allowedDirections: string[] = ['asc', 'desc'];

    constructor(options: AutocompleteBarSettings = {}) {
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
        this.setSortDirection(optional(options.search).direction || this.getSortDirection());
        this.setSortMode(optional(options.search).mode || this.getSortMode());
        this.setMinimumCharacters((typeof options.minimum_characters !== 'undefined') ?
            options.minimum_characters : this.getMinimumCharacters());
        this.setShowResults((typeof options.show_results !== 'undefined') ?
            options.show_results : this.getShowResults());
        this.setForceUseOfResult((typeof options.force_use_of_result !== 'undefined') ?
            options.force_use_of_result : this.getForceUseOfResult());
        this.setUseInResults((typeof options.use_in_results !== 'undefined') ?
            options.use_in_results : this.getUseInResults());
        this.setSearchOnContentLoaded((typeof options.search_on_content_loaded !== 'undefined') ?
            options.search_on_content_loaded : this.getSearchOnContentLoaded());
        this.setLiveResults((typeof options.live_results !== 'undefined') ?
            options.live_results : this.getLiveResults());
        this.setInitialInput((typeof options.initial_input !== 'undefined') ?
            options.initial_input : this.getInitialInput());
        this.setFillInputOnClick((typeof options.fill_input_on_click !== 'undefined') ?
            options.fill_input_on_click : this.getFillInputOnClick());
        this.setShowBucket((typeof optional(options.search).show_bucket !== 'undefined') ?
            options.search.show_bucket : this.getShowBucket());
        this.setBucketMapping(optional(options.search).bucket_mapping || this.getBucketMapping());

        if (this.getInitialInput()) {
            this.skipForceResults = 1;
        }
    }

    setMinimumCharacters(minimumCharacters: number): AutocompleteBar {
        this.minimumCharacters = minimumCharacters;
        return this;
    }

    getMinimumCharacters(): number {
        return this.minimumCharacters;
    }

    setSize(size: number): AutocompleteBar {
        this.size = size;
        return this;
    }

    getSize(): number {
        return this.size;
    }

    setPlaceholder(placeholder: string): AutocompleteBar {
        this.placeholder = placeholder;
        return this;
    }

    getPlaceholder(): string {
        return this.placeholder;
    }

    setNoResultMessage(noResultMessage: string): AutocompleteBar {
        this.noResultMessage = noResultMessage;
        return this;
    }

    getNoResultMessage(): string {
        return this.noResultMessage;
    }

    setAttribute(attribute: string|string[]): AutocompleteBar {
        this.attribute = attribute;
        return this;
    }

    getAttribute(): string|string[] {
        return this.attribute;
    }

    setAttributes(attribute: string|string[]): AutocompleteBar {
        this.attribute = attribute;
        return this;
    }

    getAttributes(): string|string[] {
        return this.attribute;
    }

    setBuckets(buckets: []): AutocompleteBar {
        this.buckets = buckets;
        return this;
    }

    getBuckets(): string[] {
        return this.buckets;
    }

    setUseDebounce(use: boolean = true): AutocompleteBar {
        this.debounce = use;
        return this;
    }

    getUseDebounce(): boolean {
        return this.debounce;
    }

    setDebounceWait(wait: number): AutocompleteBar {
        this.debounceWait = wait;
        return this;
    }

    getDebounceWait(): number {
        return this.debounceWait;
    }

    setDebounceUrlWait(wait: number): AutocompleteBar {
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

    setResultTemplate(template: string): AutocompleteBar {
        this.resultTemplate = template;
        return this;
    }

    getResultTemplate(): string {
        if (this.resultTemplate) {
            return this.resultTemplate;
        }

        return resultTemplate;
    }

    setInUrl(inUrl: boolean): AutocompleteBar {
        this.inUrl = inUrl;
        return this;
    }

    getInUrl(): boolean {
        return this.inUrl;
    }

    setShowResults(showResults: boolean): AutocompleteBar {
        this.showResults = showResults;
        return this;
    }

    getShowResults(): boolean {
        return this.showResults;
    }

    setDiscriminator(discriminator: string): AutocompleteBar {
        this.discriminator = discriminator;
        return this;
    }

    getDiscriminator(): string {
        return this.discriminator;
    }

    setSearchOnContentLoaded(search: boolean): AutocompleteBar {
        this.searchOnContentLoaded = search;
        return this;
    }

    getSearchOnContentLoaded(): boolean {
        return this.searchOnContentLoaded;
    }

    setLiveResults(live: boolean): AutocompleteBar {
        this.liveResults = live;
        return this;
    }

    getLiveResults(): boolean {
        return this.liveResults;
    }

    setInitialInput(initialInput: boolean): AutocompleteBar {
        this.initialInput = initialInput;
        return this;
    }

    getInitialInput(): boolean {
        return this.initialInput;
    }

    setFillInputOnClick(fillInputOnClick: boolean): AutocompleteBar {
        this.fillInputOnClick = fillInputOnClick;
        return this;
    }

    getFillInputOnClick(): boolean {
        return this.fillInputOnClick;
    }

    setForceUseOfResult(forceUseOfresult: boolean): AutocompleteBar {
        this.forceUseOfResult = forceUseOfresult;
        return this;
    }

    getForceUseOfResult(): boolean {
        return this.forceUseOfResult;
    }

    setUseInResults(useInResults: boolean): AutocompleteBar {
        this.useInResults = useInResults;
        return this;
    }

    getUseInResults(): boolean {
        return this.useInResults;
    }

    setGroupBy(groupBy: string): AutocompleteBar {
        this.groupBy = groupBy;
        return this;
    }

    getGroupBy(): string {
        return this.groupBy;
    }

    setSortBy(sortBy: string): AutocompleteBar {
        this.sortBy = sortBy;
        return this;
    }

    getSortBy(): string {
        return this.sortBy;
    }

    setSortMode(sortMode: string): AutocompleteBar {
        this.sortMode = sortMode;
        return this;
    }

    getSortMode(): string {
        return this.sortMode;
    }

    setSortDirection(sortDirection: string): AutocompleteBar {
        if (this.allowedDirections.indexOf(sortDirection) === -1) {
            sortDirection = 'asc';
        }

        this.sortDirection = sortDirection;
        return this;
    }

    getSortDirection(): string {
        return this.sortDirection;
    }

    setShowBucket(showBucket: boolean): AutocompleteBar {
        this.showBucket = showBucket;
        return this;
    }

    getShowBucket(): boolean {
        return this.showBucket;
    }

    setBucketMapping(bucketMapping: {[key: string]: string}): AutocompleteBar {
        this.bucketMapping = bucketMapping;
        return this;
    }

    getBucketMapping(): {[key: string]: string} {
        return this.bucketMapping;
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

    renderResults(options = {}) {
        const template = this.getResultTemplate();

        options = {
            no_result_message: this.getNoResultMessage(),
            ...options,
        };

        return Mustache.render(template, options);
    }

    getQuery(): string {
        return this.query;
    }

    setQuery(query: string): AutocompleteBar {
        this.query = query;
        return this;
    }

    /**
     * Set listeners
     */
    executeJS(): void {
        const prevVal = URIHelper.getSearchParam(this.getQuery());

        document.querySelectorAll(`${this.getEl()} .needletail-autocomplete-bar-input`)
            .forEach((element: HTMLInputElement) => {
                if (this.getForceUseOfResult()) {
                    element.setAttribute('data-force', 'on');
                }

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
                        const initialInput = document.querySelectorAll(`${this.getEl()} .needletail-autocomplete-bar-result.needletail-initial-input`);
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
                        const results: any = document.querySelectorAll(`${this.getEl()} .needletail-autocomplete-bar-result`);
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
                        const results: any = document.querySelectorAll(`${this.getEl()} .needletail-autocomplete-bar-result`);
                        this.selectedResult = -1;
                        this.switchActiveClass(results);

                        // If the data should be saved in the URL
                        this.handleUrlChange(element);
                        this.handle(element);
                    });
                }

                element.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                        e.preventDefault();
                        // eslint-disable-next-line max-len
                        const results: any = document.querySelectorAll(`${this.getEl()} .needletail-autocomplete-bar-result`);
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

                        if (this.getForceUseOfResult()) {
                            if (this.selectedResult < this.skipForceResults) {
                                element.setAttribute('data-force', 'on');
                            } else {
                                element.setAttribute('data-force', 'off');
                            }
                        }

                        Events.emit(Events.onArrowMovementSearch, {
                            value: results[this.selectedResult].dataset,
                        });
                    } else if (e.key === 'Enter') {
                        // eslint-disable-next-line max-len
                        const results: any = document.querySelectorAll(`${this.getEl()} .needletail-autocomplete-bar-result`);

                        if (this.getForceUseOfResult()) {
                            if (element.getAttribute('data-force') === 'on') {
                                element.value = results[this.skipForceResults].getAttribute('data-attribute');
                                this.selectedResult = this.skipForceResults;
                            }
                        }
                        // Handle on enter key and fire an event.
                        // this.handle(element);
                        Events.emit(Events.onSubmitSearch, {
                            id: this.getQuery(),
                            value: results[this.selectedResult].dataset,
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

        document.addEventListener(Events.onBeforeSearch, async (e: CustomEvent) => {
            if (e.detail.query !== this.getQuery()) {
                e.preventDefault();
                return;
            }

            e.detail.extra_search_values = {};

            // Start the actual search
            Events.emit(Events.onSearch, e.detail);
        });

        document.addEventListener(Events.onSearch, async (e: CustomEvent) => {
            if (e.detail.query !== this.getQuery()) {
                e.preventDefault();
                return;
            }

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

            // Make the search
            const result = await this.client.search({
                buckets: this.getBuckets(),
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
                show_bucket: this.getShowBucket(),
                mode: this.getSortMode(),
            });

            // If there is data map it to include some easy access values
            if (result && result.data.count > 0) {
                e.detail.search_result = result.data.results.map((r: any) => {
                    const bucketName: string = (r.bucket) ? r.bucket.toString() : '';
                    const mapped = {
                        id: r.id,
                        ...r.record,
                        bucket: (bucketName !== '' && this.getBucketMapping()[bucketName]) ?
                            this.getBucketMapping()[bucketName] : '',
                        value: {},
                        raw: {},
                    };

                    if (r.highlight) {
                        mapped.highlight = {};
                    }

                    let attributes: any = this.getAttributes();

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
                });
            }

            Events.emit(Events.onAfterSearch, e.detail);
        });

        document.addEventListener(Events.onAfterSearch, async (e: CustomEvent) => {
            if (e.detail.query !== this.getQuery()) {
                e.preventDefault();
                return;
            }

            // Render the results
            // eslint-disable-next-line camelcase
            let options: {results: any[], initial_input: string} = {
                results: [],
                // eslint-disable-next-line camelcase
                initial_input: '',
            };

            if (e.detail.search_result && e.detail.search_result.length > 0 &&
                (e.detail.value && e.detail.value.length !== 0)) {
                options = {
                    results: e.detail.search_result,
                    initial_input: (this.getInitialInput()) ? e.detail.value : '',
                };
            }

            this.buildResults(options);
            Events.emit(Events.autocompleteBarFinished, {
                name: this.getDiscriminator(),
            });
        });
    }

    buildResults(options = {}) {
        if (!this.getShowResults()) {
            return;
        }

        const results = this.renderResults(options);
        const nodeResults = document.createRange().createContextualFragment(results);

        document.querySelectorAll(`.needletail-autocomplete-bar-${this.getQuery()}`)
            .forEach(async (element) => {
                const currentChild = element.querySelector('.needletail-autocomplete-bar-results');

                await element.replaceChild(nodeResults.cloneNode(true), currentChild);

                const newChild = element.querySelector('.needletail-autocomplete-bar-results');
                const newResults = newChild.querySelectorAll('.needletail-autocomplete-bar-result');

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
                            const inputs = document.querySelectorAll(`.needletail-autocomplete-bar-${this.getQuery()} .needletail-autocomplete-bar-input`);

                            inputs.forEach((i: HTMLInputElement) => {
                                i.value = element.getAttribute('data-attribute');
                                this.handleUrlChange(i);
                            });
                        }

                        // this.handle(element);
                        Events.emit(Events.onSubmitSearch, {
                            id: this.getQuery(),
                            value: element.dataset,
                        });
                    });
                });

                const input:any = element.querySelector('.needletail-autocomplete-bar-input');
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
                field: this.getAttribute(),
                value: '',
            };
        } else {
            data = {
                value: value,
                search_result: {},
            };
            this.value = {
                field: this.getAttribute(),
                value: value,
            };
        }

        if (value.length == 0) {
            element.classList.add('needletail-empty');
        }

        data.query = this.getQuery();

        Events.emit(Events.onBeforeSearch, data);

        if (this.getLiveResults()) {
            Events.emit(Events.onBeforeResultRequest, {});
        }
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
