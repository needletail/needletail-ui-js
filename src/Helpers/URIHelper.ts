function readParamValues(currentUrl: URL, name: string): string[] {
    const values: string[] = [];

    currentUrl.searchParams.getAll(name).forEach((value: string) => {
        value.split(',').forEach((part: string) => {
            if (part !== '') {
                values.push(part);
            }
        });
    });

    return values;
}

export class URIHelper {
    static addToHistory(name: string, value: string, deleteOnExist: boolean = false) {
        const currentUrl = new URL(window.location.href);

        if (deleteOnExist && currentUrl.searchParams.has(name)) {
            const values = readParamValues(currentUrl, name);
            const index = values.indexOf(String(value));

            if (index > -1) {
                values.splice(index, 1);
            } else {
                values.push(String(value));
            }

            currentUrl.searchParams.delete(name);

            if (values.length > 0) {
                currentUrl.searchParams.set(name, values.join(','));
            }
        } else {
            currentUrl.searchParams.delete(name);

            if (value) {
                currentUrl.searchParams.append(name, value);
            }
        }

        // URLSearchParams encodes a comma as %2C. Keep the comma readable.
        let query = currentUrl.searchParams.toString().replace(/%2C/gi, ',');
        query = (query) ? `?${query}` : currentUrl.pathname;

        history.pushState({}, document.title, query);
    }

    static getSearchParam(name: string): string {
        const currentUrl = new URL(window.location.href);

        return currentUrl.searchParams.get(name);
    }

    static getSearchParams(name: string): string[] {
        const currentUrl = new URL(window.location.href);

        return readParamValues(currentUrl, name);
    }
}
