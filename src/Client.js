import {
    Bucket
} from './Bucket';
import Mustache from 'mustache';
import GroupedSearch from './Templates/GroupedSearch.html';
import {
    Client as NeedletailClient
} from 'needletail-js';

class Client extends NeedletailClient {
    /**
     * Create a new Client instance.
     *
     * @param read_key
     */
    constructor(read_key) {
        super(read_key);

        this.hooks = {};

        this.events = {};
    }

    /**
     * Initialize a new bucket.
     *
     * @param  {String} bucket_name
     * @return {Bucket}
     */
    initBucket(bucket_name) {
        return new Bucket(
            bucket_name,
            this.read_key
        );
    }

    /**
     * Register the on before grouped search hook.
     *
     * @param   {Function} calback
     * @returns {void}
     */
    onBeforeGroupedSearch(callback) {
        this.hooks['before_grouped_search'] = callback;
    }

    /**
     * Register the on after grouped search event.
     *
     * @param   {Function} calback
     * @returns {void}
     */
    onAfterGroupedSearch(callback) {
        this.events['after_grouped_search'] = callback;
    }

    /**
     * Construct the grouped search bar and listen for any input changes.
     *
     * @param   {Object} options
     * @returns {void}
     */
    createGroupedSearchBar(options) {
        let requests = options.groups;
        let searchbar = document.querySelector(options.searchbar);
        let waiting = false;

        searchbar.classList.toggle('needletail-searchbar');

        searchbar.setAttribute('autocomplete', 'off');
        searchbar.setAttribute('spellcheck', false);

        let selected_result = -1;

        document.querySelector('body').addEventListener('click', (e) => {
            if (!document.querySelector(options.el).contains(e.target) && !document.querySelector(options.searchbar).contains(e.target))
                this.updateGroupedSearchBar(options, null, true);
        });

        searchbar.addEventListener('keyup', (e) => {
            // Detect arrow up or arrow down key.
            if (e.which === 38 || e.which === 40) {
                let result_items = document.querySelectorAll('.needletail-grouped-search-result-item');

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
            }

            if (e.which === 27) {
                this.updateGroupedSearchBar(options, null, true);
            }
        });

        searchbar.addEventListener('input', (e) => {
            // If the key that is currently is being pressed is either backspace or delete
            // and the searchbar is now empty, remove the autocomplete view.
            if (searchbar.value === '') {
                this.updateGroupedSearchBar(options, null, true);

                return false;
            }

            if (!waiting || !options.search_after) {
                waiting = true;

                setTimeout(() => {
                    waiting = false;

                    let batch = [];

                    let query = {
                        value: e.target.value
                    };

                    for (let request of requests) {
                        batch.push({
                            bucket: request.bucket,
                            action: 'search',
                            request: {
                                query: {
                                    [request.attribute]: {
                                        ...query,
                                        ...request.query_settings
                                    }
                                },
                                settings: request.settings || {}
                            }
                        })
                    }

                    if (this.hooks['before_grouped_search']) {
                        batch = this.hooks['before_grouped_search'](batch);
                    }


                    this.batch(batch, res => {
                        if (this.events['after_grouped_search']) {
                            this.events['after_grouped_search'](res.data);
                        }

                        let i = 0;
                        let data = [];

                        for (let request of requests) {
                            if (!res.data[i].data)
                                continue;

                            let documents = res.data[i].data.map(document => {
                                if (document.highlight)
                                    document.document['highlight'] = Object.values(document.highlight)[0][0];

                                return document.document;
                            });

                            data.push({
                                bucket: request.heading,
                                attribute: request.attribute,
                                total: documents.length,
                                documents: documents,
                                highlight: res.data[i].highlight,
                                fallback: request.fallback || false
                            });

                            i++;
                        }

                        delete window['INDEX'];

                        this.updateGroupedSearchBar(options, data);
                    });
                }, options.search_after || 0);
            }
        });
    }

    /**
     * Render the mustache template for the grouped search view.
     *
     * @param   {Object} options
     * @param   {Object|null} data
     * @param   {Boolean} clear_view
     * @returns {void}
     */
    updateGroupedSearchBar(options, data = null, clear_view = false) {
        let rendered = Mustache.render(GroupedSearch, {
            data: data,
            field: function () {
                return function (attribute, render) {
                    if (options.groups[window['INDEX']].template) {
                        return render(options.groups[window['INDEX']].template);
                    }

                    return this[render(attribute)];
                }
            },
            index: function () {
                ++window['INDEX'] || (window['INDEX'] = 0)
            },
            group: function () {
                return options.groups[window['INDEX']].group_class || '';
            }
        });

        document.querySelector(options.el).innerHTML = rendered;

        if (clear_view)
            document.querySelector(options.el).innerHTML = '';
    }
}

export {
    Client
}
