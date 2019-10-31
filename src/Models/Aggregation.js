export class Aggregation {
    /**
     * Build the aggregations query, which will yield a result that will be shown in the Aggregations bar view.
     *
     * @returns {Array}
     */
    static assembleQuery(selected_values, original_options) {
        let options = Object.assign({}, original_options);

        options.attributes = {
            ...selected_values,
            ...original_options.attributes
        }

        let query = [];

        let filtered_aggregation = {};
        const attributes = Object.keys(options.attributes);

        for (let attr of attributes) {
            // if (!Object.keys(original_options.attributes).includes(attr)) continue;

            for (let attribute of attributes) {
                if (attribute === 'page') continue;

                if (attribute !== attr && selected_values[attribute] !== 'none' && selected_values[attribute]) {
                    if (!filtered_aggregation[attr]) {
                        filtered_aggregation[attr] = {};
                    }


                    filtered_aggregation[attr][attribute] = Aggregation.constructFilteredQuery(
                        selected_values[attribute], options.attributes[attribute]
                    );
                } else {
                    if (!Object.keys(selected_values).includes('*')) {
                        if (!filtered_aggregation[attr]) {
                            filtered_aggregation[attr] = {};
                        }

                        filtered_aggregation[attr]['*'] = '*';
                    }
                }
            }
        }

        if (Object.keys(filtered_aggregation).length !== 0) {
            query.push(filtered_aggregation);
        }

        return Aggregation.toLucene(query);
    }

    /**
     * Convert the assembled query to a lucene query which will be send to Needletail.
     *
     * @param   {Object} aggregation_query
     * @returns {String}
     */
    static toLucene(aggregation_query) {
        let query = [];

        for (const aggregation of aggregation_query) {
            // Only filtered aggregations need to be converted to lucene queries.
            if (typeof aggregation !== 'object') {
                query.push(aggregation);

                continue;
            }

            let lucene_query = {};

            for (const [field, filters] of Object.entries(aggregation)) {
                lucene_query[field] = [];

                for (const [field_filter, filter] of Object.entries(filters)) {
                    lucene_query[field].push(`${field_filter}:${filter}`);
                }

                lucene_query[field] = lucene_query[field].join(' AND ');
            }

            query.push(lucene_query);
        }

        return query.length === 0 ? {} : query;
    }

    /**
     * Construct a filtered query which will be appended to the entire query.
     *
     * @param   {*} value
     * @param   {Object} attribute
     * @returns {*}
     */
    static constructFilteredQuery(value, attribute) {
        let filtered_query = [];

        if (attribute.type && attribute.type === 'range') {
            let [from, to] = value;

            filtered_query = `[${from} TO ${to}]`;
        } else if (attribute.type && attribute.type === 'checkbox' && typeof value === 'object') {
            filtered_query = `("${value.join('" OR "')}")`;
        } else {
            filtered_query = `("${value}")`;
        }

        return filtered_query;
    }
}
