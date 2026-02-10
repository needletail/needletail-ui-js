/* eslint-disable no-unused-vars */
import {AutocompleteBar, GroupedSearchBar, Result, AggregationBar, ApplyFilters, ActiveFilters} from '../Imports/Widgets';
import {
    Switch,
    Checkbox,
    Radio,
    Slider,
    DateFilter,
    DropdownSelect,
    DatePresets,
    MultiDate,
    GeoRadius,
} from '../Imports/Aggregations';

export type WidgetOptions =
    | AutocompleteBar
    | GroupedSearchBar
    | Result
    | AggregationBar
    | ApplyFilters
    | ActiveFilters;

export type FieldOptions =
    | Switch
    | Checkbox
    | Radio
    | Slider
    | DateFilter
    | DropdownSelect
    | DatePresets
    | MultiDate
    | GeoRadius;
