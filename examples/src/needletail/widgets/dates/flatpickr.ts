import 'flatpickr/dist/flatpickr.min.css';

import {initDateFilterExactFlatpickr} from '../../../integrations/initDateFilterExactFlatpickr';
import {initDateFilterRangeFlatpickr} from '../../../integrations/initDateFilterRangeFlatpickr';
import {createdAtFlatpickrExactWhitelist} from '../../aggregations/dates/dateFilterCreatedAtFlatpickrExactWhitelist';
import {createdAtFlatpickrRange} from '../../aggregations/dates/dateFilterCreatedAtFlatpickrRange';

/**
 * Flatpickr integrations for the "Dates (Flatpickr)" page.
 *
 * We keep this separate from the aggregation definitions so it is easy to copy/paste
 * into real projects, regardless of which datepicker plugin you choose.
 */

// Range: single calendar with Flatpickr "range" mode.
initDateFilterRangeFlatpickr(createdAtFlatpickrRange);

// Exact: Flatpickr "single" mode with whitelist (enabled dates are provided by Needletail aggs).
initDateFilterExactFlatpickr(createdAtFlatpickrExactWhitelist);

