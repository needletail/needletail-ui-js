import {Client} from '@needletail/ui';
import {buildMockCities, buildMockProducts} from './mockData';
import {createMockSearch} from './mockSearch';
import type {ExamplesConfig} from './config';

export function createClient(config: ExamplesConfig): Client {
    const baseUrl = config.baseUrl ? config.baseUrl : null;
    const client = new Client(config.readKey || 'demo', baseUrl);

    if (config.mode === 'mock') {
        const products = buildMockProducts(120);
        const cities = buildMockCities();

        // Monkey-patch search() so all widgets work without a real key.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        client.search = createMockSearch(products, cities, {
            productsBucket: config.productsBucket,
            citiesBucket: config.citiesBucket,
            citySearchField: config.citySearchField,
            cityDisplayField: config.cityDisplayField,
            cityLatField: config.cityLatField,
            cityLngField: config.cityLngField,
        });
    }

    return client;
}

