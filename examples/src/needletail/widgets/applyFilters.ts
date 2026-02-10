import {ApplyFilters} from '@needletail/ui';

/**
 * ApplyFilters widget (enables global "apply button mode" in Result).
 *
 * When this widget is present, Result will stop reacting to filter changes until you click Apply.
 */

if (document.getElementById('apply-filters')) {
    const applyFilters = new ApplyFilters({
        el: '#apply-filters', // The element the ApplyFilters widget will be put in.

        text: 'Apply', // The text on the Apply button. Default: 'Apply filters'
        cancel_text: 'Cancel', // The text on the Cancel button. Default: 'Cancel'
        show_cancel: true, // Show/hide the cancel button. Default: true
    });

    // eslint-disable-next-line no-unsafe-optional-chaining
    (window as any).needletail.addWidget(applyFilters);
}

