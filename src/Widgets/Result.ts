import {Widget} from './../Imports/BaseClasses';
import template from './../Html/result.html';
import resultTemplate from './../Html/result_results.html';
import resultSortSelect from './../Html/result_sort_select.html';
import Mustache from 'mustache';
// eslint-disable-next-line no-unused-vars
import {ResultSettings} from '../Imports/Interfaces';
import {Events, optional, URIHelper} from '../Imports/Helpers';
// eslint-disable-next-line no-unused-vars
import {AutocompleteBar} from './AutocompleteBar';
// eslint-disable-next-line no-unused-vars
import {AggregationBar} from './AggregationBar';
import _debounce from 'lodash/debounce';

export class Result extends Widget {
    /**
     * The template used for the result dropdown
     */
    discriminator: string = 'Result';
    /**
     * The amount of records to show per page
     */
    perPage: number = 10;
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
    showQuickPagination: boolean = false;
    /**
     * The amount of pages to show at the same time, this excludes the first and last page
     */
    minifyPages: number = 5;
    /**
     * The template to use for the results
     */
    resultTemplate: string;
    groupBy: string = '';
    sortBy: string = '';
    sortSelect: { [key: string]: string } = {};
    sortSelectTemplate: string;
    sortSelectDefault: string;
    sortDirection: string = 'asc';
    noResultMessage: string = 'No results where found';
    initialRequest: boolean = true;
    scrollOffset: number = 100;
    scrollBackToTop: boolean = true;
    buckets: [] = [];
    sortMode: string = 'min';
    allowedDirections: string[] = ['asc', 'desc'];

    constructor(options: ResultSettings = {}) {
        super(options);

        this.setPerPage(options.per_page || this.getPerPage());
        this.setPrevious(optional(options.pagination).previous || this.getPrevious());
        this.setNext(optional(options.pagination).next || this.getNext());
        this.setMinifyPages(options.minify_pages || this.getMinifyPages());
        this.setLast(optional(options.pagination).last || this.getLast());
        this.setFirst(optional(options.pagination).first || this.getFirst());
        this.setShowQuickPagination((typeof optional(options.pagination).show_quick_pagination !== 'undefined') ?
            options.pagination.show_quick_pagination : this.getShowQuickPagination());
        this.setScrollOffset(optional(options.pagination).scroll_offset || this.getScrollOffset());
        this.setScrollBackToTop((typeof optional(options.pagination).scroll_back_to_top !== 'undefined') ?
            options.pagination.scroll_back_to_top : this.getScrollBackToTop());
        this.setResultTemplate(options.result_template);
        this.setGroupBy(options.group_by || '');
        this.setSortBy(options.sort_by || '');
        this.setSortDirection(options.sort_direction || this.getSortDirection());
        this.setSortSelect(options.sort_select || {});
        this.setSortSelectDefault(options.sort_select_default || '');
        this.setSortMode(options.sort_mode || this.getSortMode());
        this.setNoResultMessage(options.no_result_message || this.getNoResultMessage());
        this.setBuckets(options.buckets || []);
    }

    setBuckets(buckets: []): Result {
        this.buckets = buckets;
        return this;
    }

    getBuckets(): [] {
        return this.buckets;
    }

    setScrollBackToTop(scrollBackToTop: boolean): Result {
        this.scrollBackToTop = scrollBackToTop;
        return this;
    }

    getScrollBackToTop(): boolean {
        return this.scrollBackToTop;
    }

    setScrollOffset(scrollOffset: number): Result {
        this.scrollOffset = scrollOffset;
        return this;
    }

    getScrollOffset(): number {
        return this.scrollOffset;
    }

    setPerPage(perPage: number): Result {
        this.perPage = perPage;
        return this;
    }

    getPerPage(): number {
        return this.perPage;
    }

    setShowQuickPagination(showQuickPagination: boolean): Result {
        this.showQuickPagination = showQuickPagination;
        return this;
    }

