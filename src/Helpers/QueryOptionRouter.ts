export type EqualsSearchValues = {
    match: any[];
    range?: any[];
    geo_point?: any[];
};

function isObject(value: any): boolean {
    return (value !== null && typeof value === 'object' && !Array.isArray(value));
}

function isRangeQueryOption(value: any): boolean {
    return isObject(value) && ('gte' in value || 'lte' in value);
}

function isGeoPointQueryOption(value: any): boolean {
    return isObject(value) &&
        ('field' in value) &&
        (('lat' in value) || ('lng' in value) || ('latitude' in value) || ('longitude' in value)) &&
        ('distance' in value);
}

/**
 * Route equals aggregation values into query option arrays.
 *
 * Backwards compatible defaults:
 * - everything goes to `match` unless it looks like a range or geo_point option.
 *
 * @param {any[]} values
 * @return {EqualsSearchValues}
 */
export function routeEqualsAggregationValues(values: any[]): EqualsSearchValues {
    const match: any[] = [];
    const range: any[] = [];
    const geoPoint: any[] = [];

    values.forEach((val: any) => {
        if (isGeoPointQueryOption(val)) {
            geoPoint.push(val);
        } else if (isRangeQueryOption(val)) {
            range.push(val);
        } else {
            match.push(val);
        }
    });

    const result: EqualsSearchValues = {
        match: match,
    };

    if (range.length > 0) {
        result.range = range;
    }

    if (geoPoint.length > 0) {
        result.geo_point = geoPoint;
    }

    return result;
}

