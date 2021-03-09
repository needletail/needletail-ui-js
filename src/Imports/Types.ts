/* eslint-disable no-unused-vars */
import {AutocompleteBar, GroupedSearchBar, Result, AggregationBar} from '../Imports/Widgets';
import {Switch, Checkbox, Radio, Slider} from '../Imports/Aggregations';

export type WidgetOptions =
    | AutocompleteBar
    | GroupedSearchBar
    | Result
    | AggregationBar;

export type FieldOptions =
    | Switch
    | Checkbox
    | Radio
    | Slider;
