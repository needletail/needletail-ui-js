import {Events} from './Events';

export class URIHelper {
    static pushUrl(currentUrl: URL, replace: boolean = false) {
        let query = currentUrl.searchParams.toString();
        query = (query) ? `?${query}` : currentUrl.pathname;

        if (replace) {
            history.replaceState({}, document.title, query);
        } else {
            history.pushState({}, document.title, query);
        }

        Events.emit(Events.onUrlChange, {
            url: query,
        });
    }

    static addToHistory(name: string, value: string, deleteOnExist: boolean = false) {
        const currentUrl = new URL(window.location.href);

        if (deleteOnExist && currentUrl.searchParams.has(name)) {
            const values = currentUrl.searchParams.getAll(name);
            const index = values.indexOf(String(value));

            if (index > -1) {
                currentUrl.searchParams.delete(name);

                values.forEach((v, i) => {
                    if (i !== index) {
                        currentUrl.searchParams.append(name, v);
                    }
                });
            } else {
                currentUrl.searchParams.append(name, value);
            }
        } else {
            currentUrl.searchParams.delete(name);

            if (value) {
                currentUrl.searchParams.append(name, value);
            }
        }

        URIHelper.pushUrl(currentUrl);
    }

    static setParam(name: string, value: string, replace: boolean = false) {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete(name);

        if (value) {
            currentUrl.searchParams.append(name, value);
        }

        URIHelper.pushUrl(currentUrl, replace);
    }

    static removeParam(name: string, replace: boolean = false) {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete(name);
        URIHelper.pushUrl(currentUrl, replace);
    }

    static removeParamValue(name: string, value: string, replace: boolean = false) {
        const currentUrl = new URL(window.location.href);
        if (!currentUrl.searchParams.has(name)) {
            return;
        }

        const values = currentUrl.searchParams.getAll(name);
        const index = values.indexOf(String(value));
        if (index === -1) {
            return;
        }

        currentUrl.searchParams.delete(name);
        values.forEach((v, i) => {
            if (i !== index) {
                currentUrl.searchParams.append(name, v);
            }
        });

        URIHelper.pushUrl(currentUrl, replace);
    }

    static snapshot(): { pathname: string; search: string } {
        const currentUrl = new URL(window.location.href);
        return {
            pathname: currentUrl.pathname,
            search: currentUrl.search,
        };
    }

    static restore(snapshot: { pathname: string; search: string }, replace: boolean = false) {
        const url = snapshot.pathname + (snapshot.search || '');

        if (replace) {
            history.replaceState({}, document.title, url);
        } else {
            history.pushState({}, document.title, url);
        }

        Events.emit(Events.onUrlChange, {
            url: url,
        });
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
