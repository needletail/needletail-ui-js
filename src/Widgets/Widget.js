import Mustache from 'mustache';
import {
    Bucket
} from '../Bucket';
import {
    convert_to_right_type
} from '../helpers';
import ResultTemplate from './../Templates/Result.html';
import {
    Aggregation
} from '../Models/Aggregation';

export class Widget {
    /**
     * Construct a new Widget instance.
     *
     * @param {Bucket} bucket
     */
    constructor(bucket) {
        this.bucket = bucket;

        this.needletail_response = {};

        this.pagination_page = this.getQueryString().page || 1;
    }

    /**
     * Query Needletail with a given endpoint and query body.
     *
     * @param   {*} endpoint
     * @param   {*} query
     * @returns {Object}
     */
    query(endpoint, query = {}) {
        const response = this.bucket[endpoint](query || {
            query: {},
        });

        response.then(res => {
            this.needletail_response = res.data;

            this.updateResult(res.data.data, this.bucket.registered_widgets.result.el);
        });

        return response;
    }

    /**
     * Render a new result view.
     *
     * @param   {Object} data
     * @param   {String} container
     * @returns {void}
     */
    updateResult(data, container) {
        const template = this.bucket.registered_widgets.result.template;

        if (this.bucket.hooks['before_update_result'])
            data = this.bucket.hooks['before_update_result'](data);

        let rendered = Mustache.render(ResultTemplate, {
            documents: data,
            result: function () {
                return function (text, render) {
                    return render(template);
                }
            }
        });

        document.querySelector(container).innerHTML = rendered;

        if (typeof jQuery == 'undefined' || !$.isFunction($.fn.pagination)) {
            console.warn('Include jQuery and simplePagination.js');

            return;
        }

        let prev_text = 'Prev';
        let next_text = 'Next';

        let pagination_settings = this.bucket.registered_widgets.result.pagination_settings;
        if (pagination_settings) {
            if (pagination_settings.previous)
                prev_text = pagination_settings.previous;

            if (pagination_settings.next)
                next_text = pagination_settings.next;
        }

        $('.needletail-result-pagination').pagination({
            items: this.needletail_response.total,
            itemsOnPage: this.bucket.registered_widgets.result.size,
            currentPage: this.pagination_page,
            hrefTextPrefix: 'javascript:void(',
            hrefTextSuffix: ')',
            prevText: prev_text,
            nextText: next_text,
            onPageClick: (page_number, event) => {
                let query = this.buildSearchQuery();

                if (this.bucket.hooks['before_search']) {
                    query = this.bucket.hooks['before_search'](query);
                }

                this.bucket.search({
                    query: query,
                    settings: {
                        from: (page_number - 1) * this.bucket.registered_widgets.result.size,
                        size: this.bucket.registered_widgets.result.size
                    }
                }).then(res => {
                    this.pagination_page = page_number;

                    this.updateQueryString({
                        page: page_number
                    })

                    this.updateResult(res.data.data, this.bucket.registered_widgets.result.el);
                })
            }
        })

        if (this.bucket.events['result_update'])
            this.bucket.events['result_update'](data);
    }

    /**
     * Update the query string so we can remember the state of the widgets.
     *
     * @param   {Object} values
     * @returns {void}
     */
    updateQueryString(values) {
        values = {
            ...this.getQueryString(),
            ...values
        };

        let query_string = window.location.pathname + '?';

        for (let [key, value] of Object.entries(values)) {
            if (value === 'none' || !value) continue;

            if (this.bucket.included_attributes.length > 0 && !this.bucket.included_attributes.includes(key)) continue;

            if (this.bucket.excluded_attributes.includes(key)) continue;

            if (typeof value === 'object')
                value = value.join('|');

            value = encodeURIComponent(value);

            query_string += `${key}=${value}&`;
        }

        history.pushState({}, document.title, encodeURI(query_string));
    }

    /**
     * Fetch the query string as a key-value object.
     *
     * @param   {String|null} parameter
     * @returns {Object}
     */
    getQueryString(parameter = null) {
        let query = {};

        if (window.location.search.replace('?', '')) {
            let query_parameters = window.location.search.replace('?', '').split('&');

            for (const parameter of query_parameters) {
                let [key, value] = parameter.split('=');

                if (!key || !value) continue;

                if (this.bucket.included_attributes.length > 0 && !this.bucket.included_attributes.includes(key)) continue;

                if (this.bucket.excluded_attributes.includes(key)) continue;

                value = decodeURIComponent(value);
                value = value.replace(/%20/g, ' ');
                value = decodeURIComponent(value);

                if (value.indexOf('|') !== -1) {
                    value = value.split('|').map(item => convert_to_right_type(item));
                }

                query[key] = convert_to_right_type(value);
            }
        }

        if (parameter) {
            return query[parameter] || null;
        }

        return query;
    }

    /**
     * Construct the query which will yield a result that will be shown in the Result view.
     *
     * @returns {Object}
     */
    buildSearchQuery() {
        let search_query = {};

        for (let [field, value] of Object.entries(this.getQueryString())) {
            if (field === 'page') continue;

            const options = this.bucket.registered_widgets.aggregations.attributes[field] || {};

            if (options.type !== 'range' && field !== '*') {
                field += '.raw';
            }

            search_query[field] = Aggregation.determineQuery(value, options);

            if (field === '*') {
                search_query[field] = search_query[field][0];
            }
        }

        if (this.bucket.scope) {
            for (let [key, scope] of Object.entries(this.bucket.scope)) {
                search_query[key] = scope;
            }
        }

        return search_query;
    }

    /**
     * Get the page on which the result widget is residing.
     *
     * @returns {int}
     */
    getPage() {
        const page_number = this.getQueryString('page') || 1;

        return (page_number - 1) * this.bucket.registered_widgets.result.size;
    }
}
