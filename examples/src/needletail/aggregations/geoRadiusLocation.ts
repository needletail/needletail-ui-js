import {GeoRadius} from '@needletail/ui';
import {loadConfig} from '../../shared/config';

/**
 * GeoRadius aggregation.
 *
 * Lets users pick a location (city bucket) + distance, then contributes `search.geo_point`.
 */

const config = loadConfig();

export default new GeoRadius({
    title: 'Location',

    // IMPORTANT: this is the geo_point field in your Needletail index, not the cities bucket fields.
    attribute: 'geo',

    template: '', // Custom template (Mustache). Leave empty to use the default template.
    use_skeleton: false,

    collapsible: false,
    default_collapsed: false,

    // Which bucket contains the location records (cities).
    cities_bucket: config.citiesBucket,

    // Fields used to search inside the cities bucket.
    cities_search_fields: [config.citySearchField],

    // Which field to show as the label for a selected city.
    display_field: config.cityDisplayField,

    // Fields containing coordinates in the cities bucket.
    lat_field: config.cityLatField,
    lng_field: config.cityLngField,

    // Distance select
    distance_options: [
        {value: '5km', label: '5 km'},
        {value: '10km', label: '10 km'},
        {value: '25km', label: '25 km'},
        {value: '50km', label: '50 km'},
        {value: '100km', label: '100 km'},
    ],
    default_distance: '25km',

    // Input UX
    location_placeholder: 'Search a city',

    // Optional "current location" button (uses `navigator.geolocation`).
    show_geolocation: true,
    geolocate_label: 'Use current location',

    // Suggestion dropdown behavior
    min_chars: 2, // Default: 2
    limit: 10, // Default: 10
    debounce: 150, // Default: 150ms
    no_result_message: 'No results where found', // Default: 'No results where found'
});

