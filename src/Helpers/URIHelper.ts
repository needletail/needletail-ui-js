export class URIHelper {
    /**
     * Add a variable to the URL without refreshing the page
     * @param name
     * @param value
     * @param deleteOnExist
     */
    static addToHistory(name: string, value: string, deleteOnExist: boolean = false) {
        const currentUrl = new URL(window.location.href);

        if (deleteOnExist && currentUrl.searchParams.has(name)) {
            let values = currentUrl.searchParams.getAll(name);
            let index = values.indexOf(value);

            if (index > -1) {
                currentUrl.searchParams.delete(name);

                delete values[index];
                values.forEach(v => currentUrl.searchParams.append(name, v));
            }
            else {
                currentUrl.searchParams.append(name, value);
            }
        }
        else {
            currentUrl.searchParams.delete(name);

            if (value) {
                currentUrl.searchParams.append(name, value);
            }
        }

        let query = currentUrl.searchParams.toString();
        query = (query) ? `?${query}` : currentUrl.pathname;

        history.pushState({}, document.title, query);
    }

    /**
     * Get a specific parameter from the url
     * @param name
     */
    static getSearchParam(name: string): string {
        const currentUrl = new URL(window.location.href);

        return currentUrl.searchParams.get(name);
    }

    /**
     * Get all parameters from the url
     * @param name
     */
    static getSearchParams(name: string): string[] {
        const currentUrl = new URL(window.location.href);

        return currentUrl.searchParams.getAll(name);
    }
}