    getShowQuickPagination(): boolean {
        return this.showQuickPagination;
    }

    setMinifyPages(minifyPages: number): Result {
        this.minifyPages = minifyPages;
        return this;
    }

    getMinifyPages(): number {
        return this.minifyPages;
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
        if (this.resultTemplate) {
            return this.resultTemplate;
        }

        return resultTemplate;
    }

    setResultTemplate(template: string): Result {
        this.resultTemplate = template;
        return this;
    }

    setResultSortSelectTemplate(template: string): Result {
        this.sortSelectTemplate = template;
        return this;
    }

    getResultSortSelectTemplate(): string {
        if (this.sortSelectTemplate) {
            return this.sortSelectTemplate;
        }

        return resultSortSelect;
    }

    setFirst(first: string): Result {
        this.first = first;
        this.setShowQuickPagination(true);
        return this;
    }

    getFirst(): string {
        return this.first;
    }

    setLast(last: string): Result {
        this.last = last;
        this.setShowQuickPagination(true);
        return this;
    }

    getLast(): string {
        return this.last;
    }

    setGroupBy(groupBy: string): Result {
        this.groupBy = groupBy;
        return this;
    }

    getGroupBy(): string {
        return this.groupBy;
    }

    setSortBy(sortBy: string): Result {
        this.sortBy = sortBy;
        return this;
    }

    getSortBy(): string {
        return this.sortBy;
    }

    setSortMode(sortMode: string): Result {
        this.sortMode = sortMode;
        return this;
    }

    getSortMode(): string {
        return this.sortMode;
    }

    setSortDirection(sortDirection: string): Result {
        if (this.allowedDirections.indexOf(sortDirection) === -1) {
            sortDirection = 'asc';
        }

        this.sortDirection = sortDirection;
        return this;
    }

    getSortDirection(): string {
        return this.sortDirection;
    }

    setSortSelect(sortSelect: { [key: string]: string }): Result {
        this.sortSelect = sortSelect;
        return this;
    }

    getSortSelect(): { [key: string]: string } {
        return this.sortSelect;
    }

    setSortSelectDefault(sortSelectDefault: string): Result {
        this.sortSelectDefault = sortSelectDefault;
        return this;
    }

    getSortSelectDefault(): string {
        return this.sortSelectDefault;
    }

    setNoResultMessage(noResultMessage: string): Result {
        this.noResultMessage = noResultMessage;
        return this;
    }

    getNoResultMessage(): string {
        return this.noResultMessage;
    }

    render(results: {id: string, record: {}}[] = [], pages: {page: any, offset: number, active: string}[] = []): Node {
        const template = this.getTemplate();

        const mappedResults: {}[] = [];
        if (results) {
            Object.keys(results).forEach((key: any) => {
                mappedResults.push({
                    id: results[key].id,
                    ...results[key].record,
                });
            });
        }

        // If the page does not exist, assume we're on the first page
        const currentPage = parseInt(URIHelper.getSearchParam('page')) || 1;
        const lastPage: {page: any, offset: number, active: string} = pages[pages.length - 1];
        const options = {
            previousButton: this.getPrevious(),
            nextButton: this.getNext(),
            previousPage: currentPage - 1,
            nextPage: currentPage + 1,
            // Disable it if there are no pages or the current page is 1
            disablePreviousButton: (pages.length === 0 ||
                currentPage === 1) ? 'disabled' : '',
            // Disable it if there are no pages or the current page is the last page
            disableNextButton: (pages.length === 0 ||
                lastPage.page === currentPage) ? 'disabled' : '',
            pages: pages,
            results: this.renderResults({
                results: mappedResults,
                no_result_message: this.getNoResultMessage(),
            }),
            lastButton: '',
            firstButton: '',
            firstPage: 0,
            lastPage: 0,
            // Disable it if there are no pages or the current page is the last page
            disableLastButton: (pages.length === 0 ||
                lastPage.page === currentPage) ? 'disabled' : '',
            // Disable it if there are no pages or the current page is 1
            disableFirstButton: (pages.length === 0 ||
                currentPage === 1) ? 'disabled' : '',
            use_sort_select: (Object.keys(this.getSortSelect()).length > 0),
            sort_select: this.renderSortSelect({
                options: this.getSortSelect(),
            }),
        };

        // Enable the quick navigation
        if (this.getShowQuickPagination()) {
            options.lastButton = this.getLast();
            options.firstButton = this.getFirst();
            options.firstPage = 1;
            options.lastPage = optional(lastPage).page;
        }

        const rendered = Mustache.render(template, options);

        return document.createRange().createContextualFragment(rendered);
    }

