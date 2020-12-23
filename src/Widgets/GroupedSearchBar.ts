import {Widget} from './../Imports/BaseClasses';
import template from './../Html/grouped_search_bar.html';
import result_template from './../Html/grouped_search_bar_results.html';
import Mustache from "mustache";
import _debounce from "lodash/debounce";
import {Events, optional, URIHelper} from "../Imports/Helpers";
import {GroupedSearchBarSettings} from "../Imports/Interfaces";

export class GroupedSearchBar extends Widget {
    /**
     * The template used for the result dropdown
     */
    resultTemplate: string;
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
    size: number = 3;
    /**
     * The minimum amount of characters before executing.
     */
    minimumCharacters: number = 3;
    /**
     * Show the results below the search bar
     */
    showResults: boolean = true;

    constructor(options: GroupedSearchBarSettings = {}) {
        super(options);

        this.debounce = (typeof optional(options.debounce).use !== 'undefined') ? options.debounce.use : this.debounce;
        this.debounceWait = optional(options.debounce).wait || this.debounceWait;
        this.debounceUrlWait = optional(options.debounce).url_wait || this.debounceUrlWait;
        this.inUrl = (typeof options.in_url !== 'undefined') ? options.in_url : this.inUrl;
        this.query = options.query || this.query;
        this.buckets = optional(options.search).buckets || this.buckets;
        this.attribute = optional(options.search).attribute || '';
        this.placeholder = options.placeholder || this.placeholder;
        this.noResultMessage = options.no_result_message || this.noResultMessage;
        this.size = optional(options.search).size || this.size;
        this.minimumCharacters = (typeof options.minimum_characters !== 'undefined') ? options.minimum_characters : this.minimumCharacters;
        this.showResults = (typeof options.show_results !== 'undefined') ? options.show_results : this.showResults;
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

    setAttribute(attribute: string): GroupedSearchBar {
        this.attribute = attribute;
        return this;
    }

    getAttribute(): string {
        return this.attribute;
    }

    setBuckets(buckets: string[]): GroupedSearchBar {
        this.buckets = buckets;
        return this;
    }

    getBuckets(): string[] {
        return this.buckets;
    }

    useDebounce(use: boolean = true): GroupedSearchBar {
        this.debounce = use;
        return this;
    }

    setDebounceWait(wait: number): GroupedSearchBar {
        this.debounceWait = wait;
        return this;
    }

    setDebounceUrlWait(wait: number): GroupedSearchBar {
        this.debounceUrlWait = wait;
        return this;
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

        return result_template;
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
    renderResults(options: any = {}) {
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

    setQuery(query: string): GroupedSearchBar {
        this.query = query;
        return this;
    }

    /**
     * Set listeners
     */
    executeJS(): void {
        let prevVal = URIHelper.getSearchParam(this.getQuery());

        document.querySelectorAll(`${this.getEl()} .needletail-grouped-search-bar-input`).forEach((element: HTMLInputElement) => {
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
                    let results = document.querySelectorAll('.needletail-grouped-search-bar-result');
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
                    Events.emit(Events.onSubmitGroupedSearch, {
                        value: element.value
                    });
                }
                else if (e.key === 'Escape') {
                    // Remove the focus on escape to close the dropdown
                    document.querySelectorAll(':focus').forEach((el: HTMLInputElement) => el.blur());
                }
            });
        });

        document.addEventListener(Events.onBeforeGroupedSearch, async (e: CustomEvent) => {
            // Start the actual search
            Events.emit(Events.onGroupedSearch, e.detail);
        });

        document.addEventListener(Events.onGroupedSearch, async (e: CustomEvent) => {
            let buckets: any = {};

            // Prepare the options for the search
            this.buckets.forEach((val: string) => {
                buckets[val] = {
                    search: {
                        fuzzy: {
                            field: this.attribute,
                            value: e.detail.value
                        }
                    },
                    size: this.size,
                    highlight: true
                }
            });

            // Make the search
            let result = await this.client.bulk({
                buckets: buckets
            });

            if (result && result.data) {
                e.detail.search_result = [];

                Object.keys(result.data).forEach((bucketKey: any) => {
                    let r = result.data[bucketKey];

                    // If there is data map it to include some easy access values
                    if (r.count > 0) {
                        e.detail.search_result.push({
                            key: bucketKey,
                            results: r.results.map((r: any) => {
                                let mapped = {
                                    ...r.record,
                                    value: r.record[this.attribute],
                                    raw: r.record[this.attribute]
                                }

                                if (r.highlight) {
                                    mapped.highlight = r.highlight[this.attribute];
                                }

                                return mapped;
                            })
                        });
                    }
                });
            }

            Events.emit(Events.onAfterGroupedSearch, e.detail);
        });

        document.addEventListener(Events.onAfterGroupedSearch, async (e: CustomEvent) => {
            // Render the results
            let options = {};

            if (e.detail.search_result && Object.keys(e.detail.search_result).length > 0) {
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

        document.querySelectorAll(`.needletail-grouped-search-bar-${this.getQuery()}`).forEach((element) => {
            let currentChild = element.querySelector('.needletail-grouped-search-bar-results');

            element.replaceChild(nodeResults.cloneNode(true), currentChild);

            let newChild = element.querySelector('.needletail-grouped-search-bar-results');
            let newResults = newChild.querySelectorAll('.needletail-grouped-search-bar-result');

            newResults.forEach((element) => {
                element.addEventListener('mouseover', (e) => {
                    this.selectedResult = Array.prototype.indexOf.call(newResults, element);
                    newResults.forEach((rElement) => {
                        rElement.classList.remove('active');
                    });

                    newResults[this.selectedResult].classList.add('active');
                });

                // Add the click event
                element.addEventListener('click', (e) => {
                    let inputs = document.querySelectorAll('.needletail-grouped-search-bar-input');

                    inputs.forEach((i: HTMLInputElement) => {
                        i.value = element.getAttribute('data-attribute');
                        this.handleUrlChange(i);
                    });

                    this.handle(element);
                    Events.emit(Events.onSubmitGroupedSearch, {
                        value: element.getAttribute('data-attribute')
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
        let data;
        if (element.value.length < this.getMinimumCharacters()) {
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

        Events.emit(Events.onBeforeGroupedSearch, data);
    }
}
