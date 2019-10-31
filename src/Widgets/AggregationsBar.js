import {
    Widget
} from './Widget';
import Mustache from 'mustache';
import {
    Client
} from '../Client';
import {
    convert_to_right_type
} from '../helpers';
import {
    Bucket
} from '../Bucket';
import {
    Aggregation
} from './../Models/Aggregation';
import AggregationsTemplate from './../Templates/AggregationsBar.html';

export class AggregationsBar extends Widget {
    /**
     * Construct a new AggregationsBar instance.
     *
     * @param {Bucket} bucket
     * @param {Object} options
     * @param {Function} callback
     */
    constructor(bucket, options, callback) {
        super(bucket);

        this.options = options;

        this.callback = callback;

        this.selected_values = {};

        this.replicateQueryString();
    }

    /**
     * Create the aggregation bar.
     *
     * @returns {void}
     */
    create() {
        this.updateBatchQuery();

        window.onpopstate = (e) => {
            this.replicateQueryString();

            this.updateBatchQuery();
        };
    }

    /**
     * Convert the query string to values in the aggregation bar.
     *
     * @returns {void}
     */
    replicateQueryString() {
        if (window.location.search.replace('?', '')) {
            for (const [key, value] of Object.entries(this.getQueryString())) {
                if (typeof this.options.attributes[key] === 'undefined') continue;

                this.selected_values[key] = convert_to_right_type(value);
            }
        } else {
            this.selected_values = {};
        }
    }

    /**
     * Listen to the radio boxes for changes. When a radio box is changed, run a query with that value.
     *
     * @returns {void}
     */
    setupListener() {
        const items = document.querySelectorAll('.needletail-aggregations-item-option');

        for (let item of items) {
            if (item.classList.contains('needletail-range-slider')) {
                $(item).on('slidechange', (e, ui) => {
                    let [from, to] = ui.values;

                    this.addSelectedValue(item, [from, to]);

                    $(`.needletail-range-from-${item.getAttribute('name')}`).text(from);
                    $(`.needletail-range-to-${item.getAttribute('name')}`).text(to);

                    this.updateBatchQuery(e);
                });
            } else {
                item.addEventListener('change', e => this.updateBatchQuery(e));
            }
        }
    }

    /**
     * Update and execute the batch query.
     *
     * @param   {Event|null} e
     * @returns {void}
     */
    updateBatchQuery(e = null, callback = null) {
        const needletail = new Client(this.bucket.read_key);

        if (e) {
            this.addSelectedValue(e.target);

            this.updateQueryString({
                page: null
            })
            this.pagination_page = 1;
        }

        let batch_query = [{
            bucket: this.bucket.getName(),
            action: 'aggregation',
            request: {
                query: Aggregation.assembleQuery(
                    this.getQueryString(),
                    this.options
                ),
                settings: this.options.settings || {}
            }
        }];

        if (this.bucket.registered_widgets.result) {
            batch_query.push({
                bucket: this.bucket.getName(),
                action: 'search',
                request: {
                    query: this.buildSearchQuery(),
                    settings: {
                        size: this.bucket.registered_widgets.result.size || 10
                    }
                }
            });
        }

        if (this.bucket.hooks['before_search']) {
            batch_query = this.bucket.hooks['before_search'](batch_query);
        }

        needletail.batch(batch_query, res => {
            const [aggregation, search] = res.data;

            this.needletail_response = search;

            delete window['INDEX'];

            this.updateAggregationBar(aggregation.data);

            if (search && search.data)
                this.updateResult(search.data, this.bucket.registered_widgets.result.el);

            if (callback) {
                callback(res.data);
            }
        });
    }

    /**
     * Add a value to the selected values array.
     *
     * @param   {*} element
     * @param   {*} value
     * @returns {void}
     */
    addSelectedValue(element, value = null) {
        let name = typeof element === 'string' ? element : element.getAttribute('name');
        let attribute = this.options.attributes[name];

        value = value || convert_to_right_type(element.value);

        if (!value)
            return;

        if (attribute.type && attribute.type === 'checkbox') {
            this.selected_values[name] = [];

            document.querySelectorAll(`input[type=checkbox][name="${name}"].needletail-aggregations-item-option`).forEach(option => {
                if (option.checked)
                    this.selected_values[name].push(convert_to_right_type(option.value));
            })

            if (value && typeof value === 'object' && value.length !== 0) {
                value.forEach(item => {
                    if (!this.selected_values[name].includes(item))
                        this.selected_values[name].push(item);
                })
            }

            if (this.selected_values[name].length === 0)
                this.selected_values[name] = null;
        } else {
            this.selected_values[name] = value;
        }

        this.updateQueryString(this.selected_values);

        // Remove the null values from the array.
        Object.keys(this.selected_values).forEach((key) => (this.selected_values[key] == null) && delete this.selected_values[key]);
    }