    renderResults(options = {}) : string {
        const template = this.getResultTemplate();

        options = {
            ...options,
        };

        return Mustache.render(template, options);
    }

    renderSortSelect(options: {} = {}): string {
        const template = this.getResultSortSelectTemplate();

        options = {
            ...options,
        };

        return Mustache.render(template, options);
    }

    executeJS() {
        document.addEventListener(Events.onBeforeResultRequest, _debounce((e: CustomEvent) => {
            const autocompleteBars = this.client.widgets.autocompleteBar;
            const aggregationBars = this.client.widgets.aggregationBar;

            // Build the options for the search
            let buckets = autocompleteBars.reduce((res, bar: AutocompleteBar) => {
                if (!bar.getUseInResults()) {
                    return res;
                }

                bar.getBuckets().forEach((bucket) => {
                    res.push(bucket);
                });

                return res;
            }, []);

            buckets = buckets.concat(this.getBuckets());

            const autocompleteValues = autocompleteBars.reduce((res, bar: AutocompleteBar) => {
                if (!bar.getUseInResults()) {
                    return res;
                }

                if (Object.keys(bar.value).length > 0) {
                    res.push(bar.value);
                }
                return res;
            }, []);
            const aggregationValues = aggregationBars.map((bar: AggregationBar) => {
                return bar.getValues();
            });

            e.detail.buckets = buckets;
            e.detail.search_values = {
                'fuzzy': [
                    // eslint-disable-next-line prefer-spread
                    ...[].concat.apply([], autocompleteValues),
                ],
            };
            e.detail.equals_search_values = {
                'match': [
                    // eslint-disable-next-line prefer-spread
                    ...[].concat.apply([], aggregationValues),
                ],
            };
            e.detail.extra_search_values = {};

            Events.emit(Events.onResultRequest, e.detail);
        }, 100));

        document.addEventListener(Events.onResultRequest, _debounce(async (e: CustomEvent) => {
            // If there is no page, assume we're on page 1
            let currentPage = parseInt(URIHelper.getSearchParam('page')) || 1;
            // Perform the search
            const result = await this.client.search({
                buckets: e.detail.buckets,
                search: {
                    'should': {
                        ...e.detail.should_search_values,
                    },
                    'equals': {
                        ...e.detail.search_values,
                        ...e.detail.equals_search_values,
                    },
                    ...e.detail.extra_search_values,
                },
                size: this.getPerPage(),
                mode: this.getSortMode(),
                group_by: this.getGroupBy(),
                sort: this.getSortBy(),
                direction: this.getSortDirection(),
                offset: (currentPage - 1) * this.getPerPage(),
            });

            if (result && result.data) {
                e.detail.count = result.data.count;

                if (result.data.results) {
                    e.detail.pages = [];
                    // Add all the pages
                    for (let i = 0; i < Math.ceil(result.data.count / this.getPerPage()); i++) {
                        e.detail.pages.push({
                            page: (i + 1),
                            offset: i * this.getPerPage(),
                            active: ((i === 0 && !currentPage) ||
                                currentPage === (i + 1)) ? 'active' : '',
                        });
                    }
                    const totalPages = e.detail.pages.length;

                    // If there's more pages than the user wants to show start minifying
                    if (e.detail.pages.length > this.getMinifyPages()) {
                        let start: number = 0;
                        const startArray: any = [];
                        const endArray: any = [];
                        let halfMinified = Math.ceil(this.getMinifyPages() / 2);
                        let takeFull = false;

                        // Get the last page and add a separator
                        if (totalPages - halfMinified >= currentPage) {
                            const last = e.detail.pages.pop();

                            // Separator
                            if (totalPages - halfMinified != currentPage) {
                                endArray.push({
                                    page: '...',
                                    offset: 0,
                                    active: 'disabled',
                                });
                            }

                            endArray.push(last);
                        } else {
                            takeFull = true;
                        }

                        if (halfMinified < currentPage) {
                            const first = e.detail.pages.shift();

                            startArray.push(first);

                            // If the minify pages is an uneven number add 1 to the half minified
                            if (this.getMinifyPages() % 2 === 1) {
                                halfMinified++;
                            }

                            if (takeFull) {
                                let take = this.getMinifyPages();
                                // If the current page is the last page, minus one
                                if (currentPage == totalPages) {
                                    currentPage--;
                                // If the current page is the second to last page, take half instead of full
                                } else if (currentPage == (totalPages - 2)) {
                                    take = halfMinified;
                                }
                                start = currentPage - take;
                            } else {
                                start = currentPage - halfMinified;
                            }

                            if (start > 0) {
                                // Separator
                                startArray.push({
                                    page: '...',
                                    offset: 0,
                                    active: 'disabled',
                                });
                            }
                        }

                        const items = e.detail.pages.splice(start, this.getMinifyPages());

                        e.detail.pages = [
                            ...items,
                        ];

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

        document.addEventListener(Events.onPageChange, (e: CustomEvent) => {
            if (!this.initialRequest && this.getScrollBackToTop()) {
                const elements = document.querySelectorAll(this.getEl());
                if (elements.length === 1) {
                    const element: any = elements.item(0);
                    const position = element.offsetTop;
                    const offsetPosition = position - this.getScrollOffset();

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth',
                    });
                }
            }
        });

        document.addEventListener(Events.onAfterResultRequest, (e: CustomEvent) => {
            // Render the node
            const node = this.render(e.detail.search_result, e.detail.pages);

            document.querySelectorAll(this.getEl()).forEach((element) => {
                const child = element.querySelector('.needletail-result');
                element.replaceChild(node.cloneNode(true), child);

                element.querySelectorAll('.needletail-result-pagination-page:not(.disabled):not(.active)')
                    .forEach((paginationElement) => {
                        // Add the click event
                        paginationElement.addEventListener('click', (e) => {
                            const currentPage = URIHelper.getSearchParam('page');
                            const pageNumber = paginationElement.getAttribute('data-page');
                            URIHelper.addToHistory('page', pageNumber);

                            Events.emit(Events.onPageChange, {
                                current_page: currentPage,
                                new_page: pageNumber,
                            });
                            Events.emit(Events.onBeforeResultRequest, {});
                        });
                    });
            });

            const sortSelect: any = document.getElementsByClassName('needletail-sort-select');
            for (let i = 0; i < sortSelect.length; i++) {
                sortSelect[i].value = this.getSortSelectDefault();

                sortSelect[i].addEventListener('change', (e: any) => {
                    console.log(e.target.options[e.target.selectedIndex].getAttribute('data-direction') || 'asc');
                    this.setSortSelectDefault(e.target.value);
                    this.setSortBy(e.target.options[e.target.selectedIndex].getAttribute('data-attribute'));
                    this.setSortDirection(e.target.options[e.target.selectedIndex].getAttribute('data-direction') || 'asc');

                    Events.emit(Events.onBeforeResultRequest, {});
                });
            }

            this.initialRequest = false;
            Events.emit(Events.resultFinished, {
                name: this.discriminator,
            });
        });

        document.addEventListener(Events.onAggregationValueChange, (e) => {
            URIHelper.addToHistory('page', '1');
        });

        Events.emit(Events.onBeforeResultRequest, {});
    }
}
