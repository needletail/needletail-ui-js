import '../shared/styles.css';

import {Events} from '@needletail/ui';
import {loadConfig} from '../shared/config';
import {createClient} from '../shared/createClient';
import {attachDebugPanels} from '../shared/debugPanels';
import {renderConfigPanel} from '../shared/ui';

/**
 * Examples bootstrap (matches how we wire Needletail in real projects).
 *
 * Pattern:
 * - Create a global `window.needletail` client
 * - Dynamically import per-page modules (based on DOM ids)
 * - Those modules define widgets/aggregations and add them to `window.needletail`
 * - After everything is registered, emit `Events.initNeedletail` to initialize the UI
 */

// Load runtime config (stored in localStorage, never committed).
const config = loadConfig();

// Expose the read key (handy for debugging and matches real-world setups).
// eslint-disable-next-line no-unsafe-optional-chaining
(window as any).needletail_read_key = config.readKey || '';

// Create the Needletail UI client. In mock mode this monkey-patches `client.search()`.
// eslint-disable-next-line no-unsafe-optional-chaining
(window as any).needletail = createClient(config);

// A simple flag some teams use to know when widgets are ready.
// eslint-disable-next-line no-unsafe-optional-chaining
(window as any).needletail.loaded = false;

// Render config UI (collapsible on small screens) and optional debug panels.
renderConfigPanel('#config-panel');
attachDebugPanels('#debug-panels');

async function initPage() {
    const imports: Promise<unknown>[] = [];

    // Only load the modules we need for the current HTML page.
    if (document.getElementById('nt-examples-all')) {
        imports.push(import('./pages/all'));
    }
    if (document.getElementById('nt-examples-dates')) {
        imports.push(import('./pages/dates'));
    }
    if (document.getElementById('nt-examples-apply-mode')) {
        imports.push(import('./pages/applyMode'));
    }

    await Promise.all(imports);

    // Initialize widgets (Client.init() does the same).
    Events.emit(Events.initNeedletail, {});

    // eslint-disable-next-line no-unsafe-optional-chaining
    (window as any).needletail.loaded = true;
}

// This file is imported as a module script (so it may run before DOMContentLoaded).
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        void initPage();
    });
} else {
    void initPage();
}

