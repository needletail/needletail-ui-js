import {
    Bucket as NeedletailBucket
} from 'needletail-js';
import {
    Autocompleter
} from './Widgets/Autocompleter';
import {
    AggregationsBar
} from './Widgets/AggregationsBar';
import {
    Result
} from './Widgets/Result';
import {
    Widget
} from './Widgets/Widget';

export class Bucket extends NeedletailBucket {
    /**
     * Create a new Bucket.
     *
     * @param  {String} name
     * @param  {String} read_key
     */
    constructor(name, read_key) {
        super(name, read_key);

        this.hooks = {};

        this.events = {};

        this.included_attributes = [];

        this.excluded_attributes = [];

        this.registered_widgets = {};
    }

    /**
     * Build a search-as-you-type bar with highlighting.
     *
     * @param   {Object} options
     * @param   {Function} callback
     * @returns {void}
     */
    createAutocompletebar(options, callback) {
        const autocompleter = new Autocompleter(this, options, callback);

        this.registered_widgets['autocomplete'] = {
            instance: autocompleter,
            ...options
        };

        autocompleter.create();
    }

    /**
     * Build an aggregation bar.
     *
     * @param   {Object} options
     * @param   {Function} callback
     * @returns {void}
     */
    createAggregationsBar(options, callback) {
        const aggregations_bar = new AggregationsBar(this, options, callback);

        this.registered_widgets['aggregations'] = {
            instance: aggregations_bar,
            ...options
        };

        aggregations_bar.create();
    }

    /**
     * Build a result view where the result of all queries will be shown.
     *
     * @param   {Object} options
     * @param   {Function} callback
     * @returns {void}
     */
    createResult(options, callback) {
        const result = new Result(this, options, callback);

        this.registered_widgets['result'] = {
            instance: result,
            ...options
        };

        result.create();
    }

    /**
     * Update the query string with a key and value.
     *
     * @param   {String} key
     * @param   {*} value
     * @returns {void}
     */
    updateQueryString(key, value) {
        const widget = new Widget(this);

        widget.updateQueryString({
            [key]: value
        });
    }

    /**
     * Set the included attributes.
     *
     * @param   {Array} included_attributes
     * @returns {void}
     */
    setIncludedAttributes(included_attributes) {
        this.included_attributes = included_attributes;
    }

    /**
     * Set the excluded attributes.
     *
     * @param   {Array} excluded_attributes
     * @returns {void}
     */
    setExcludedAttributes(excluded_attributes) {
        this.excluded_attributes = excluded_attributes;
    }

    /**
     * Refresh the result widget and aggregations widget.
     *
     * @param   {Function} callback
     * @returns {void}
     */
    triggerSearch(callback) {
        this.registered_widgets.aggregations.instance.updateBatchQuery(null, callback);
    }

    /**
     * Register the on update result event.
     *
     * @param   {Function} callback
     * @returns {void}
     */
    onUpdateResult(callback) {
        this.events['result_update'] = callback;
    }

    /**
     * Register the on before search hook.
     *
     * @param   {Function} callback
     * @returns {void}
     */
    onBeforeSearch(callback) {
        this.hooks['before_search'] = callback;
    }

    /**
     * Register the on before update result hook.
     *
     * @param   {Function} callback
     * @returns {void}
     */
    onBeforeUpdateResult(callback) {
        this.hooks['before_update_result'] = callback;
    }
}