    /**
     * Render the mustache template for the aggregations bar.
     *
     * @param   {Object} data
     * @returns {void}
     */
    updateAggregationBar(data) {
        if (!data) return;

        let documents = [];
        let options = this.options;
        const attributes = Object.keys(options.attributes);

        for (let attribute of attributes) {
            let document = {
                selected_values: [],
                non_selected_values: []
            };

            for (const field of data[attribute]) {
                if (typeof this.selected_values[attribute] !== 'undefined' && this.selected_values[attribute].includes(field.value)) {
                    document.selected_values.push(field);
                } else {
                    document.non_selected_values.push(field);
                }
            }

            let sort = (a, b) => {
                if (a.value < b.value) {
                    return -1;
                }

                if (a.value > b.value) {
                    return 1;
                }

                return 0;
            };

            document.selected_values.sort(sort);
            document.non_selected_values.sort(sort);

            if (options.attributes[attribute].type && options.attributes[attribute].type === 'range') {
                document.selected_values = [];
                document.non_selected_values = [document.non_selected_values[0] || []];
            }

            documents.push(document);
        }

        delete window['ADDED_CLEAR_RADIO'];

        let mustache_config = {
            data: documents,
            title: function () {
                return function () {
                    let key = ++window['INDEX'] || (window['INDEX'] = 0);

                    let attribute = attributes[key];

                    return options.attributes[attribute].title || attribute;
                }
            },
            name: function () {
                return function () {
                    return attributes[window['INDEX']];
                }
            },
            input: function () {
                return function (text, render) {
                    let attribute_options = options.attributes[attributes[window['INDEX']]];
                    let value = attribute_options.template || `{{value}} - {{count}}`;

                    if (attribute_options.type && attribute_options.type === 'range') {
                        if (typeof jQuery == 'undefined' || typeof jQuery.ui == 'undefined' || typeof jQuery.ui.slider == 'undefined') {
                            console.warn('Include jQuery UI and the jQuery UI slider widget');

                            return;
                        }

                        return render(`
                            <div class="">
                                <span class="needletail-range-from needletail-range-from-{{#name}}{{/name}}">${attribute_options.range.min}</span>
                                <span class="needletail-range-to needletail-range-to-{{#name}}{{/name}}">${attribute_options.range.max}</span>
                                <div class="needletail-aggregations-item-option needletail-range-slider needletail-range-{{#name}}{{/name}}" name="{{#name}}{{/name}}"></div>
                            </div>
                        `);
                    } else if (attribute_options.type && attribute_options.type === 'checkbox') {
                        return render(`
                            {{#.}}
                                <div>
                                    <label>
                                        <input type="checkbox" name="{{#name}}{{/name}}" value="{{value}}" class="needletail-aggregations-item-option" /> <span class="needletail-aggregations-result-label">${value}</span>
                                    </label>
                                </div>
                            {{/.}}
                        `);
                    }

                    let fields = `
                        {{#.}}
                            <div>
                                <label>
                                    <input type="radio" name="{{#name}}{{/name}}" value="{{value}}" class="needletail-aggregations-item-option" /> <span class="needletail-aggregations-result-label">${value}</span>
                                </label>
                            </div>
                        {{/.}}
                    `;

                    if (!window['ADDED_CLEAR_RADIO']) {
                        fields = `
                            <div>
                                <label>
                                    <input type="radio" name="{{#name}}{{/name}}" checked value="none" class="needletail-aggregations-item-option" /> <span class="needletail-aggregations-result-label">None</span>
                                </label>
                            </div>` + fields;

                        window['ADDED_CLEAR_RADIO'] = 1;
                    }

                    return render(fields);
                }
            }
        };

        if (typeof this.options.mustache !== 'undefined') {
            mustache_config = {
                ...this.options.mustache,
                ...mustache_config
            }
        }

        let rendered = Mustache.render(AggregationsTemplate, mustache_config);

        document.querySelector(this.options.el).innerHTML = rendered;

        // Select values that were selected before the re-render.
        for (let value in this.selected_values) {
            if (typeof this.selected_values[value] === 'object') {
                for (let field in this.selected_values[value]) {
                    let el = document.querySelector(`.needletail-aggregations-item-option[name="${value}"][value="${this.selected_values[value][field]}"]`);

                    if (el)
                        el.checked = true;
                }
            } else {
                let el = document.querySelector(`.needletail-aggregations-item-option[name="${value}"][value="${this.selected_values[value]}"]`);

                if (el)
                    el.checked = true;
            }
        }

        for (let [key, attribute] of Object.entries(options.attributes)) {
            if (attribute.type && attribute.type === 'range') {
                let values = [attribute.range.min, attribute.range.max];
                let min = attribute.range.min;
                let max = attribute.range.max;

                if (this.selected_values && this.selected_values[key]) {
                    values = this.selected_values[key];
                }

                if (data && data[key]) {
                    let new_max_range = Math.max(data[key].filter(value => {
                        if (value.value === 'null' || value.value === 'NULL') return false;

                        return value;
                    }).map(value => convert_to_right_type(value.value)));

                    if (!new_max_range || typeof new_max_range === 'NaN') {
                        new_max_range = attribute.range.max;
                    }

                    max = new_max_range;

                    if (max < values[1]) {
                        values[1] = max;

                        if (this.selected_values[key])
                            this.addSelectedValue(key, values);
                    }
                }

                if ((values[0] === attribute.range.min && values[1] === attribute.range.max) || this.selected_values[key] === values) {
                    delete this.selected_values[key];

                    this.addSelectedValue(key);
                }

                $(`.needletail-range-slider.needletail-range-${key}`).slider({
                    range: true,
                    min: min,
                    max: max,
                    values: values,
                    slide: function (e, ui) {
                        $(`.needletail-range-from-${key}`).text(ui.values[0]);
                        $(`.needletail-range-to-${key}`).text(ui.values[1]);
                    }
                });

                $(`.needletail-range-from-${key}`).text(values[0]);
                $(`.needletail-range-to-${key}`).text(values[1]);
            }
        }

        this.setupListener();
    }
}
