import {Widget} from './../Imports/BaseClasses';
import template from './../Html/active_filters.html';
import Mustache from 'mustache';
// eslint-disable-next-line no-unused-vars
import {ActiveFiltersSettings} from '../Imports/Interfaces';
import {Events, optional, URIHelper} from '../Imports/Helpers';

type Chip = {
    type: 'param' | 'param_value' | 'range';
    key: string;
    value?: string;
    label: string;
};

export class ActiveFilters extends Widget {
    discriminator: string = 'ActiveFilters';
    excludeParams: string[] = ['page', 'sort', 'direction', 'default', 'index'];
    private listenersBound: boolean = false;

    constructor(options: ActiveFiltersSettings = {}) {
        super(options);

        this.setExcludeParams(options.exclude_params || this.getExcludeParams());
    }

    setExcludeParams(excludeParams: string[]): ActiveFilters {
        this.excludeParams = excludeParams || [];
        return this;
    }

    getExcludeParams(): string[] {
        return this.excludeParams;
    }

    getTemplate(): string {
        if (this.template) {
            return this.template;
        }

        return template;
    }

    parseChips(): Chip[] {
        const currentUrl = new URL(window.location.href);
        const params = currentUrl.searchParams;

        const rangeGroups: {[key: string]: {min?: string; max?: string}} = {};
        const chips: Chip[] = [];

        // Collect ranges and normal params
        params.forEach((value: string, key: string) => {
            if (this.getExcludeParams().indexOf(key) > -1) {
                return;
            }

            const rangeMatch = /(.+)\[(min|max)\]$/.exec(key);
            if (rangeMatch) {
                const base = rangeMatch[1];
                const part = rangeMatch[2] as 'min' | 'max';
                if (!rangeGroups[base]) {
                    rangeGroups[base] = {};
                }
                rangeGroups[base][part] = value;
                return;
            }
        });

        // Create range chips
        Object.keys(rangeGroups).forEach((base: string) => {
            const min = optional(rangeGroups[base]).min || '';
            const max = optional(rangeGroups[base]).max || '';
            if (!min && !max) {
                return;
            }

            const label = `${base}: ${min || '…'} – ${max || '…'}`;
            chips.push({
                type: 'range',
                key: base,
                label: label,
            });
        });

        // Create normal chips (support multi-value params)
        const seen: Set<string> = new Set();
        params.forEach((value: string, key: string) => {
            if (this.getExcludeParams().indexOf(key) > -1) {
                return;
            }

            if (/(.+)\[(min|max)\]$/.test(key)) {
                return;
            }

            const all = params.getAll(key);
            if (all.length > 1) {
                all.forEach((v: string) => {
                    const sig = `${key}=${v}`;
                    if (seen.has(sig)) {
                        return;
                    }
                    seen.add(sig);
                    chips.push({
                        type: 'param_value',
                        key: key,
                        value: v,
                        label: `${key}: ${v}`,
                    });
                });
            } else {
                const sig = `${key}=*`;
                if (seen.has(sig)) {
                    return;
                }
                seen.add(sig);
                chips.push({
                    type: 'param',
                    key: key,
                    label: `${key}: ${value}`,
                });
            }
        });

        return chips;
    }

    render(): Node {
        const rendered = Mustache.render(this.getTemplate(), {
            chips: this.parseChips(),
        });

        return document.createRange().createContextualFragment(rendered);
    }

    executeJS(): void {
        // Bind remove handlers for current DOM
        document.querySelectorAll(`${this.getEl()} .needletail-active-filter-remove`)
            .forEach((button: HTMLButtonElement) => {
                button.addEventListener('click', () => {
                    const type = button.getAttribute('data-type');
                    const key = button.getAttribute('data-key');
                    const value = button.getAttribute('data-value');

                    if (!key) {
                        return;
                    }

                    if (type === 'range') {
                        URIHelper.removeParam(`${key}[min]`, true);
                        URIHelper.removeParam(`${key}[max]`, true);
                    } else if (type === 'param_value' && value) {
                        URIHelper.removeParamValue(key, value, true);
                    } else {
                        URIHelper.removeParam(key, true);
                    }

                    // Reset paging on filter removal
                    URIHelper.setParam('page', '1', true);
                    Events.emit(Events.onBeforeResultRequest, {});
                });
            });

        if (this.listenersBound) {
            return;
        }

        this.listenersBound = true;

        // Re-render whenever the URL changes
        document.addEventListener(Events.onUrlChange, () => {
            this.build();
        });

        // Also rebuild after results (some apps modify URL outside URIHelper)
        document.addEventListener(Events.onAfterResultRequest, () => {
            this.build();
        });
    }
}

