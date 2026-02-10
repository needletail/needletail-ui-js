import {Events} from '@needletail/ui';

export function attachDebugPanels(rootSelector = '#debug-panels') {
    const root = document.querySelector(rootSelector) as HTMLElement;
    if (!root) {
        return;
    }

    root.innerHTML = `
        <div class="ex-panel">
            <div class="ex-panel-title">Dirty state</div>
            <pre class="ex-panel-body" data-panel="dirty">false</pre>
        </div>
        <div class="ex-panel">
            <div class="ex-panel-title">Last onResultRequest payload</div>
            <pre class="ex-panel-body" data-panel="payload"></pre>
        </div>
    `;

    const dirtyEl = root.querySelector('[data-panel="dirty"]') as HTMLElement;
    const payloadEl = root.querySelector('[data-panel="payload"]') as HTMLElement;

    document.addEventListener(Events.filtersDirtyStateChange, (e: CustomEvent) => {
        if (dirtyEl) {
            // eslint-disable-next-line no-unsafe-optional-chaining
            dirtyEl.textContent = String(Boolean((e as any)?.detail?.dirty));
        }
    });

    document.addEventListener(Events.onResultRequest, (e: CustomEvent) => {
        if (!payloadEl) return;
        try {
            payloadEl.textContent = JSON.stringify(e.detail, null, 2);
        } catch (err) {
            payloadEl.textContent = '[unserializable payload]';
        }
    });
}

