export class Events {

    /**
     * Called when the grouped search bar is submitted
     */
    static onSubmitGroupedSearch: string = 'onSubmitGroupedSearch';
    /**
     * Called when the grouped search bar starts searching
     */
    static onGroupedSearch: string = 'onGroupedSearch';
    /**
     * Called before the grouped search bar starts searching
     */
    static onBeforeGroupedSearch: string = 'onBeforeGroupedSearch';
    /**
     * Called after the grouped search bar finishes searching
     */
    static onAfterGroupedSearch: string = 'onAfterGroupedSearch';
    /**
     * When the arrow up or down is pressed
     */
    static onArrowMovementGroupedSearch: string = 'onArrowMovementGroupedSearch';

    /**
     * Called when the autocomplete bar is submitted
     */
    static onSubmitSearch: string = 'onSubmitSearch';
    /**
     * Called when the autocomplete bar starts searching
     */
    static onSearch: string = 'onSearch';
    /**
     * Called before the autocomplete bar starts searching
     */
    static onBeforeSearch: string = 'onBeforeSearch';
    /**
     * Called after the autocomplete bar finishes searching
     */
    static onAfterSearch: string = 'onAfterSearch';
    /**
     * When the arrow up or down is pressed
     */
    static onArrowMovementSearch: string = 'onArrowMovementSearch';

    /**
     * When the result should be updated
     */
    static onResultRequest: string = 'onResultRequest';
    /**
     * Before the results are updated
     */
    static onBeforeResultRequest: string = 'onBeforeResultRequest';
    /**
     * After the results are updated
     */
    static onAfterResultRequest: string = 'onAfterResultRequest';

    /**
     * When any of the aggregations are updated
     */
    static onAggsUpdate: string = 'onAggsUpdate';

    /**
     * Emit a custom event to listen to
     * @param name
     * @param data
     */
    static emit(name: string, data: {} = {}) {
        let event = new CustomEvent(name, {
            "detail": data
        });

        document.dispatchEvent(event);
    }
}