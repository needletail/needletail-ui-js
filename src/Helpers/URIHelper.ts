export class URIHelper {
    static addToHistory(name: string, value: string, deleteOnExist: boolean = false) {
        const currentUrl = new URL(window.location.href);

        if (deleteOnExist && currentUrl.searchParams.has(name)) {
            const values = currentUrl.searchParams.getAll(name);
            const index = values.indexOf(String(value));

            if (index > -1) {
                currentUrl.searchParams.delete(name);

                delete values[index];
                values.forEach((v) => currentUrl.searchParams.append(name, v));
            } else {
                currentUrl.searchParams.append(name, value);
            }
        } else {
            currentUrl.searchParams.delete(name);

            if (value) {
                currentUrl.searchParams.append(name, value);
            }
        }

        let query = currentUrl.searchParams.toString();
        query = (query) ? `?${query}` : currentUrl.pathname;

        history.pushState({}, document.title, query);
    }

    static getSearchParam(name: string): string {
        const currentUrl = new URL(window.location.href);

        return currentUrl.searchParams.get(name);
    }

    static getSearchParams(name: string): string[] {
        const currentUrl = new URL(window.location.href);

        return currentUrl.searchParams.getAll(name);
    }
}
