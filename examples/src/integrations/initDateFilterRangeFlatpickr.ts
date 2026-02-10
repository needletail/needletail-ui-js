import flatpickr from 'flatpickr';
import type {DateFilter} from '@needletail/ui';
import {Events} from '@needletail/ui';

/**
 * DateFilter RANGE mode + flatpickr (single calendar).
 *
 * Pattern:
 * - flatpickr attaches to a visible text input
 * - we mirror values into two hidden inputs that DateFilter listens to
 * - we dispatch "change" on the hidden inputs so DateFilter updates URL + requests
 * - we keep UI in sync when DateFilter re-renders
 */
export function initDateFilterRangeFlatpickr(dateFilter: DateFilter) {
    const init = () => {
        const rootSelector = `.needletail-aggregation-date-filter-${dateFilter.getClassTitle()}`;

        document.querySelectorAll(rootSelector).forEach((root) => {
            const displayInput = root.querySelector('.needletail-datefilter-flatpickr-range') as HTMLInputElement;
            if (!displayInput) return;

            const fromSelector = (root as HTMLElement).dataset.selectorFrom ||
                '.needletail-aggregation-date-filter-input-from';
            const toSelector = (root as HTMLElement).dataset.selectorTo ||
                '.needletail-aggregation-date-filter-input-to';

            const fromInput = root.querySelector(fromSelector) as HTMLInputElement;
            const toInput = root.querySelector(toSelector) as HTMLInputElement;
            if (!fromInput || !toInput) return;

            const dateFormat = 'Y-m-d';
            const minDate = (root as HTMLElement).dataset.minDate || undefined;
            const maxDate = (root as HTMLElement).dataset.maxDate || undefined;

            if (!displayInput._ntDateFilterRangeState) {
                displayInput._ntDateFilterRangeState = {
                    suppressHiddenSync: false,
                    fromInput: null,
                    toInput: null,
                };
            }

            const state = displayInput._ntDateFilterRangeState;
            state.fromInput = fromInput;
            state.toInput = toInput;

            const dispatchHiddenChange = () => {
                state.suppressHiddenSync = true;
                try {
                    state.fromInput.dispatchEvent(new Event('change', {bubbles: true}));
                    state.toInput.dispatchEvent(new Event('change', {bubbles: true}));
                } finally {
                    state.suppressHiddenSync = false;
                }
            };

            const syncUiFromHidden = () => {
                if (state.suppressHiddenSync) return;
                if (!displayInput._flatpickr) return;

                const from = state.fromInput.value || '';
                const to = state.toInput.value || '';

                if (!from && !to) {
                    displayInput._flatpickr.clear(false);
                    return;
                }

                const dates: string[] = [];
                if (from) dates.push(from);
                if (to) dates.push(to);

                displayInput._flatpickr.setDate(dates, false, dateFormat);
            };

            // Already initialized? Update bounds + sync.
            if (displayInput._flatpickr) {
                displayInput._flatpickr.set('minDate', minDate);
                displayInput._flatpickr.set('maxDate', maxDate);
                syncUiFromHidden();
                return;
            }

            flatpickr(displayInput, {
                mode: 'range',
                dateFormat,
                showMonths: 1,
                minDate,
                maxDate,
                allowInput: false,

                onChange(selectedDates, _dateStr, instance) {
                    const from = selectedDates[0] ? instance.formatDate(selectedDates[0], dateFormat) : '';
                    const to = selectedDates[1] ? instance.formatDate(selectedDates[1], dateFormat) : '';

                    if (from === state.fromInput.value && to === state.toInput.value) {
                        return;
                    }

                    state.fromInput.value = from;
                    state.toInput.value = to;
                    dispatchHiddenChange();
                },
            });

            fromInput.addEventListener('change', syncUiFromHidden);
            toInput.addEventListener('change', syncUiFromHidden);
            syncUiFromHidden();
        });
    };

    init();
    document.addEventListener('DOMContentLoaded', init);
    document.addEventListener(Events.initializeDateFilter, init);
    document.addEventListener(Events.onAfterResultRequest, init);
}

