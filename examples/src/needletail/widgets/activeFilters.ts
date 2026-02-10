import {ActiveFilters} from '@needletail/ui';

/**
 * Active filter chips widget (reads URL params and renders removable badges).
 */

// Always check if the element actually exists, otherwise you don't want to define the widget.
// If we don't do this, JavaScript can throw errors on pages that don't use this widget.
if (document.getElementById('active-filters')) {
    const activeFilters = new ActiveFilters({
        el: '#active-filters', // The element the ActiveFilters widget will be put in.

        // URL params to ignore when generating chips.
        // Defaults: ['page', 'sort', 'direction', 'default', 'index']
        exclude_params: ['page', 'sort', 'direction', 'default', 'index'],
    });

    // Add the widget to Needletail (client will init after `Events.initNeedletail`).
    // eslint-disable-next-line no-unsafe-optional-chaining
    (window as any).needletail.addWidget(activeFilters);
}

