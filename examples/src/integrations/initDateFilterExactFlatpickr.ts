import flatpickr from 'flatpickr';
import type {DateFilter} from '@needletail/ui';
import {Events} from '@needletail/ui';

/**
 * DateFilter EXACT mode + flatpickr (with optional whitelist based on aggregation values).
 *
 * Prevents recursion:
 * - Always use triggerChange=false when syncing UI from hidden input
 * - Use a re-entrancy guard when dispatching hidden "change"
 */
export function initDateFilterExactFlatpickr(dateFilter: DateFilter) {
    const init = () => {
        const rootSelector = `.needletail-aggregation-date-filter-${dateFilter.getClassTitle()}`;

        document.querySelectorAll(rootSelector).forEach((root) => {
            const displayInput = root.querySelector('.needletail-datefilter-flatpickr-exact') as HTMLInputElement;
            if (!displayInput) return;

            const exactSelector = (root as HTMLElement).dataset.selectorExactInput ||
                '.needletail-aggregation-date-filter-input-exact';

            const exactInput = root.querySelector(exactSelector) as HTMLInputElement;
            if (!exactInput) return;

            const dateFormat = 'Y-m-d';
            const minDate = (root as HTMLElement).dataset.minDate || undefined;
            const maxDate = (root as HTMLElement).dataset.maxDate || undefined;

            const jsonEl = root.querySelector('.needletail-aggregation-date-filter-available-values-json') as HTMLElement;
            const hasWhitelist = Boolean(jsonEl);

            let enableDates: string[] | null = null;
            if (hasWhitelist) {
                enableDates = [];
                try {
                    const parsed = JSON.parse(jsonEl.textContent || '[]');
                    if (Array.isArray(parsed)) {
                        enableDates = parsed;
                    }
                } catch (e) {
                    enableDates = [];
                }
            }

            if (!displayInput._ntDateFilterExactState) {
                displayInput._ntDateFilterExactState = {
                    suppressHiddenSync: false,
                    exactInput: null,
                    enableDates: null,
                };
            }

            const state = displayInput._ntDateFilterExactState;
            state.exactInput = exactInput;
            state.enableDates = enableDates;

            const dispatchHiddenChange = () => {
                state.suppressHiddenSync = true;
                try {
                    state.exactInput.dispatchEvent(new Event('change', {bubbles: true}));
                } finally {
                    state.suppressHiddenSync = false;
                }
            };

            const syncUiFromHidden = () => {
                if (state.suppressHiddenSync) return;
                if (!displayInput._flatpickr) return;

                if (Array.isArray(state.enableDates) && state.enableDates.length > 0) {
                    if (state.exactInput.value && state.enableDates.indexOf(state.exactInput.value) === -1) {
                        state.exactInput.value = '';
                        displayInput._flatpickr.clear(false);
                        dispatchHiddenChange();
                        return;
                    }
                }

                if (!state.exactInput.value) {
                    displayInput._flatpickr.clear(false);
                    return;
                }

                displayInput._flatpickr.setDate(state.exactInput.value, false, dateFormat);
            };

            // If whitelist is present but empty, disable selection until aggs arrive.
            if (hasWhitelist && Array.isArray(enableDates) && enableDates.length === 0) {
                displayInput.setAttribute('disabled', 'disabled');

                if (displayInput._flatpickr) {
                    displayInput._flatpickr.set('enable', []);
                    displayInput._flatpickr.set('minDate', minDate);
                    displayInput._flatpickr.set('maxDate', maxDate);
                    syncUiFromHidden();
                }

                return;
            }

            displayInput.removeAttribute('disabled');

            // Already initialized? Update options + sync.
            if (displayInput._flatpickr) {
                if (hasWhitelist && Array.isArray(enableDates)) {
                    displayInput._flatpickr.set('enable', enableDates);
                }
                displayInput._flatpickr.set('minDate', minDate);
                displayInput._flatpickr.set('maxDate', maxDate);
                syncUiFromHidden();
                return;
            }

            flatpickr(displayInput, {
                dateFormat,
                defaultDate: exactInput.value || null,
                minDate,
                maxDate,
                ...(hasWhitelist && Array.isArray(enableDates) ? {enable: enableDates} : {}),
                allowInput: false,

                onChange(selectedDates, _dateStr, instance) {
                    const nextValue = selectedDates[0] ? instance.formatDate(selectedDates[0], dateFormat) : '';

                    if (nextValue === state.exactInput.value) return;

                    state.exactInput.value = nextValue;
                    dispatchHiddenChange();
                },
            });

            exactInput.addEventListener('change', syncUiFromHidden);
            syncUiFromHidden();
        });
    };

    init();
    document.addEventListener('DOMContentLoaded', init);
    document.addEventListener(Events.initializeDateFilter, init);
    document.addEventListener(Events.onAfterResultRequest, init);
}

