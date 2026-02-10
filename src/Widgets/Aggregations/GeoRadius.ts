import template from './../../Html/Aggregations/geo_radius.html';
import resultsTemplate from './../../Html/Aggregations/geo_radius_results.html';
import skeletonTemplate from './../../Html/Skeletons/geo_radius.html';
import {Aggregation} from './../../Imports/BaseClasses';
import Mustache from 'mustache';
import {Events, optional, URIHelper} from '../../Imports/Helpers';
import _debounce from 'lodash/debounce';
// eslint-disable-next-line no-unused-vars
import {GeoRadiusSettings} from '../../Imports/Interfaces';

type DistanceOption = { value: string; label: string };

export class GeoRadius extends Aggregation {
    discriminator: string = 'GeoRadius';

    citiesBucket: string = '';
    citiesSearchFields: string[] = ['name'];
    displayField: string = 'name';
    latField: string = 'lat';
    lngField: string = 'lng';

    distanceOptions: DistanceOption[] = [
        {value: '5km', label: '5 km'},
        {value: '10km', label: '10 km'},
        {value: '25km', label: '25 km'},
        {value: '50km', label: '50 km'},
        {value: '100km', label: '100 km'},
    ];
    defaultDistance: string = '25km';

    locationPlaceholder: string = 'Search a city';
    geolocateLabel: string = 'Use current location';
    showGeolocation: boolean = false;

    minChars: number = 2;
    limit: number = 10;
    debounceMs: number = 150;
    noResultMessage: string = 'No results where found';

    private lastResults: any[] = [];

    constructor(options: GeoRadiusSettings = {}) {
        super(options);

        this.setCitiesBucket(options.cities_bucket || this.getCitiesBucket());
        this.setCitiesSearchFields(options.cities_search_fields || this.getCitiesSearchFields());
        this.setDisplayField(options.display_field || this.getDisplayField());
        this.setLatField(options.lat_field || this.getLatField());
        this.setLngField(options.lng_field || this.getLngField());
        this.setDistanceOptions(options.distance_options || this.getDistanceOptions());
        this.setDefaultDistance(options.default_distance || this.getDefaultDistance());
        this.setLocationPlaceholder(options.location_placeholder || this.getLocationPlaceholder());
        this.setShowGeolocation((typeof optional(options).show_geolocation !== 'undefined') ?
            optional(options).show_geolocation : this.getShowGeolocation());
        this.setGeolocateLabel(options.geolocate_label || this.getGeolocateLabel());
        this.setMinChars(options.min_chars || this.getMinChars());
        this.setLimit(options.limit || this.getLimit());
        this.setDebounceMs(options.debounce || this.getDebounceMs());
        this.setNoResultMessage(options.no_result_message || this.getNoResultMessage());

        this.value = {
            field: this.getAttribute(),
            value: '',
            is_aggregation: true,
            exclude_from_search: true,
        };
    }

    setCitiesBucket(bucket: string): GeoRadius {
        this.citiesBucket = bucket;
        return this;
    }

    getCitiesBucket(): string {
        return this.citiesBucket;
    }

    setCitiesSearchFields(fields: string[] | string): GeoRadius {
        if (typeof fields === 'string') {
            this.citiesSearchFields = [fields];
        } else {
            this.citiesSearchFields = fields || [];
        }
        return this;
    }

    getCitiesSearchFields(): string[] {
        return this.citiesSearchFields;
    }

    setDisplayField(displayField: string): GeoRadius {
        this.displayField = displayField;
        return this;
    }

    getDisplayField(): string {
        return this.displayField;
    }

    setLatField(latField: string): GeoRadius {
        this.latField = latField;
        return this;
    }

    getLatField(): string {
        return this.latField;
    }

    setLngField(lngField: string): GeoRadius {
        this.lngField = lngField;
        return this;
    }

    getLngField(): string {
        return this.lngField;
    }

    setDistanceOptions(distanceOptions: DistanceOption[]): GeoRadius {
        this.distanceOptions = distanceOptions;
        return this;
    }

    getDistanceOptions(): DistanceOption[] {
        return this.distanceOptions;
    }

    setDefaultDistance(defaultDistance: string): GeoRadius {
        this.defaultDistance = defaultDistance;
        return this;
    }

    getDefaultDistance(): string {
        return this.defaultDistance;
    }

    setLocationPlaceholder(locationPlaceholder: string): GeoRadius {
        this.locationPlaceholder = locationPlaceholder;
        return this;
    }

    getLocationPlaceholder(): string {
        return this.locationPlaceholder;
    }

    setGeolocateLabel(geolocateLabel: string): GeoRadius {
        this.geolocateLabel = geolocateLabel;
        return this;
    }

    getGeolocateLabel(): string {
        return this.geolocateLabel;
    }

    setShowGeolocation(showGeolocation: boolean): GeoRadius {
        this.showGeolocation = showGeolocation;
        return this;
    }

    getShowGeolocation(): boolean {
        return this.showGeolocation;
    }

    setMinChars(minChars: number): GeoRadius {
        this.minChars = minChars;
        return this;
    }

