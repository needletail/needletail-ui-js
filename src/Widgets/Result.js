import {
    Widget
} from './Widget';

export class Result extends Widget {
    /**
     * Construct a new Result instance.
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
     * Construct a result view.
     *
     * @returns  {void}
     */
    create() {
        this.query('search', {
            query: {},
            settings: {
                size: this.options.size,
                ...this.options.query_settings
            }
        }).then(res => {
            this.updateResult(
                Object.values(res.data.data),
                this.options.el
            );
        })
    }
}
