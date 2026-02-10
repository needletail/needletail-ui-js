import {Widget} from './../Imports/BaseClasses';
import template from './../Html/apply_filters.html';
import Mustache from 'mustache';
// eslint-disable-next-line no-unused-vars
import {ApplyFiltersSettings} from '../Imports/Interfaces';
import {Events, optional} from '../Imports/Helpers';

export class ApplyFilters extends Widget {
    discriminator: string = 'ApplyFilters';
    text: string = 'Apply filters';
    cancelText: string = 'Cancel';
    showCancel: boolean = true;

    constructor(options: ApplyFiltersSettings = {}) {
        super(options);

        this.setText(options.text || this.getText());
        this.setCancelText(options.cancel_text || this.getCancelText());
        this.setShowCancel((typeof optional(options).show_cancel !== 'undefined') ?
            optional(options).show_cancel : this.getShowCancel());
    }

    setText(text: string): ApplyFilters {
        this.text = text;
        return this;
    }

    getText(): string {
        return this.text;
    }

    setCancelText(text: string): ApplyFilters {
        this.cancelText = text;
        return this;
    }

    getCancelText(): string {
        return this.cancelText;
    }

    setShowCancel(showCancel: boolean): ApplyFilters {
        this.showCancel = showCancel;
        return this;
    }

    getShowCancel(): boolean {
        return this.showCancel;
    }

    getTemplate(): string {
        if (this.template) {
            return this.template;
        }

        return template;
    }

    render(): Node {
        const rendered = Mustache.render(this.getTemplate(), {
            text: this.getText(),
            cancel_text: this.getCancelText(),
            show_cancel: this.getShowCancel(),
        });

        return document.createRange().createContextualFragment(rendered);
    }

    executeJS(): void {
        const setDisabled = (disabled: boolean) => {
            document.querySelectorAll(`${this.getEl()} .needletail-apply-filters-button`)
                .forEach((element: HTMLButtonElement) => {
                    element.disabled = disabled;
                });

            document.querySelectorAll(`${this.getEl()} .needletail-cancel-filters-button`)
                .forEach((element: HTMLButtonElement) => {
                    element.disabled = disabled;
                });
        };

        // Initially disabled until the Result tells us there are pending changes.
        setDisabled(true);

        document.querySelectorAll(`${this.getEl()} .needletail-apply-filters-button`)
            .forEach((element: HTMLButtonElement) => {
                element.addEventListener('click', () => {
                    if (element.disabled) {
                        return;
                    }

                    Events.emit(Events.onApplyFilters, {});
                });
            });

        document.querySelectorAll(`${this.getEl()} .needletail-cancel-filters-button`)
            .forEach((element: HTMLButtonElement) => {
                element.addEventListener('click', () => {
                    if (element.disabled) {
                        return;
                    }

                    Events.emit(Events.onCancelFilters, {});
                });
            });

        document.addEventListener(Events.filtersDirtyStateChange, (e: CustomEvent) => {
            const dirty = Boolean(optional(e.detail).dirty);
            setDisabled(!dirty);
        });
    }
}

