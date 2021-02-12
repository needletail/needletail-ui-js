import {Widget} from './../Imports/BaseClasses';
import template from './../Html/result.html';
import result_template from './../Html/result_results.html';
import Mustache from "mustache";
import {ResultSettings} from "../Imports/Interfaces";
import {Events, optional, URIHelper} from "../Imports/Helpers";
import {AutocompleteBar} from "./AutocompleteBar";
import {AggregationBar} from "./AggregationBar";
import _debounce from "lodash/debounce";

export class Result extends Widget {
    /**
     * The template used for the result dropdown
     */
    discriminator: string = 'Result';
    /**
     * The amount of records to show per page
     */
    per_page: number = 10;
    /**
     * The text for the previous button
     */
    previous: string = 'Previous';
    /**
     * The text for the next button
     */
    next: string = 'Next';
    /**
     * The text for the last button
     */
    last: string = 'Last';
    /**
     * The text for the first button
     */
    first: string = 'First';
    /**
     * Enable or disable the first and last button
     */
    show_quick_pagination: boolean = false;
    /**
     * The amount of pages to show at the same time, this excludes the first and last page
     */
    minify_pages: number = 5;
    /**
     * The template to use for the results
     */
    result_template: string;
    group_by: string = '';

    constructor(options: ResultSettings = {}) {
        super(options);

        this.per_page = options.per_page || this.per_page;
        this.previous = optional(options.pagination).previous || this.previous;
        this.next = optional(options.pagination).next || this.next;
        this.minify_pages = options.minify_pages || this.minify_pages;
        this.last = optional(options.pagination).last || this.last;
        this.first = optional(options.pagination).first || this.first;
        this.show_quick_pagination = optional(options.pagination).show_quick_pagination || this.show_quick_pagination;
        this.result_template = options.result_template;
        this.group_by = options.group_by || '';

        this.executeJS();
    }

    setMinifyPages(minifyPages: number): Result {
        this.minify_pages = minifyPages;
        return this;
    }

    getMinifyPages(): number {
        return this.minify_pages;
    }

    setPrevious(previous: string): Result {
        this.previous = previous;
        return this;
    }

    getPrevious(): string {
        return this.previous;
    }

    setNext(next: string): Result {
        this.next = next;
        return this;
    }

    getNext(): string {
        return this.next;
    }

    getTemplate(): string {
        if (this.template) {
            return this.template;
        }

        return template;
    }

    getResultTemplate(): string {
        if (this.result_template) {
            return this.result_template;
        }

        return result_template;
    }

    setResultTemplate(template: string): Result {
        this.result_template = template;
        return this;
    }

    setFirst(first: string): Result {
        this.first = first;
        this.showQuickPagination();
        return this;
    }

    getFirst(): string {
        return this.first;
    }

    setLast(last: string): Result {
        this.last = last;
        this.showQuickPagination();
        return this;
    }

    getLast(): string {
        return this.last;
    }

    showQuickPagination(): Result {
        this.show_quick_pagination = true;

        return this;
    }

    setGroupBy(group_by: string): Result {
        this.group_by = group_by;
        return this;
    }

    getGroupBy(): string {
        return this.group_by;
    }

    /**
     * Render the results
     *
     * @param results
     * @param pages
     */
    render(results: {id: string, record: {}}[] = [], pages: {page: any, offset: number, active: string}[] = []): Node {
        let template = this.getTemplate();

        let mappedResults: {}[] = [];
        if (results) {
            Object.keys(results).forEach((key: any) => {
                mappedResults.push(results[key].record);
            });
        }

        // If the page does not exist, assume we're on the first page
        let current_page = parseInt(URIHelper.getSearchParam('page')) || 1;
        let last_page: {page: any, offset: number, active: string} = pages[pages.length - 1];
        let options = {
            previousButton: this.getPrevious(),
            nextButton: this.getNext(),
            previousPage: current_page - 1,
            nextPage: current_page + 1,
            // Disable it if there are no pages or the current page is 1
            disablePreviousButton: (pages.length === 0 ||
                current_page === 1) ? 'disabled' : '',
            // Disable it if there are no pages or the current page is the last page
            disableNextButton: (pages.length === 0 ||
                last_page.page === current_page) ? 'disabled' : '',
            pages: pages,
            results: this.renderResults({
                results: mappedResults
            }),
            lastButton: '',
            firstButton: '',
            firstPage: 0,
            lastPage: 0,
            // Disable it if there are no pages or the current page is the last page
            disableLastButton: (pages.length === 0 ||
                last_page.page === current_page) ? 'disabled' : '',
            // Disable it if there are no pages or the current page is 1
            disableFirstButton: (pages.length === 0 ||
                current_page === 1) ? 'disabled' : '',
        };

        // Enable the quick navigation
        if (this.show_quick_pagination) {
            options.lastButton = this.getLast();
            options.firstButton = this.getFirst();
            options.firstPage = 1;
            options.lastPage = optional(last_page).page;
        }

        let rendered = Mustache.render(template, options);

        return document.createRange().createContextualFragment(rendered);
    }

    renderResults(options = {}) : string {
        let template = this.getResultTemplate();

        options = {
            ...options
        };

        return Mustache.render(template, options);
    }

