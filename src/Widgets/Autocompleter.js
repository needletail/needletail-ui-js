import {
    Widget
} from './Widget';
import Mustache from 'mustache';
import AutocompleterTemplate from './../Templates/Autocompleter.html';
import {
    Bucket
} from '../Bucket';

export class Autocompleter extends Widget {
    /**
     * Construct a new Autocompleter instance.
     *
     * @param {Bucket} bucket
     * @param {Object} options
     * @param {Function} callback
     */
    constructor(bucket, options, callback) {
        super(bucket);

        this.options = options;

        this.callback = callback;
    }

    /**
     * Create the search bar if the user didn't specify an input element.
     * Once done, set the event listener on the search field.
     *
     * @returns {void}
     */
    create() {
        this.updateAutocompleterView();

        let searchbar = document.querySelector(this.options.searchbar);

        searchbar.classList.toggle('needletail-searchbar');

        searchbar.setAttribute('autocomplete', 'off');
        searchbar.setAttribute('spellcheck', false);

        this.setEventListener(
            searchbar
        );

        let query_string = this.getQueryString();

        if (typeof query_string[this.options.query_parameter || this.options.attribute] !== 'undefined') {
            searchbar.value = query_string[this.options.query_parameter || this.options.attribute];

            searchbar.dispatchEvent(new Event('keyup'));
        }
    }

    /**
     * Set an event listener on the search bar. Each time the event is triggered
     * an API call will be made which will search for the given value.
     *
     * @param   {Object} searchbar
     * @returns {void}
     */
    setEventListener(searchbar) {
        let autocomplete = {
            'query': {},
            'settings': {
                'group_by': this.options.attribute,
                'list': [
                    this.options.attribute
                ]
            }
        };

        let selected_result = -1;
        let waiting = false;

        searchbar.addEventListener('keyup', (e) => {
            // Detect arrow up or arrow down key.
            if (e.which === 38 || e.which === 40) {
                let result_items = document.querySelectorAll('.needletail-search-result-item');

                if (selected_result >= 0)
                    result_items[selected_result].classList.remove('active');

                if (e.which === 38) {
                    selected_result--;

                    if (selected_result < 0)
                        selected_result = result_items.length - 1;
                } else {
                    selected_result++;

                    if (selected_result > (result_items.length - 1))
                        selected_result = 0;
                }

                result_items[selected_result].classList.add('active');

                return false;
            }

            // If the key that is currently is being pressed is either backspace or delete
            // and the searchbar is now empty, remove the autocomplete view.
            if ((e.which === 8 || e.which === 46) && searchbar.value === '') {
                this.updateAutocompleterView(null, true);

                this.updateQueryString({
                    [this.options.query_parameter || this.options.attribute]: searchbar.value
                });

                return false;
            }

            // Only perform a search when a character or backspace has been pressed.
            if (!String.fromCharCode(e.which).match(/(\w|\s)/g) && e.which !== 8 && e.which !== 46) {
                if (e.which === 27) this.updateAutocompleterView(null, true);

                return false;
            }

            if (e.which === 13) {
                if (selected_result !== -1) {
                    let result_item = document.querySelectorAll('.needletail-search-result-item')[selected_result];

                    searchbar.value = result_item.dataset.attribute;

                    this.updateQueryString({
                        [this.options.query_parameter || this.options.attribute]: searchbar.value
                    });
                }

                let aggregations_bar = this.bucket.registered_widgets.aggregations;

                if (typeof aggregations_bar !== 'undefined') {
                    aggregations_bar.instance.updateBatchQuery();
                } else {
                    this.query('search', {
                        query: this.buildSearchQuery()
                    })
                }

                return;
            }

            if (!waiting || !this.options.search_after) {
                waiting = true;

                setTimeout(() => {
                    waiting = false;

                    autocomplete['query'][this.options.attribute + '.autocomplete'] = {
                        'type': 'fuzzy',
                        'value': searchbar.value,
                        'highlighting': true
                    };

                    this.updateQueryString({
                        [this.options.query_parameter || this.options.attribute]: searchbar.value
                    });

                    if (this.bucket.scope) {
                        for (let [key, scope] of Object.entries(this.bucket.scope)) {
                            autocomplete['query'][key] = scope;
                        }
                    }

                    this.bucket.search(autocomplete, res => {
                        selected_result = -1;

                        this.updateAutocompleterView(res.data);
                    });
                }, this.options.search_after || 0);
            }

        })
    }

    /**
     * Render the mustache template for the autocompleter.
     *
     * @param   {Object|null} data
     * @param   {Boolean} clear_view
     * @returns {void}
     */
    updateAutocompleterView(data = null, clear_view = false) {
        let documents = null;
        let template = this.options.template;

        if (data) {
            documents = data.data.map(document => {
                return {
                    raw: document.document[this.options.attribute],
                    highlight: document.highlight[this.options.attribute + '.autocomplete'][0]
                };
            })
        }

        let rendered = Mustache.render(AutocompleterTemplate, {
            data: documents,
            total: data ? data.total : null,
            value: function () {
                return function (text, render) {
                    if (template) {
                        template = template.replace('{{value}}', '{{{highlight}}}');

                        return render(template);
                    }

                    return render(this);
                }
            }
        });

        let el = document.querySelector(this.options.el);

        if (documents) {
            el.innerHTML = rendered;

            this.setClickListener();
        }

        if (clear_view)
            el.innerHTML = '';
    }

    /**
     * Add a click listener to the search result items. When an item is clicked,
     * search for that item and update the result widget.
     *
     * @returns {void}
     */
    setClickListener() {
        let searchbar = document.querySelector(this.options.searchbar);
        let result_items = document.querySelectorAll('.needletail-search-result-item');

        for (let item of result_items) {
            item.addEventListener('click', (e) => {
                searchbar.value = item.dataset.attribute;

                this.updateQueryString({
                    [this.options.query_parameter || this.options.attribute]: searchbar.value
                });

                let aggregations_bar = this.bucket.registered_widgets.aggregations;

                if (typeof aggregations_bar !== 'undefined') {
                    aggregations_bar.instance.updateBatchQuery();
                } else {
                    this.query('search', {
                        query: this.buildSearchQuery()
                    })
                }
            });
        }
    }
}