    getMinChars(): number {
        return this.minChars;
    }

    setLimit(limit: number): GeoRadius {
        this.limit = limit;
        return this;
    }

    getLimit(): number {
        return this.limit;
    }

    setDebounceMs(debounceMs: number): GeoRadius {
        this.debounceMs = debounceMs;
        return this;
    }

    getDebounceMs(): number {
        return this.debounceMs;
    }

    setNoResultMessage(noResultMessage: string): GeoRadius {
        this.noResultMessage = noResultMessage;
        return this;
    }

    getNoResultMessage(): string {
        return this.noResultMessage;
    }

    getTemplate(): string {
        if (this.template) {
            return this.template;
        }

        return template;
    }

    getResultsTemplate(): string {
        return resultsTemplate;
    }

    getSkeletonTemplate(): string {
        if (this.skeletonTemplate) {
            return this.skeletonTemplate;
        }

        return skeletonTemplate;
    }

    renderSkeleton(): string {
        const rendered = Mustache.render(this.getSkeletonTemplate(), {
            class_title: this.getClassTitle(),
        });
        return rendered;
    }

    getLocationParam(): string {
        return this.getTitle();
    }

    getLatParam(): string {
        return this.getTitle() + '[lat]';
    }

    getLngParam(): string {
        return this.getTitle() + '[lng]';
    }

    getDistanceParam(): string {
        return this.getTitle() + '[distance]';
    }

    getCurrentLocationLabel(): string {
        return URIHelper.getSearchParam(this.getLocationParam()) || '';
    }

    getCurrentLat(): string {
        return URIHelper.getSearchParam(this.getLatParam()) || '';
    }

    getCurrentLng(): string {
        return URIHelper.getSearchParam(this.getLngParam()) || '';
    }

    getCurrentDistance(): string {
        return URIHelper.getSearchParam(this.getDistanceParam()) || this.getDefaultDistance();
    }

    updateValueFromUrl(emitInitial = false) {
        const lat = this.getCurrentLat();
        const lng = this.getCurrentLng();
        const distance = this.getCurrentDistance();

        const hasGeo = Boolean(lat && lng && distance);

        if (hasGeo) {
            this.value = {
                field: this.getAttribute(),
                lat: parseFloat(lat),
                lng: parseFloat(lng),
                distance: distance,
                is_aggregation: true,
            };
            this.hasActiveAggregation = true;
        } else {
            this.value = {
                field: this.getAttribute(),
                value: '',
                is_aggregation: true,
                exclude_from_search: true,
            };
            this.hasActiveAggregation = false;
        }

        if (emitInitial) {
            Events.emit(Events.onAggregationValueChange, {
                initial: true,
                name: this.getAttribute(),
                hasActive: this.hasActiveAggregation,
                value: this.value,
            });
        }
    }

    render(): string {
        const template = this.getTemplate();

        return Mustache.render(template, {
            title: this.getTitle(),
            class_title: this.getClassTitle(),
            name: this.getClassTitle(),
            collapsible: (this.getCollapsible()) ? 'needletail-collapsible' : '',
            collapsed: (this.getCollapsible() && this.getDefaultCollapsed()) ? 'needletail-collapsed' : '',
            location_placeholder: this.getLocationPlaceholder(),
            location_value: this.getCurrentLocationLabel(),
            show_geolocation: this.getShowGeolocation(),
            geolocate_label: this.getGeolocateLabel(),
            distances: this.getDistanceOptions(),
        });
    }

    renderResults(results: any[]): string {
        return Mustache.render(this.getResultsTemplate(), {
            results: results,
            no_result_message: this.getNoResultMessage(),
        });
    }

    async searchCities(query: string): Promise<any[]> {
        if (!this.parent || !this.parent.client) {
            return [];
        }

        if (!this.getCitiesBucket()) {
            return [];
        }

        const fuzzy: any[] = [];
        this.getCitiesSearchFields().forEach((field: string) => {
            fuzzy.push({field: field, value: query});
        });

        const result = await this.parent.client.search({
            buckets: [this.getCitiesBucket()],
            search: {
                should: {
                    fuzzy: fuzzy,
                },
            },
            size: this.getLimit(),
        });

        if (!result || !result.data || !result.data.results) {
            return [];
        }

        return result.data.results.map((r: any) => {
            const record = r.record || {};
            return {
                id: r.id,
                label: record[this.getDisplayField()] || '',
                lat: record[this.getLatField()],
                lng: record[this.getLngField()],
                record: record,
            };
        }).filter((r: any) => Boolean(r.label) && typeof r.lat !== 'undefined' && typeof r.lng !== 'undefined');
    }

