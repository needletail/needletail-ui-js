import {Widget} from './../Imports/BaseClasses';
import template from './../Html/autocomplete_bar.html';
import result_template from './../Html/autocomplete_bar_results.html';
import Mustache from "mustache";
import _debounce from "lodash/debounce";
import {Events, optional, URIHelper} from "../Imports/Helpers";
import {AutocompleteBarSettings} from "../Imports/Interfaces";

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
    attribute: string;
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
    group_by: string = '';
    sort_by: string = '';
    sort_direction: string = 'asc';
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

    constructor(options: AutocompleteBarSettings = {}) {
        super(options);

        this.debounce = (typeof optional(options.debounce).use !== 'undefined') ? options.debounce.use : this.debounce;
        this.debounceWait = optional(options.debounce).wait || this.debounceWait;
        this.debounceUrlWait = optional(options.debounce).url_wait || this.debounceUrlWait;
        this.inUrl = (typeof options.in_url !== 'undefined') ? options.in_url : this.inUrl;
        this.query = options.query || this.query;
        this.attribute = optional(options.search).attribute || '';
        this.buckets = optional(options.search).buckets || [];
        this.placeholder = options.placeholder || this.placeholder;
        this.noResultMessage = options.no_result_message || this.noResultMessage;
        this.size = optional(options.search).size || this.size;
        this.group_by = optional(options.search).group_by || '';
        this.sort_by = optional(options.search).sort_by || '';
        this.sort_direction = optional(options.search).direction || this.sort_direction;
        this.minimumCharacters = (typeof options.minimum_characters !== 'undefined') ? options.minimum_characters : this.minimumCharacters;
        this.showResults = (typeof options.show_results !== 'undefined') ? options.show_results : this.showResults;
        this.useInResults = (typeof options.use_in_results !== 'undefined') ? options.use_in_results : this.useInResults;
        this.searchOnContentLoaded = (typeof options.search_on_content_loaded !== 'undefined') ? options.search_on_content_loaded : this.searchOnContentLoaded;
        this.liveResults = (typeof options.live_results !== 'undefined') ? options.live_results : this.liveResults;
        this.initialInput = (typeof options.initial_input !== 'undefined') ? options.initial_input : this.initialInput;
        this.forceUseOfResult = (typeof options.force_use_of_result !== 'undefined') ? options.force_use_of_result : this.forceUseOfResult;
        this.fillInputOnClick = (typeof options.fill_input_on_click !== 'undefined') ? options.fill_input_on_click : this.fillInputOnClick;
        this.showBucket = (typeof optional(options.search).show_bucket !== 'undefined') ? options.search.show_bucket : this.showBucket;
        this.bucketMapping = optional(options.search).bucket_mapping || this.bucketMapping;

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

    setAttribute(attribute: string): AutocompleteBar {
        this.attribute = attribute;
        return this;
    }

    getAttribute(): string {
        return this.attribute;
    }

    setBuckets(buckets: []): AutocompleteBar {
        this.buckets = buckets;
        return this;
    }

    getBuckets(): string[] {
        return this.buckets;
    }

    useDebounce(use: boolean = true): AutocompleteBar {
        this.debounce = use;
        return this;
    }

    setDebounceWait(wait: number): AutocompleteBar {
        this.debounceWait = wait;
        return this;
    }

    setDebounceUrlWait(wait: number): AutocompleteBar {
        this.debounceUrlWait = wait;
        return this;
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

        return result_template;
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

    setInitialInput(initial_input: boolean): AutocompleteBar {
        this.initialInput = initial_input;
        return this;
    }

    getInitialInput(): boolean {
        return this.initialInput;
    }

    setFillInputOnClick(fill_input_on_click: boolean): AutocompleteBar {
        this.fillInputOnClick = fill_input_on_click;
        return this;
    }

    getFillInputOnClick(): boolean {
        return this.fillInputOnClick;
    }

    setForceUseOfResult(force_use_of_result: boolean): AutocompleteBar {
        this.forceUseOfResult = force_use_of_result;
        return this;
    }

    getForceUseOfResult(): boolean {
        return this.forceUseOfResult;
    }

    setGroupBy(group_by: string): AutocompleteBar {
        this.group_by = group_by;
        return this;
    }

    getGroupBy(): string {
        return this.group_by;
    }

    setSortBy(sort_by: string): AutocompleteBar {
        this.sort_by = sort_by;
        return this;
    }

    getSortBy(): string {
        return this.sort_by;
    }

    setSortDirection(sort_direction: string): AutocompleteBar {
        this.sort_direction = sort_direction;
        return this;
    }

    getSortDirection(): string {
        return this.sort_direction;
    }

    /**
     * Render the widget and make it a node
     * @param options
     */
    render(options = {}): Node {
        let template = this.getTemplate();

        options = {
            name: this.getQuery(),
            placeholder: this.getPlaceholder(),
            results: this.renderResults(),
            ...options
        }

        let rendered = Mustache.render(template, options);

        return document.createRange().createContextualFragment(rendered);
    }

    /**
     * Render the results separately of the entire input
     * @param options
     */
    renderResults(options = {}) {
        let template = this.getResultTemplate();

        options = {
            no_result_message: this.getNoResultMessage(),
            ...options
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
        let prevVal = URIHelper.getSearchParam(this.getQuery());

        document.querySelectorAll(`${this.getEl()} .needletail-autocomplete-bar-input`).forEach((element: HTMLInputElement) => {
            if (this.getForceUseOfResult()) {
                element.setAttribute('data-force', 'on');
            }

            element.value = (prevVal) ? prevVal : '';
            // On load call the handle function to trigger a search
            document.addEventListener("DOMContentLoaded", () => {
                if (this.getSearchOnContentLoaded()) {
                    this.handle(element);
                }
            });

            element.addEventListener('focus', () => {
                element.classList.add('active');
            });

            element.addEventListener('blur', () => {
                setTimeout(() => {element.classList.remove('active');}, 100);
            });

            if (this.getInitialInput()) {
                element.addEventListener('input', (e) => {
                    let initial_input = document.querySelectorAll(`${this.getEl()} .needletail-autocomplete-bar-result.needletail-initial-input`);
                    initial_input.forEach((r: Element) => {
                        r.innerHTML = element.value;
                        r.setAttribute('data-attribute', element.value);
                    });

                    element.setAttribute('data-initial-value', element.value);
                });
            }

            if (this.debounce) {
                // If debounce is turned on
                element.addEventListener('input', _debounce(() => {
                    let results: any = document.querySelectorAll(`${this.getEl()} .needletail-autocomplete-bar-result`);
                    this.selectedResult = -1;
                    this.switchActiveClass(results);

                    this.handle(element);
                }, this.debounceWait));

                if (this.inUrl) {
                    // If the data should be saved in the URL
                    element.addEventListener('input', _debounce(() => {
                        this.handleUrlChange(element);
                    }, this.debounceUrlWait));
                }
            }
            else {
                element.addEventListener('input', () => {
                    let results: any = document.querySelectorAll(`${this.getEl()} .needletail-autocomplete-bar-result`);
                    this.selectedResult = -1;
                    this.switchActiveClass(results);

                    // If the data should be saved in the URL
                    this.handleUrlChange(element);
                    this.handle(element);
                });
            }

            element.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    let results: any = document.querySelectorAll(`${this.getEl()} .needletail-autocomplete-bar-result`);
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
                            element.setAttribute('data-force', 'on')
                        }
                        else {
                            element.setAttribute('data-force', 'off')
                        }
                    }

                    element.setSelectionRange(element.value.length, element.value.length);

                    Events.emit(Events.onArrowMovementSearch, {
                        value: results[this.selectedResult].dataset
                    });
                }
                else if (e.key === 'Enter') {
                    let results: any = document.querySelectorAll(`${this.getEl()} .needletail-autocomplete-bar-result`);

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
                        value: results[this.selectedResult].dataset
                    });
                }
                else if (e.key === 'Escape') {
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

            let attributes: any = this.attribute;

            if (typeof attributes === "string") {
                attributes = [attributes];
            }

            let search: any = [];

            attributes.forEach((attribute: string) => {
                search.push({
                    field: attribute,
                    value: e.detail.value
                });
            });

            // Make the search
            let result = await this.client.search({
                buckets: this.buckets,
                search: {
                    should: {
                        fuzzy: search
                    },
                    ...e.detail.extra_search_values
                },
                sort: this.sort_by,
                direction: this.sort_direction,
                size: this.size,
                group_by: this.group_by,
                highlight: true,
                show_bucket: this.showBucket
            });

            // If there is data map it to include some easy access values
            if (result && result.data.count > 0) {
                e.detail.search_result = result.data.results.map((r: any) => {
                    let bucket_name: string = (r.bucket) ? r.bucket.toString() : '';
                    let mapped = {
                        ...r.record,
                        bucket: (bucket_name !== '' && this.bucketMapping[bucket_name]) ? this.bucketMapping[bucket_name] : '',
                        value: {},
                        raw: {}
                    }

                    if (r.highlight) {
                        mapped.highlight = {};
                    }

                    let attributes: any = this.attribute;

                    if (typeof attributes === "string") {
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
            let options: {results: any[], initial_input: string} = {
                results: [],
                initial_input: '',
            };

            if (e.detail.search_result && e.detail.search_result.length > 0 && (e.detail.value && e.detail.value.length !== 0)) {
                options = {
                    results: e.detail.search_result,
                    initial_input: (this.getInitialInput()) ? e.detail.value : ''
                }
            }

            this.buildResults(options);
            Events.emit(Events.autocompleteBarFinished, {
                name: this.discriminator,
            });
        });
    }

    /**
     * Build the result dropdown
     * @param options
     */
    buildResults(options = {}) {
        if (!this.showResults) {
            return;
        }

        let results = this.renderResults(options);
        let nodeResults = document.createRange().createContextualFragment(results);

        document.querySelectorAll(`.needletail-autocomplete-bar-${this.getQuery()}`).forEach(async (element) => {
            let currentChild = element.querySelector('.needletail-autocomplete-bar-results');

            await element.replaceChild(nodeResults.cloneNode(true), currentChild);

            let newChild = element.querySelector('.needletail-autocomplete-bar-results');
            let newResults = newChild.querySelectorAll('.needletail-autocomplete-bar-result');

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
                    if (this.fillInputOnClick) {
                        let inputs = document.querySelectorAll(`.needletail-autocomplete-bar-${this.getQuery()} .needletail-autocomplete-bar-input`);

                        inputs.forEach((i: HTMLInputElement) => {
                            i.value = element.getAttribute('data-attribute');
                            this.handleUrlChange(i);
                        });
                    }

                    // this.handle(element);
                    Events.emit(Events.onSubmitSearch, {
                        id: this.getQuery(),
                        value: element.dataset
                    });
                });
            });

            let input:any = element.querySelector('.needletail-autocomplete-bar-input');
            if (input && input.value.length > 0) {
                input.classList.remove('needletail-empty')
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
            search_result: {},
            value: string,
            query?: string
        };

        let value = element.value;
        if (value && value.length < this.getMinimumCharacters()) {
            data = {
                value: '',
                search_result: {},
            };
            this.value = {
                field: this.attribute,
                value: ''
            };
        }
        else {
            data = {
                value: value,
                search_result: {},
            };
            this.value = {
                field: this.attribute,
                value: value
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
