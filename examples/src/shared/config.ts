export type ExamplesMode = 'mock' | 'live';

export type ExamplesConfig = {
    mode: ExamplesMode;
    readKey: string;
    baseUrl: string;

    productsBucket: string;
    citiesBucket: string;

    // GeoRadius record mapping
    cityDisplayField: string;
    cityLatField: string;
    cityLngField: string;
    citySearchField: string;
};

const STORAGE_KEY = 'needletail_ui_examples_config_v1';

export function getDefaultConfig(): ExamplesConfig {
    return {
        mode: 'mock',
        readKey: '',
        baseUrl: '',

        productsBucket: 'products',
        citiesBucket: 'nl_cities',

        cityDisplayField: 'city',
        cityLatField: 'lat',
        cityLngField: 'lng',
        citySearchField: 'city',
    };
}

export function loadConfig(): ExamplesConfig {
    const defaults = getDefaultConfig();
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return defaults;
        }

        const parsed = JSON.parse(raw);
        return {
            ...defaults,
            ...parsed,
        } as ExamplesConfig;
    } catch (e) {
        return defaults;
    }
}

export function saveConfig(config: ExamplesConfig) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function updateConfig(partial: Partial<ExamplesConfig>): ExamplesConfig {
    const next = {
        ...loadConfig(),
        ...partial,
    };
    saveConfig(next);
    return next;
}