    executeJS(): void {
        const classTitle = this.getClassTitle();
        const rootSelector = `.needletail-aggregation-geo-radius-${classTitle}`;
        const inputSelector = `.needletail-aggregation-geo-radius-input-${classTitle}`;
        const distanceSelector = `.needletail-aggregation-geo-radius-distance-${classTitle}`;

        const hideSuggestions = (root: Element) => {
            const suggestions = root.querySelector('.needletail-aggregation-geo-radius-suggestions') as HTMLElement;
            if (!suggestions) {
                return;
            }
            suggestions.classList.add('needletail-hidden');
            suggestions.innerHTML = '';
        };

        const showSuggestions = (root: Element, html: string) => {
            const suggestions = root.querySelector('.needletail-aggregation-geo-radius-suggestions') as HTMLElement;
            if (!suggestions) {
                return;
            }
            suggestions.innerHTML = html;
            suggestions.classList.remove('needletail-hidden');
        };

        const syncFromUrl = (root: Element) => {
            const input = root.querySelector(inputSelector) as HTMLInputElement;
            if (input) {
                input.value = this.getCurrentLocationLabel();
            }

            const distance = root.querySelector(distanceSelector) as HTMLSelectElement;
            if (distance) {
                distance.value = this.getCurrentDistance();
            }
        };

        const selectLocation = (label: string, lat: string, lng: string) => {
            URIHelper.setParam(this.getLocationParam(), label);
            URIHelper.setParam(this.getLatParam(), String(lat));
            URIHelper.setParam(this.getLngParam(), String(lng));

            if (!URIHelper.getSearchParam(this.getDistanceParam())) {
                URIHelper.setParam(this.getDistanceParam(), this.getDefaultDistance());
            }

            this.updateValueFromUrl(false);
            Events.emit(Events.onBeforeResultRequest, {});
            Events.emit(Events.onAggregationValueChange, {
                initial: false,
                name: this.getAttribute(),
                hasActive: this.hasActiveAggregation,
                value: this.value,
                lastValue: label,
            });
        };

        document.querySelectorAll(rootSelector).forEach((root: Element) => {
            if (this.getCollapsible()) {
                const title = root.querySelector('.needletail-aggregation-geo-radius-title') as HTMLElement;
                if (title) {
                    title.addEventListener('click', () => {
                        const wrapper = root.closest('.needletail-aggregation') as HTMLElement;
                        if (!wrapper) {
                            return;
                        }

                        if (wrapper.classList.contains('needletail-collapsed')) {
                            wrapper.classList.remove('needletail-collapsed');
                        } else {
                            wrapper.classList.add('needletail-collapsed');
                        }
                    });
                }
            }

            const input = root.querySelector(inputSelector) as HTMLInputElement;
            const distance = root.querySelector(distanceSelector) as HTMLSelectElement;
            const geolocate = root.querySelector('.needletail-aggregation-geo-radius-geolocate') as HTMLButtonElement;

            if (distance) {
                distance.value = this.getCurrentDistance();
                distance.addEventListener('change', () => {
                    URIHelper.setParam(this.getDistanceParam(), distance.value);
                    this.updateValueFromUrl(false);

                    Events.emit(Events.onBeforeResultRequest, {});
                    Events.emit(Events.onAggregationValueChange, {
                        initial: false,
                        name: this.getAttribute(),
                        hasActive: this.hasActiveAggregation,
                        value: this.value,
                        lastValue: distance.value,
                    });
                });
            }

            if (geolocate) {
                geolocate.addEventListener('click', () => {
                    if (!navigator.geolocation) {
                        return;
                    }

                    navigator.geolocation.getCurrentPosition((pos) => {
                        const lat = pos.coords.latitude;
                        const lng = pos.coords.longitude;
                        selectLocation('Current location', String(lat), String(lng));
                    });
                });
            }

            if (input) {
                const runSearch = _debounce(async () => {
                    const q = (input.value || '').trim();
                    if (q.length < this.getMinChars()) {
                        hideSuggestions(root);
                        return;
                    }

                    const results = await this.searchCities(q);
                    this.lastResults = results;
                    showSuggestions(root, this.renderResults(results));

                    root.querySelectorAll('.needletail-aggregation-geo-radius-result')
                        .forEach((el: HTMLElement) => {
                            el.addEventListener('click', () => {
                                const label = el.getAttribute('data-label') || '';
                                const lat = el.getAttribute('data-lat') || '';
                                const lng = el.getAttribute('data-lng') || '';
                                selectLocation(label, lat, lng);
                                hideSuggestions(root);
                                if (input) {
                                    input.blur();
                                }
                            });
                        });
                }, this.getDebounceMs());

                input.addEventListener('input', runSearch);

                input.addEventListener('blur', () => {
                    // small delay so clicks register
                    setTimeout(() => hideSuggestions(root), 150);
                });
            }

            syncFromUrl(root);
        });

        document.addEventListener(Events.onUrlChange, () => {
            this.updateValueFromUrl(false);
            document.querySelectorAll(rootSelector).forEach((root: Element) => {
                syncFromUrl(root);
            });
        });

        this.updateValueFromUrl(true);
    }

    reset(): void {
        URIHelper.removeParam(this.getLocationParam());
        URIHelper.removeParam(this.getLatParam());
        URIHelper.removeParam(this.getLngParam());
        URIHelper.removeParam(this.getDistanceParam());
        this.updateValueFromUrl(false);
        Events.emit(Events.onBeforeResultRequest, {});
    }
}

