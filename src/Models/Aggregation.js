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

        const attributes = Object.keys(options.attributes);

        let query = [];
        let filtered_query = {};

        for (let attr of attributes) {
            if (attr === '*') continue;

            for (let attribute of attributes) {
                if (attribute === 'page') continue;

                if (attribute !== attr && selected_values[attribute] !== 'none' && selected_values[attribute]) {
                    if (typeof filtered_query[attr] === 'undefined') {
                        filtered_query[attr] = {};
                    }

                    let field = attribute;

                    if (options.attributes[attribute].type !== 'range') {
                        field += '.raw';
                    }

                    let value = Aggregation.determineQuery(selected_values[attribute], options.attributes[attribute]);

                    if (attribute === '*') {
                        field = field.replace('.raw', '');

                        value = value[0];
                    }

                    if (options.attributes[attr].type === 'checkbox') {
                        if (typeof filtered_query[attr] === 'undefined' || typeof filtered_query[attr]['or'] === 'undefined') {
                            filtered_query[attr] = {
                                'or': []
                            };
                        }

                        filtered_query[attr]['or'].push({
                            query: {
                                [field]: value
                            }
                        })
                    } else {
                        filtered_query[attr][field] = value;
                    }
                }
            }
        }

        for (let attribute of attributes) {
            if (Object.keys(filtered_query).includes(attribute) || attribute === '*') continue;

            query.push(attribute);
        }

        if (Object.keys(filtered_query).length > 0) {
            query.push(filtered_query);
        }

        return query;
    }

    /**
     * Determine which query should be used, e.g. a normal query or ranged.
     *
     * @param   {String|Array} value
     * @param   {Object} options
     * @returns {Array|Object}
     */
    static determineQuery(value, options) {
        if (options.type === 'range') {
            let [from, to] = value;

            return {
                type: 'ranged',
                filter: [
                    `gte:${from}`, `lte:${to}`
                ]
            };
        }

        if (Array.isArray(value)) {
            return value;
        }

        return [value];
    }
}
