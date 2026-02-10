import type {ExamplesConfig} from './config';
import {loadConfig, saveConfig, updateConfig} from './config';

export function renderConfigPanel(containerSelector = '#config-panel') {
    const container = document.querySelector(containerSelector) as HTMLElement;
    if (!container) return;

    const cfg = loadConfig();

    const COLLAPSE_STORAGE_KEY = 'needletail_ui_examples_config_panel_collapsed_v1';
    const storedCollapsed = localStorage.getItem(COLLAPSE_STORAGE_KEY);
    const defaultCollapsed = Boolean(window.matchMedia && window.matchMedia('(max-width: 900px)').matches);
    const isCollapsed = (storedCollapsed === null) ? defaultCollapsed : (storedCollapsed === 'true');

    container.innerHTML = `
        <div class="ex-config-shell ${isCollapsed ? 'ex-config-shell--collapsed' : ''}">
            <button
                type="button"
                class="ex-config-toggle"
                id="ex-config-toggle"
                aria-expanded="${isCollapsed ? 'false' : 'true'}"
            >
                <span class="ex-config-toggle-left">
                    <span class="ex-config-toggle-title">Config</span>
                    <span class="ex-config-toggle-meta" id="ex-config-meta">${cfg.mode === 'live' ? 'Live' : 'Mock'}</span>
                </span>
                <span class="ex-config-toggle-right">
                    <span class="ex-config-toggle-action" id="ex-config-action">${isCollapsed ? 'Show' : 'Hide'}</span>
                    <span class="ex-config-toggle-chevron" aria-hidden="true"></span>
                </span>
            </button>

            <div class="ex-config-panel">
                <div class="ex-config">
                    <div class="ex-config-row">
                        <label class="ex-label">Mode</label>
                        <select class="ex-input" id="ex-mode">
                            <option value="mock">Mock (no key required)</option>
                            <option value="live">Live (Needletail API)</option>
                        </select>
                    </div>

                    <div class="ex-config-row">
                        <label class="ex-label">Read key</label>
                        <input class="ex-input" id="ex-readKey" placeholder="nt_read_..." />
                    </div>

                    <div class="ex-config-row">
                        <label class="ex-label">Base URL (optional)</label>
                        <input class="ex-input" id="ex-baseUrl" placeholder="https://api.needletail.io" />
                    </div>

                    <div class="ex-config-row">
                        <label class="ex-label">Products bucket</label>
                        <input class="ex-input" id="ex-productsBucket" placeholder="products" />
                    </div>

                    <div class="ex-config-row">
                        <label class="ex-label">Cities bucket</label>
                        <input class="ex-input" id="ex-citiesBucket" placeholder="nl_cities" />
                    </div>

                    <div class="ex-config-actions">
                        <button class="ex-button" id="ex-save">Save</button>
                        <button class="ex-button ex-button-secondary" id="ex-reload">Reload page</button>
                    </div>

                    <div class="ex-config-hint">
                        Settings are stored in localStorage. Read key is never committed.
                    </div>
                </div>
            </div>
        </div>
    `;

    const shellEl = container.querySelector('.ex-config-shell') as HTMLElement;
    const toggleBtn = container.querySelector('#ex-config-toggle') as HTMLButtonElement;
    const metaEl = container.querySelector('#ex-config-meta') as HTMLElement;
    const actionEl = container.querySelector('#ex-config-action') as HTMLElement;

    const setCollapsed = (collapsed: boolean) => {
        if (!shellEl || !toggleBtn) {
            return;
        }
        shellEl.classList.toggle('ex-config-shell--collapsed', collapsed);
        toggleBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
        if (actionEl) {
            actionEl.textContent = collapsed ? 'Show' : 'Hide';
        }
        localStorage.setItem(COLLAPSE_STORAGE_KEY, String(Boolean(collapsed)));
    };

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const collapsed = shellEl.classList.contains('ex-config-shell--collapsed');
            setCollapsed(!collapsed);
        });
    }

    const modeEl = container.querySelector('#ex-mode') as HTMLSelectElement;
    const readKeyEl = container.querySelector('#ex-readKey') as HTMLInputElement;
    const baseUrlEl = container.querySelector('#ex-baseUrl') as HTMLInputElement;
    const productsBucketEl = container.querySelector('#ex-productsBucket') as HTMLInputElement;
    const citiesBucketEl = container.querySelector('#ex-citiesBucket') as HTMLInputElement;

    modeEl.value = cfg.mode;
    readKeyEl.value = cfg.readKey;
    baseUrlEl.value = cfg.baseUrl;
    productsBucketEl.value = cfg.productsBucket;
    citiesBucketEl.value = cfg.citiesBucket;

    const saveBtn = container.querySelector('#ex-save') as HTMLButtonElement;
    const reloadBtn = container.querySelector('#ex-reload') as HTMLButtonElement;

    saveBtn.addEventListener('click', () => {
        const next: ExamplesConfig = {
            ...cfg,
            mode: (modeEl.value as any),
            readKey: readKeyEl.value || '',
            baseUrl: baseUrlEl.value || '',
            productsBucket: productsBucketEl.value || 'products',
            citiesBucket: citiesBucketEl.value || 'nl_cities',
        };

        saveConfig(next);
        updateConfig(next);

        if (metaEl) {
            metaEl.textContent = (next.mode === 'live') ? 'Live' : 'Mock';
        }
    });

    reloadBtn.addEventListener('click', () => {
        window.location.reload();
    });
}

