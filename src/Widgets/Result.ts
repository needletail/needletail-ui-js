import {Widget} from './../Imports/BaseClasses';
import template from './../Html/result.html';
import resultTemplate from './../Html/result_results.html';
import resultSortSelect from './../Html/result_sort_select.html';
import resultSkeletonTemplate from './../Html/Skeletons/result.html';
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
    // eslint-disable-next-line camelcase
    sortSelect: { [key: string]: {name: string, display_name: string, attribute: string, direction: string} } = {};
    sortSelectTemplate: string;
    sortSelectDefault: string;
    sortDirection: string = '';
    noResultMessage: string = 'No results where found';
    initialRequest: boolean = true;
    scrollOffset: number = 100;
    scrollBackToTop: boolean = true;
    buckets: [] = [];
    sortMode: string = 'min';
    allowedDirections: string[] = ['asc', 'desc'];
    activeClass: string = 'active';
    hideOnSinglePage: boolean = true;
    hidePagination: boolean = false;
    query: string = 'result';
    infiniteScroll: boolean = false;
    infinityPage: number = 1;
    hardReset: boolean = false;
    totalPages: number = 1;
    bottomScrollOffset: number = 0;
    loader: string = null;
    allowedLoaders: string[] = ['round-dots', 'round-line', 'straight-bars', 'straight-dots'];
    totalResults: number = 0;
    totalResultsText: string = ':count total results';
    extraOptions: {} = {};
    useSkeleton: boolean = false;
    resultSkeletonTemplate: string;

    constructor(options: ResultSettings = {}) {
        super(options);

        this.setQuery(options.query || this.getQuery());
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
        this.setHideOnSinglePage((typeof optional(options.pagination).hide_on_single_page !== 'undefined') ?
            options.pagination.hide_on_single_page : this.getHideOnSinglePage());
        this.setResultTemplate(options.result_template);
        this.setGroupBy(options.group_by || '');
        this.setSortSelect(options.sort_select || {});
        this.setSortSelectDefault(URIHelper.getSearchParam('default') || options.sort_select_default || '');
        this.setSortBy(URIHelper.getSearchParam('sort') || options.sort_by || '');
        this.setSortDirection(URIHelper.getSearchParam('direction') || options.sort_direction || this.getSortDirection());
        this.setSortMode(options.sort_mode || this.getSortMode());
        this.setNoResultMessage(options.no_result_message || this.getNoResultMessage());
        this.setBuckets(options.buckets || []);
        this.setPaginationActiveClass(optional(options.pagination).active_class || this.getPaginationActiveClass());
        this.setInfiniteScroll(optional(options.pagination).infinite_scroll || this.getInfiniteScroll());
        this.setBottomScrollOffset(optional(options.pagination).bottom_scroll_offset || this.getBottomScrollOffset());
        this.setLoader(options.loader || this.getLoader());
        this.setTotalResultsText(options.total_results_text || this.getTotalResultsText());
        this.setExtraOptions(options.extra_options || {});
        this.setUseSkeleton((typeof optional(options).use_skeleton !== 'undefined') ?
            optional(options).use_skeleton : this.getUseSkeleton());
        this.setResultSkeletonTemplate(optional(options).skeleton_template || this.getResultSkeletonTemplate());
    }

    getUseSkeleton(): boolean {
        return this.useSkeleton;
    }

    setUseSkeleton(useSkeleton: boolean): Result {
        this.useSkeleton = useSkeleton;
        return this;
    }

    getResultSkeletonTemplate(): string {
        if (this.resultSkeletonTemplate) {
            return this.resultSkeletonTemplate;
        }

        return resultSkeletonTemplate;
    }

    setResultSkeletonTemplate(template: string): Result {
        this.resultSkeletonTemplate = template;
        return this;
    }

    getQuery(): string {
        return this.query;
    }

    setQuery(query: string): Result {
        this.query = query;
        return this;
    }

    getTotalResults(): number {
        return this.totalResults;
    }

    setTotalResults(totalResults: number): Result {
        this.totalResults = totalResults;
        return this;
    }

    getTotalResultsText(): string {
        const count = this.getTotalResults() ?? 0;
        let copy = this.totalResultsText;

        copy = copy.replace(/:count/ig, count.toString());
        const split = copy.split('|');

        if (split.length === 0) {
            return copy;
        }
        const singleRegex = /^{(\d+)} (.+)/;
        const multiRegex = /^\[(\d+),(\d+|\*)] (.+)/;
        let final = copy;

        split.forEach((s: string) => {
            const singleMatch = singleRegex.exec(s);
            if (singleMatch) {
                if (count === parseInt(singleMatch[1])) {
                    final = singleMatch[2];
                }
            }

            const multiMatch = multiRegex.exec(s);
            if (multiMatch) {
                let infinite = false;
                if (multiMatch[2] === '*') {
                    infinite = true;
                }

                if (count >= parseInt(multiMatch[1]) && (
                    count <= parseInt(multiMatch[2]) || infinite
                )) {
                    final = multiMatch[3];
                }
            }
        });

        return final;
    }

    setTotalResultsText(totalResultsText: string): Result {
        this.totalResultsText = totalResultsText;
        return this;
    }

    getInfiniteScroll(): boolean {
        return this.infiniteScroll;
    }

    setInfiniteScroll(infiniteScroll: boolean): Result {
        this.infiniteScroll = infiniteScroll;
        return this;
    }

    getBottomScrollOffset(): number {
        return this.bottomScrollOffset;
    }

    setBottomScrollOffset(bottomScrollOffset: number): Result {
        this.bottomScrollOffset = bottomScrollOffset;
        return this;
    }

    getLoader(): string {
        return this.loader;
    }

    setLoader(loader: string): Result {
        if (this.allowedLoaders.indexOf(loader) !== -1) {
            this.loader = loader;
        }
        return this;
    }

    setHideOnSinglePage(hideOnSinglePage: boolean): Result {
        this.hideOnSinglePage = hideOnSinglePage;
        return this;
    }

    getHideOnSinglePage(): boolean {
        return this.hideOnSinglePage;
    }

    setPaginationActiveClass(activeClass: string): Result {
        this.activeClass = activeClass;
        return this;
    }

    getPaginationActiveClass(): string {
        return this.activeClass;
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
        if (sortBy === '' && (Object.keys(this.getSortSelect()).length > 0)) {
            for (const key in this.getSortSelect()) {
                if (this.getSortSelect()[key].name === this.getSortSelectDefault()) {
                    sortBy = this.getSortSelect()[key].attribute || '';
                }
            }
        }

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
        if (sortDirection === '' && (Object.keys(this.getSortSelect()).length > 0)) {
            for (const key in this.getSortSelect()) {
                if (this.getSortSelect()[key].name === this.getSortSelectDefault()) {
                    sortDirection = this.getSortSelect()[key].direction || '';
                }
            }
        }

        if (this.allowedDirections.indexOf(sortDirection) === -1) {
            sortDirection = 'asc';
        }

        this.sortDirection = sortDirection;
        return this;
    }

    getSortDirection(): string {
        return this.sortDirection;
    }

    // eslint-disable-next-line max-len,camelcase
    setSortSelect(sortSelect: { [key: string]: {name: string, display_name: string, attribute: string, direction: string} }): Result {
        this.sortSelect = sortSelect;
        return this;
    }

    // eslint-disable-next-line camelcase
    getSortSelect(): { [key: string]: {name: string, display_name: string, attribute: string, direction: string} } {
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

    setExtraOptions(options: {}): Result {
        this.extraOptions = options;
        return this;
    }

    getExtraOptions(): {} {
        return this.extraOptions;
    }

    renderResultSkeleton(): Node {
        const options = {
            records: new Array(this.getPerPage()).fill(null),
        };

        const rendered = Mustache.render(this.getResultSkeletonTemplate(), options);

        return document.createRange().createContextualFragment(rendered);
    }

    // eslint-disable-next-line max-len
    render(results: {id: string, record: {}}[] = [], pages: {page: any, offset: number, active: string}[] = [], firstRender = true): Node {
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
            previous_button: this.getPrevious(),
            next_button: this.getNext(),
            previous_page: currentPage - 1,
            next_page: currentPage + 1,
            // Disable it if there are no pages or the current page is 1
            disable_previous_button: (pages.length === 0 ||
                currentPage === 1) ? 'disabled' : '',
            // Disable it if there are no pages or the current page is the last page
            disable_next_button: (pages.length === 0 ||
                lastPage.page === currentPage) ? 'disabled' : '',
            pages: pages,
            results: this.renderResults({
                results: mappedResults,
                no_result_message: this.getNoResultMessage(),
            }),
            last_button: '',
            first_button: '',
            first_page: 0,
            last_page: 0,
            // Disable it if there are no pages or the current page is the last page
            disable_last_button: (pages.length === 0 ||
                lastPage.page === currentPage) ? 'disabled' : '',
            // Disable it if there are no pages or the current page is 1
            disable_first_button: (pages.length === 0 ||
                currentPage === 1) ? 'disabled' : '',
            use_sort_select: (Object.keys(this.getSortSelect()).length > 0),
            sort_select: this.renderSortSelect({
                options: this.getSortSelect(),
            }),
            hide_pagination: (this.hidePagination || this.getInfiniteScroll()) ? 'needletail-hidden' : '',
            hide_on_initial_request: (firstRender) ? 'needletail-hide-on-initial-request' : '',
            infinite_scroll: this.getInfiniteScroll(),
            total_results: this.getTotalResults(),
            total_results_text: this.getTotalResultsText(),
            extra_options: this.getExtraOptions(),
        };

        // Enable the quick navigation
        if (this.getShowQuickPagination()) {
            options.last_button = this.getLast();
            options.first_button = this.getFirst();
            options.first_page = 1;
            options.last_page = optional(lastPage).page;
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
            if (!e.detail.query) {
                e.detail.query = this.getQuery();
            }

            if (this.getUseSkeleton()) {
                const skeletonNode: Node = this.renderResultSkeleton();
                document.querySelectorAll(this.getEl()).forEach((element) => {
                    const child = element.querySelector('.needletail-result');

                    element.replaceChild(skeletonNode.cloneNode(true), child);
                });
            }

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
                    if (typeof bar.value.field === 'string') {
                        res.push(bar.value);
                    } else {
                        bar.value.field.forEach((field: any) => {
                            res.push({
                                field: field,
                                value: bar.value.value,
                            });
                        });
                    }
                }
                return res;
            }, []);
            const aggregationValues = aggregationBars.map((bar: AggregationBar) => {
                return bar.getValues();
            });

            e.detail.buckets = buckets;
            e.detail.search_values = {};
            e.detail.equals_search_values = {
                'match': [
                    // eslint-disable-next-line prefer-spread
                    ...[].concat.apply([], aggregationValues),
                ],
            };
            e.detail.extra_search_values = {};
            e.detail.should_search_values = {
                'fuzzy': [
                    // eslint-disable-next-line prefer-spread
                    ...[].concat.apply([], autocompleteValues),
                ],
            };

            Events.emit(Events.onResultRequest, e.detail);
        }, 100));

        document.addEventListener(Events.onResultRequest, _debounce(async (e: CustomEvent) => {
            let currentPage = 1;
            let size = this.getPerPage();
            let offset;

            if (this.initialRequest) {
                this.infinityPage = parseInt(URIHelper.getSearchParam('page')) || 1;
            }

            if (this.getInfiniteScroll()) {
                currentPage = this.infinityPage;
                offset = (currentPage - 1) * this.getPerPage();

                if (this.initialRequest) {
                    size *= currentPage;
                    offset = 0;
                }
            } else {
                // If there is no page, assume we're on page 1
                currentPage = parseInt(URIHelper.getSearchParam('page')) || 1;
                offset = (currentPage - 1) * this.getPerPage();
            }

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
                size: size,
                mode: this.getSortMode(),
                group_by: this.getGroupBy(),
                sort: this.getSortBy(),
                direction: this.getSortDirection(),
                offset: offset,
            });

            e.detail.status = result.status;

            if (result && result.data) {
                e.detail.count = result.data.count;
                this.setTotalResults(e.detail.count);

                if (result.data.results) {
                    e.detail.pages = [];
                    // Add all the pages
                    for (let i = 0; i < Math.ceil(result.data.count / this.getPerPage()); i++) {
                        e.detail.pages.push({
                            page: (i + 1),
                            offset: i * this.getPerPage(),
                            active: ((i === 0 && !currentPage) ||
                                currentPage === (i + 1)) ? this.getPaginationActiveClass() : '',
                        });
                    }
                    const totalPages = e.detail.pages.length;
                    this.totalPages = totalPages;

                    if (totalPages === 1 && this.getHideOnSinglePage()) {
                        this.hidePagination = true;
                    } else {
                        this.hidePagination = false;
                    }

                    // If there's more pages than the user wants to show start minifying
                    if (totalPages > this.getMinifyPages()) {
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
            const node: Node = this.render(e.detail.search_result, e.detail.pages, false);

            document.querySelectorAll(this.getEl()).forEach((element) => {
                const child = element.querySelector('.needletail-result');

                if (this.getInfiniteScroll()) {
                    const lastItems = child.querySelectorAll('.needletail-result-result');
                    const lastItem = lastItems[lastItems.length - 1];

                    if (lastItem && !this.hardReset) {
                        let resultChild: Node;

                        node.childNodes.forEach((childNode: HTMLElement) => {
                            if (childNode.classList &&
                                childNode.classList.contains('needletail-result') &&
                                !resultChild) {
                                resultChild = childNode.querySelector('.needletail-result-results');
                            }
                        });
                        lastItem.after(...resultChild.childNodes);
                    } else {
                        element.replaceChild(node.cloneNode(true), child);
                        this.hardReset = false;
                    }
                } else {
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
                                Events.emit(Events.onBeforeResultRequest, {
                                    query: this.getQuery(),
                                });
                            });
                        });
                }
            });

            const sortSelect: any = document.getElementsByClassName('needletail-sort-select');
            for (let i = 0; i < sortSelect.length; i++) {
                sortSelect[i].value = this.getSortSelectDefault();

                sortSelect[i].addEventListener('change', (e: any) => {
                    this.setSortSelectDefault(e.target.value);
                    this.setSortBy(e.target.options[e.target.selectedIndex].getAttribute('data-attribute'));
                    this.setSortDirection(e.target.options[e.target.selectedIndex].getAttribute('data-direction') || 'asc');
                    URIHelper.addToHistory('page', '1');
                    URIHelper.addToHistory('direction', this.getSortDirection());
                    URIHelper.addToHistory('sort', this.getSortBy());
                    URIHelper.addToHistory('default', this.getSortSelectDefault());
                    this.infinityPage = 1;
                    this.hardReset = true;

                    Events.emit(Events.onBeforeResultRequest, {
                        query: this.getQuery(),
                    });
                });
            }

            const elements = document.querySelectorAll('.needletail-result-result');
            elements.forEach((element, index) => {
                element.addEventListener('click', (e: any) => {
                    URIHelper.addToHistory('index', index.toString());
                });
            });

            if (this.initialRequest) {
                const element: any = elements.item(parseInt(URIHelper.getSearchParam('index')));
                if (element) {
                    const position = element.offsetTop;
                    const offsetPosition = position - this.getScrollOffset();

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: this.getInfiniteScroll() ? 'smooth' : 'auto',
                    });
                }
            }

            this.stopLoader('infinity-scroll');

            this.initialRequest = false;
            Events.emit(Events.resultFinished, {
                name: this.discriminator,
            });
        });

        if (this.getInfiniteScroll()) {
            window.addEventListener('scroll', _debounce(() => {
                const {
                    scrollTop,
                    scrollHeight,
                    clientHeight,
                } = document.documentElement;

                if (scrollTop + clientHeight >= scrollHeight - this.getBottomScrollOffset() &&
                    this.totalPages >= this.infinityPage + 1) {
                    this.infinityPage++;
                    URIHelper.addToHistory('page', this.infinityPage.toString());

                    this.startLoader('infinity-scroll');
                    Events.emit(Events.onBeforeResultRequest, {
                        query: this.getQuery(),
                    });
                }
            }, 200));
        }

        document.addEventListener(Events.onAggregationValueChange, (e) => {
            if (!this.initialRequest) {
                URIHelper.addToHistory('page', '1');
                this.infinityPage = 1;
                this.hardReset = true;
            }
        });

        Events.emit(Events.onBeforeResultRequest, {
            query: this.getQuery(),
        });
    }

    startLoader(name: string) {
        if (this.getLoader()) {
            const loaders = document.querySelectorAll(`.needletail-loader.${name}`);
            loaders.forEach((loader) => {
                loader.classList.add(`needletail-loader-${this.getLoader()}`);
            });
        }
    }

    stopLoader(name: string) {
        const loaders = document.querySelectorAll(`.needletail-loader.${name}`);
        loaders.forEach((loader) => {
            loader.classList.remove(`needletail-loader-${this.getLoader()}`);
        });
    }
}