    executeJS() {
        document.addEventListener(Events.onBeforeResultRequest, _debounce((e: CustomEvent) => {
            let autocompleteBars = this.client.widgets.autocompleteBar;
            let aggregationBars = this.client.widgets.aggregationBar;

            // Build the options for the search
            let buckets = autocompleteBars.reduce((res, bar: AutocompleteBar) => {
                if (!bar.useInResults) {
                    return res;
                }

                bar.buckets.forEach((bucket) => {
                    res.push(bucket);
                })

                return res;
            }, []);
            let autocompleteValues = autocompleteBars.reduce((res, bar: AutocompleteBar) => {
                if (!bar.useInResults) {
                    return res;
                }

                if (Object.keys(bar.value).length > 0) {
                    res.push(bar.value);
                }
                return res;
            }, []);
            let aggregationValues = aggregationBars.map((bar: AggregationBar) => {
                return bar.getValues();
            });

            e.detail.buckets = buckets;
            e.detail.search_values = {
                'fuzzy': [
                    ...[].concat.apply([], autocompleteValues),
                ],
                'match': [
                    ...[].concat.apply([], aggregationValues)
                ]
            };
            e.detail.extra_search_values = {};

            Events.emit(Events.onResultRequest, e.detail);
        }, 100));

        document.addEventListener(Events.onResultRequest, _debounce(async (e: CustomEvent) => {
            // If there is no page, assume we're on page 1
            let current_page = parseInt(URIHelper.getSearchParam('page')) || 1;
            // Perform the search
            let result = await this.client.search({
                buckets: e.detail.buckets,
                search: {
                    "should": {
                        ...e.detail.search_values
                    },
                    ...e.detail.extra_search_values
                },
                size: this.per_page,
                group_by: this.group_by,
                offset: (current_page - 1) * this.per_page
            });

            if (result && result.data) {
                e.detail.count = result.data.count;

                if (result.data.results) {
                    e.detail.pages = [];
                    // Add all the pages
                    for (let i = 0; i < Math.ceil(result.data.count / this.per_page); i++) {
                        e.detail.pages.push({
                            page: (i + 1),
                            offset: i * this.per_page,
                            active: ((i === 0 && !current_page) ||
                                current_page === (i + 1)) ? 'active' : ''
                        });
                    }
                    let total_pages = e.detail.pages.length;

                    // If there's more pages than the user wants to show start minifying
                    if (e.detail.pages.length > this.minify_pages) {
                        let start: number = 0;
                        let startArray: any = [];
                        let endArray: any = [];
                        let halfMinified = Math.ceil(this.minify_pages / 2);
                        let takeFull = false;

                        // Get the last page and add a separator
                        if (total_pages - halfMinified >= current_page) {
                            let last = e.detail.pages.pop();

                            // Separator
                            if (total_pages - halfMinified != current_page) {
                                endArray.push({
                                    page: '...',
                                    offset: 0,
                                    active: 'disabled'
                                });
                            }

                            endArray.push(last);
                        } else {
                            takeFull = true;
                        }

                        if (halfMinified < current_page) {
                            let first = e.detail.pages.shift();

                            startArray.push(first);

                            // If the minify pages is an uneven number add 1 to the half minified
                            if (this.minify_pages % 2 === 1) {
                                halfMinified++;
                            }

                            if (takeFull) {
                                let take = this.minify_pages;
                                // If the current page is the last page, minus one
                                if (current_page == total_pages) {
                                    current_page--;
                                }
                                // If the current page is the second to last page, take half instead of full
                                else if (current_page == (total_pages - 2)) {
                                    take = halfMinified;
                                }
                                start = current_page - take;
                            }
                            else {
                                start = current_page - halfMinified;
                            }

                            if (start > 0) {
                                // Separator
                                startArray.push({
                                    page: '...',
                                    offset: 0,
                                    active: 'disabled'
                                });
                            }
                        }

                        let items = e.detail.pages.splice(start, this.minify_pages);

                        e.detail.pages = [
                            ...items,
                        ]

                        if (startArray.length > 0) {
                            e.detail.pages.unshift(...startArray);
                        }

                        if (endArray.length > 0) {
                            e.detail.pages.push(...endArray);
                        }
                    }

                    e.detail.search_result = result.data.results;
                }

                if (result.data.aggs) {
                    Events.emit(Events.onAggsUpdate, result.data.aggs);
                }
            }

            Events.emit(Events.onAfterResultRequest, e.detail);
        }, 100));

        document.addEventListener(Events.onAfterResultRequest, (e: CustomEvent) => {
            // Render the node
            let node = this.render(e.detail.search_result, e.detail.pages);

            document.querySelectorAll(this.getEl()).forEach((element) => {
                let child = element.querySelector('.needletail-result');
                element.replaceChild(node.cloneNode(true), child);

                element.querySelectorAll('.needletail-result-pagination-page:not(.disabled):not(.active)').forEach((paginationElement) => {
                    // Add the click event
                    paginationElement.addEventListener('click', (e) => {
                        let pageNumber = paginationElement.getAttribute('data-page');
                        URIHelper.addToHistory('page', pageNumber);

                        Events.emit(Events.onBeforeResultRequest, {});
                    });
                });
            });
        });

        Events.emit(Events.onBeforeResultRequest, {});
    }
}
