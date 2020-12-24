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
    /**
     * Show the results below the search bar
     */
    showResults: boolean = true;

    constructor(options: AutocompleteBarSettings = {}) {
        super(options);

        this.debounce = (typeof optional(options.debounce).use !== 'undefined') ? options.debounce.use : this.debounce;
        this.debounceWait = optional(options.debounce).wait || this.debounceWait;
        this.debounceUrlWait = optional(options.debounce).url_wait || this.debounceUrlWait;
        this.inUrl = (typeof options.in_url !== 'undefined') ? options.in_url : this.inUrl;
        this.query = options.query || this.query;
        this.attribute = optional(options.search).attribute || '';
        this.buckets = optional(options.search).buckets || '';
        this.placeholder = options.placeholder || this.placeholder;
        this.noResultMessage = options.no_result_message || this.noResultMessage;
        this.size = optional(options.search).size || this.size;
        this.minimumCharacters = (typeof options.minimum_characters !== 'undefined') ? options.minimum_characters : this.minimumCharacters;
        this.showResults = (typeof options.show_results !== 'undefined') ? options.show_results : this.showResults;
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
            element.value = (prevVal) ? prevVal : '';
            // On load call the handle function to trigger a search
            document.addEventListener("DOMContentLoaded", () => {
                this.handle(element);
            });

            if (this.debounce) {
                // If debounce is turned on
                element.addEventListener('input', _debounce(() => {
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
                    if (this.inUrl) {
                        // If the data should be saved in the URL
                        this.handleUrlChange(element);
                    }
                    this.handle(element);
                });
            }

            element.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    let results = document.querySelectorAll('.needletail-autocomplete-bar-result');
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

                    // Remove the active class from all results
                    results.forEach((rElement) => {
                        rElement.classList.remove('active');
                    });

                    // Add it to the new selected result
                    results[this.selectedResult].classList.add('active');
                    element.value = results[this.selectedResult].getAttribute('data-attribute');
                    this.handleUrlChange(element);
                }
                else if (e.key === 'Enter') {
                    // Handle on enter key and fire an event.
                    this.handle(element);
                    Events.emit(Events.onSubmitSearch, {
                        value: element.dataset
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
            }

            // Start the actual search
            Events.emit(Events.onSearch, e.detail);
        });

        document.addEventListener(Events.onSearch, async (e: CustomEvent) => {
            if (e.detail.query !== this.getQuery()) {
                e.preventDefault();
            }

            // Make the search
            let result = await this.client.search({
                buckets: this.buckets,
                search: {
                    fuzzy: {
                        field: this.attribute,
                        value: e.detail.value
                    }
                },
                size: this.size,
                highlight: true
            });

            // If there is data map it to include some easy access values
            if (result && result.data.count > 0) {
                e.detail.search_result = result.data.results.map((r: any) => {
                    let mapped = {
                        ...r.record,
                        value: r.record[this.attribute],
                        raw: r.record[this.attribute]
                    }

                    if (r.highlight) {
                        mapped.highlight = r.highlight[this.attribute];
                    }

                    return mapped;
                });

            }

            Events.emit(Events.onAfterSearch, e.detail);
        });

        document.addEventListener(Events.onAfterSearch, async (e: CustomEvent) => {
            if (e.detail.query !== this.getQuery()) {
                e.preventDefault();
            }

            // Render the results
            let options = {};

            if (e.detail.search_result && e.detail.search_result.length > 0) {
                options = {
                    results: e.detail.search_result
                }
            }

            this.buildResults(options);
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

        document.querySelectorAll(`.needletail-autocomplete-bar-${this.getQuery()}`).forEach((element) => {
            let currentChild = element.querySelector('.needletail-autocomplete-bar-results');

            element.replaceChild(nodeResults.cloneNode(true), currentChild);

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
                    let inputs = document.querySelectorAll('.needletail-autocomplete-bar-input');

                    inputs.forEach((i: HTMLInputElement) => {
                        i.value = element.getAttribute('data-attribute');
                        this.handleUrlChange(i);
                    });

                    this.handle(element);
                    Events.emit(Events.onSubmitSearch, {
                        value: element.dataset
                    });
                });
            });
        });
    }

    handleUrlChange(element: any) {
        // Put the value in the url
        URIHelper.addToHistory(this.getQuery(), element.value);
    }

    handle(element: any) {
        let data: {
            search_result: {},
            value: string,
            query?: string
        };

        if (element.value && element.value.length < this.getMinimumCharacters()) {
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
                value: element.value,
                search_result: {},
            };
            this.value = {
                field: this.attribute,
                value: element.value
            };
        }

        data.query = this.getQuery();

        Events.emit(Events.onBeforeSearch, data);
        Events.emit(Events.onBeforeResultRequest, {});
    }
}
