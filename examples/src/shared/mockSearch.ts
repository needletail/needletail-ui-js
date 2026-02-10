import type {MockCity, MockProduct} from './mockData';

type SearchParams = any;

function includesCI(haystack: string, needle: string): boolean {
    return haystack.toLowerCase().indexOf(needle.toLowerCase()) > -1;
}

function uniq<T>(items: T[]): T[] {
    return Array.from(new Set(items));
}

function getEqualsMatchValues(search: any): any[] {
    const equals = (search && search.equals) ? search.equals : {};
    const match = equals.match || [];
    return Array.isArray(match) ? match : [];
}

function getEqualsRangeValues(search: any): any[] {
    const equals = (search && search.equals) ? search.equals : {};
    const range = equals.range || [];
    return Array.isArray(range) ? range : [];
}

function getShouldFuzzyValues(search: any): any[] {
    const should = (search && search.should) ? search.should : {};
    const fuzzy = should.fuzzy || [];
    return Array.isArray(fuzzy) ? fuzzy : [];
}

function applyEqualsMatchFilters(products: MockProduct[], matchValues: any[]): MockProduct[] {
    let res = products;

    matchValues.forEach((m) => {
        if (!m || typeof m !== 'object') {
            return;
        }
        if (m.exclude_from_search) {
            return;
        }
        const field = m.field;
        const value = m.value;
        const type = m.type;

        if (!field || typeof field !== 'string') {
            return;
        }

        // Multi-value checkbox style: value: [...]
        if (Array.isArray(value)) {
            if (value.length === 0) {
                return;
            }
            res = res.filter((p: any) => value.indexOf(p[field]) > -1);
            return;
        }

        // Slider semantics (legacy UI): value + type
        if (typeof type === 'string' && typeof value === 'string' && value) {
            const num = Number(value);
            if (!Number.isFinite(num)) {
                return;
            }

            if (type === 'to') {
                res = res.filter((p: any) => Number(p[field]) <= num);
                return;
            }

            if (type === 'from') {
                res = res.filter((p: any) => Number(p[field]) >= num);
                return;
            }

            if (type === 'from:to') {
                const parts = value.split(':');
                const min = Number(parts[0]);
                const max = Number(parts[1]);
                if (!Number.isFinite(min) || !Number.isFinite(max)) {
                    return;
                }

                res = res.filter((p: any) => {
                    const v = Number(p[field]);
                    return Number.isFinite(v) && v >= min && v <= max;
                });
                return;
            }
        }

        // Switch / radio / dropdown: value: string
        if (typeof value === 'string' && value) {
            res = res.filter((p: any) => String(p[field]) === value);
        }
    });

    return res;
}

function applyEqualsRangeFilters(products: MockProduct[], rangeValues: any[]): MockProduct[] {
    let res = products;

    rangeValues.forEach((r) => {
        if (!r || typeof r !== 'object') {
            return;
        }
        if (r.exclude_from_search) {
            return;
        }
        const field = r.field;
        if (!field || typeof field !== 'string') {
            return;
        }

        const gte = (typeof r.gte !== 'undefined') ? r.gte : null;
        const lte = (typeof r.lte !== 'undefined') ? r.lte : null;

        if (!gte && !lte) {
            return;
        }

        res = res.filter((p: any) => {
            const val = p[field];

            // date strings: YYYY-MM-DD compare lexicographically
            if (typeof val === 'string') {
                if (gte && String(val) < String(gte)) return false;
                if (lte && String(val) > String(lte)) return false;
                return true;
            }

            const num = Number(val);
            if (!Number.isFinite(num)) return true;
            if (gte !== null && Number(gte) > num) return false;
            if (lte !== null && Number(lte) < num) return false;
            return true;
        });
    });

    return res;
}

function buildAgg(values: string[]): {value: string; count: number}[] {
    const counts: {[k: string]: number} = {};
    values.forEach((v) => {
        counts[v] = (counts[v] || 0) + 1;
    });

    return Object.keys(counts)
        .sort((a, b) => a.localeCompare(b))
        .map((k) => ({value: k, count: counts[k]}));
}

function buildAggFromProducts(products: MockProduct[], field: keyof MockProduct): {value: string; count: number}[] {
    return buildAgg(products.map((p) => String(p[field])));
}

export function createMockSearch(products: MockProduct[], cities: MockCity[], config: {
    productsBucket: string;
    citiesBucket: string;
    citySearchField: string;
    cityDisplayField: string;
    cityLatField: string;
    cityLngField: string;
}) {
    return async function mockSearch(params: SearchParams): Promise<any> {
        const buckets: string[] = (params && params.buckets) ? params.buckets : [];
        const search = (params && params.search) ? params.search : {};
        const size = (params && params.size) ? Number(params.size) : 10;
        const offset = (params && params.offset) ? Number(params.offset) : 0;

        const isCitySearch = buckets.length === 1 && buckets[0] === config.citiesBucket;
        if (isCitySearch) {
            const fuzzy = getShouldFuzzyValues(search);
            const q = (fuzzy[0] && fuzzy[0].value) ? String(fuzzy[0].value) : '';

            const results = cities
                .filter((c: any) => {
                    const label = String(c[config.citySearchField] || c.city || '');
                    return q ? includesCI(label, q) : true;
                })
                .slice(0, size)
                .map((c) => {
                    const record: any = {};
                    record[config.cityDisplayField] = (c as any).city;
                    record[config.cityLatField] = (c as any).lat;
                    record[config.cityLngField] = (c as any).lng;
                    return {id: c.id, record: record};
                });

            return {
                status: 200,
                data: {
                    count: results.length,
                    results: results,
                },
            };
        }

        // Products/default searches
        const match = getEqualsMatchValues(search);
        const range = getEqualsRangeValues(search);

        let filtered = products.slice();
        filtered = applyEqualsMatchFilters(filtered, match);
        filtered = applyEqualsRangeFilters(filtered, range);

        // Fuzzy query (AutocompleteBar uses should.fuzzy; we approximate)
        const fuzzy = getShouldFuzzyValues(search);
        if (fuzzy.length > 0) {
            const q = (fuzzy[0] && fuzzy[0].value) ? String(fuzzy[0].value) : '';
            if (q) {
                filtered = filtered.filter((p) => includesCI(p.title, q) || includesCI(p.body, q));
            }
        }

        const total = filtered.length;
        const page = filtered.slice(offset, offset + size);

        const results = page.map((p) => {
            return {
                id: p.id,
                record: {
                    title: p.title,
                    body: p.body,
                    brand: p.brand,
                    color: p.color,
                    price: p.price,
                    created_at: p.created_at,
                    delivery_date: p.delivery_date,
                    in_stock: p.in_stock,
                },
            };
        });

        // Aggs are computed on the filtered set (like a backend would typically do)
        const aggs: any = {
            brand: buildAggFromProducts(filtered, 'brand'),
            color: buildAggFromProducts(filtered, 'color'),
            in_stock: buildAggFromProducts(filtered, 'in_stock'),

            // DateFilter exact whitelist expects an array of {value,count}
            created_at: buildAggFromProducts(filtered, 'created_at'),
            delivery_date: buildAggFromProducts(filtered, 'delivery_date'),
        };

        // Slider expects min/max in some projects; but current Slider listens to aggs array too.
        // We keep it as a flat list of options where useful.

        return {
            status: 200,
            data: {
                count: total,
                results: results,
                aggs: aggs,
            },
        };
    };
}

