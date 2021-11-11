import template from './../../Html/Aggregations/slider.html';
import templateRange from './../../Html/Aggregations/slider_range.html';
import {Aggregation} from './../../Imports/BaseClasses';
import Mustache from 'mustache';
import _debounce from 'lodash/debounce';
import {Events, URIHelper} from '../../Imports/Helpers';
// eslint-disable-next-line no-unused-vars
import {SliderSettings, SliderRange, SliderElements} from '../../Imports/Interfaces';

export class Slider extends Aggregation {
    discriminator: string = 'Range';
    min: number;
    max: number;
    defaultValue: number;
    range: boolean = false;
    defaultRangeMin: number;
    defaultRangeMax: number;
    ranges: {[key: string]: SliderRange};
    elements: {[key: string]: SliderElements};
    type: string = 'to';
    allowedTypes: string[] = ['to', 'from', 'from:to'];
    inputs: string = 'top';
    allowedInputs: string[] = ['top', 'bottom'];
    displayOnly: boolean = false;

    constructor(options: SliderSettings = {}) {
        super(options);

        this.setRange(options.min || 0, options.max || 10);
        this.setDefaultValue((typeof options.default_value === 'number') ? options.default_value : 5);
        this.setRangeSlider((typeof options.range !== 'undefined') ?
            options.range : this.getRangeSlider());
        this.setDefaultRangeMin(options.default_range_min || this.getMin());
        this.setDefaultRangeMax(options.default_range_max || this.getMax());
        this.setType(options.type || this.getType());
        this.setInputs(options.inputs || this.getInputs());
        this.setDisplayOnly((typeof options.display_only !== 'undefined') ?
            options.display_only : this.getDisplayOnly());

        let value = this.getDefaultValue().toString();
        if (this.getRangeSlider()) {
            this.setType('from:to');
            value = this.getDefaultRangeMin() + ':' + this.getDefaultRangeMax();
        }

        this.value = {
            field: this.getAttribute(),
            value: value,
            type: this.getType(),
            is_aggregation: true,
            exclude_from_search: true,
        };

        this.ranges = {};
        this.elements = {};
    }

    setDisplayOnly(displayOnly: boolean): Slider {
        this.displayOnly = displayOnly;
        return this;
    }

    getDisplayOnly(): boolean {
        return this.displayOnly;
    }

    setType(type: string): Slider {
        if (this.allowedTypes.indexOf(type) === -1) {
            type = 'to';
        } else if (type === 'from:to' && !this.getRangeSlider()) {
            type = 'to';
        }
        this.type = type;
        return this;
    }

    getType(): string {
        return this.type;
    }

    setInputs(inputs: string): Slider {
        if (this.allowedInputs.indexOf(inputs) === -1) {
            inputs = 'top';
        }
        this.inputs = inputs;
        return this;
    }

    getInputs(): string {
        return this.inputs;
    }

    setRangeSlider(rangeSlider: boolean): Slider {
        this.range = rangeSlider;
        return this;
    }

    getRangeSlider(): boolean {
        return this.range;
    }

    setMin(min: number): Slider {
        this.min = min;
        return this;
    }

    getMin(): number {
        return this.min;
    }

    setMax(max: number): Slider {
        this.max = max;
        return this;
    }

    getMax(): number {
        return this.max;
    }

    setDefaultValue(value: number): Slider {
        this.defaultValue = value;
        return this;
    }

    getDefaultValue(): number {
        return this.defaultValue;
    }

    setDefaultRangeMin(min: number): Slider {
        this.defaultRangeMin = min;
        return this;
    }

    getDefaultRangeMin(): number {
        return this.defaultRangeMin;
    }

    setDefaultRangeMax(max: number): Slider {
        this.defaultRangeMax = max;
        return this;
    }

    getDefaultRangeMax(): number {
        return this.defaultRangeMax;
    }

    setRange(min: number, max: number): Slider {
        this.setMin(min);
        this.setMax(max);
        return this;
    }

    getTemplate(): string {
        if (this.template) {
            return this.template;
        }

        if (this.getRangeSlider()) {
            return templateRange;
        }

        return template;
    }

    render(): string {
        const template = this.getTemplate();
        return Mustache.render(template, {
            title: this.getTitle(),
            class_title: this.getClassTitle(),
            name: this.getClassTitle(),
            min: this.getMin(),
            max: this.getMax(),
            value: this.getDefaultValue(),
            collapsible: (this.getCollapsible()) ? 'needletail-collapsible' : '',
            collapsed: (this.getCollapsible() && this.getDefaultCollapsed()) ? 'needletail-collapsed' : '',
            inputs_bottom: (this.getInputs() === 'bottom'),
            inputs_top: (this.getInputs() === 'top'),
            display_only: (this.getDisplayOnly()) ? 'display-only' : '',
        });
    }

    /**
     * Add listeners, set the default value
     */
    executeJS() {
        const title = this.getTitle();
        const prevVal = URIHelper.getSearchParam(title);

        // eslint-disable-next-line max-len
        document.querySelectorAll(`.needletail-aggregation-slider-input.needletail-aggregation-slider-input-${this.getClassTitle()}`)
            .forEach((element: HTMLInputElement) => {
                element.value = prevVal || this.getDefaultValue().toString();
                document.addEventListener('DOMContentLoaded', () => {
                    this.handle(element, true);
                });

                element.addEventListener('change', () => {
                    this.handle(element);
                });
            });

        document.querySelectorAll('.needletail-aggregation-slider-container__range').forEach((element: HTMLInputElement) => {
            document.addEventListener('DOMContentLoaded', () => {
                this.elements[this.getClassTitle()] = {
                    slider: element.querySelector('.needletail-aggregation-slider-range'),
                    inputMin: element.querySelector('.needletail-aggregation-slider-input-min'),
                    inputMax: element.querySelector('.needletail-aggregation-slider-input-max'),
                    leftSlider: element.querySelector('.needletail-aggregation-slider-range-left'),
                    rightSlider: element.querySelector('.needletail-aggregation-slider-range-right'),
                    divider: element.querySelector('.needletail-aggregation-slider-range-divider'),
                };

                const slider = this.elements[this.getClassTitle()].slider;
                const inputMin = this.elements[this.getClassTitle()].inputMin;
                const inputMax = this.elements[this.getClassTitle()].inputMax;
                const leftSlider = this.elements[this.getClassTitle()].leftSlider;
                const rightSlider = this.elements[this.getClassTitle()].rightSlider;
                const divider = this.elements[this.getClassTitle()].divider;

                inputMin.value = URIHelper.getSearchParam(title + '[min]') || this.getDefaultRangeMin().toString();
                inputMax.value = URIHelper.getSearchParam(title + '[max]') || this.getDefaultRangeMax().toString();

                [inputMin, inputMax].forEach((input: HTMLInputElement) => {
                    input.min = this.getMin().toString();
                    input.max = this.getMax().toString();
                });

                this.ranges[this.getClassTitle()] = this.calculatePositions(slider, leftSlider, rightSlider);
                window.onresize = (e: UIEvent) => {
                    this.ranges[this.getClassTitle()] = this.calculatePositions(slider, leftSlider, rightSlider);
                    this.calculateDivider(divider, leftSlider, rightSlider);
                };

                inputMin.addEventListener('change', _debounce(() => {
                    if (parseInt(inputMin.value) < this.getMin()) {
                        inputMin.value = this.getMin().toString();
                    } else if (parseInt(inputMin.value) > parseInt(inputMax.value)) {
                        inputMin.value = inputMax.value;
                    }

                    const percentage = ((100 / this.getMax()) * parseInt(inputMin.value));
                    leftSlider.style.left = percentage + '%';
                    inputMax.min = inputMin.value;

                    this.calculateDivider(divider, leftSlider, rightSlider);
                    this.handleRange(inputMin, inputMax);
                }, 200));

                inputMax.addEventListener('change', _debounce(() => {
                    if (parseInt(inputMax.value) > this.getMax()) {
                        inputMax.value = this.getMax().toString();
                    } else if (parseInt(inputMax.value) < parseInt(inputMin.value)) {
                        inputMax.value = inputMin.value;
                    }

                    const percentage = ((100 / this.getMax()) * parseInt(inputMax.value));
                    rightSlider.style.left = `${percentage}%`;
                    inputMin.max = inputMax.value;

                    this.calculateDivider(divider, leftSlider, rightSlider);
                    this.handleRange(inputMin, inputMax);
                }, 200));

                leftSlider.addEventListener('mousedown', (e) => {
                    document.onmousemove = (e) => {
                        e.preventDefault();
                        this.moveLeft(e);
                    };

                    document.onmouseup = (e) => {
                        document.onmouseup = null;
                        document.onmousemove = null;
                    };
                });

                leftSlider.addEventListener('touchstart', (e) => {
                    document.ontouchmove = (e) => {
                        e.preventDefault();
                        this.moveLeft(e);
                    };

                    document.ontouchend = (e) => {
                        document.ontouchend = null;
                        document.ontouchmove = null;
                    };
                });

                rightSlider.addEventListener('mousedown', (e) => {
                    document.onmousemove = (e) => {
                        e.preventDefault();
                        this.moveRight(e);
                    };

                    document.onmouseup = (e) => {
                        document.onmouseup = null;
                        document.onmousemove = null;
                    };
                });

                rightSlider.addEventListener('touchstart', (e) => {
                    document.ontouchmove = (e) => {
                        e.preventDefault();
                        this.moveRight(e);
                    };

                    document.ontouchend = (e) => {
                        document.ontouchend = null;
                        document.ontouchmove = null;
                    };
                });

                if (URIHelper.getSearchParam(title + '[min]')) {
                    leftSlider.style.left = (100 / this.getMax()) * parseInt(inputMin.value) + '%';
                }

                if (URIHelper.getSearchParam(title + '[max]')) {
                    rightSlider.style.left = `${(100 / this.getMax()) * parseInt(inputMax.value)}%`;
                }
                this.calculateDivider(divider, leftSlider, rightSlider);
            });
        });

        // eslint-disable-next-line max-len
        document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-slider.needletail-aggregation-slider-${this.getClassTitle()}`)
            .forEach((element) => {
                if (this.getCollapsible()) {
                    element.querySelector('.needletail-aggregation-slider-title')
                        .addEventListener('click', (e) => {
                            if (element.classList.contains('needletail-collapsed')) {
                                element.classList.remove('needletail-collapsed');
                            } else {
                                element.classList.add('needletail-collapsed');
                            }
                        });
                }
            });
    }

    handle(element: any, skipHistory = false) {
        if (!skipHistory) {
            URIHelper.addToHistory(this.getTitle(), element.value);
        }

        this.value = {
            field: this.getAttribute(),
            value: element.value,
            type: this.getType(),
            is_aggregation: true,
        };

        this.hasActiveAggregation = true;
        if (!element.value) {
            this.value = {
                field: this.getAttribute(),
                value: this.getDefaultValue(),
                type: this.getType(),
                is_aggregation: true,
                exclude_from_search: true,
            };

            this.hasActiveAggregation = false;
        }

        Events.emit(Events.onBeforeResultRequest, {});
        Events.emit(Events.onAggregationValueChange, {
            'name': this.getAttribute(),
            'hasActive': this.hasActiveAggregation,
        });
    }

    handleRange(inputMin: any, inputMax: any, skipHistory = false) {
        if (!skipHistory) {
            URIHelper.addToHistory(this.getTitle() + '[min]', inputMin.value);
            URIHelper.addToHistory(this.getTitle() + '[max]', inputMax.value);
        }

        this.value = {
            field: this.getAttribute(),
            value: inputMin.value + ':' + inputMax.value,
            type: this.getType(),
            is_aggregation: true,
        };

        this.hasActiveAggregation = true;
        if (!inputMin.value && !inputMax.value) {
            this.value = {
                field: this.getAttribute(),
                value: this.getMin() + ':' + this.getMax(),
                type: this.getType(),
                is_aggregation: true,
                exclude_from_search: true,
            };

            this.hasActiveAggregation = false;
        }

        Events.emit(Events.onBeforeResultRequest, {});
        Events.emit(Events.onAggregationValueChange, {
            'name': this.getAttribute(),
            'hasActive': this.hasActiveAggregation,
        });
    }

    reset() {
        // eslint-disable-next-line max-len
        document.querySelectorAll(`.needletail-aggregation-slider-input.needletail-aggregation-slider-input-${this.getClassTitle()}`)
            .forEach((element: HTMLInputElement) => {
                element.value = this.getDefaultValue().toString();
                this.handle(element);

                URIHelper.addToHistory(this.getTitle(), element.value, true);
                Events.emit(Events.onAggregationValueChange, {
                    'name': this.getAttribute(),
                    'hasActive': false,
                });
            });

        document.querySelectorAll('.needletail-aggregation-slider-container__range')
            .forEach((element: HTMLInputElement) => {
                const inputMin = this.elements[this.getClassTitle()].inputMin;
                const inputMax = this.elements[this.getClassTitle()].inputMax;
                const leftSlider = this.elements[this.getClassTitle()].leftSlider;
                const rightSlider = this.elements[this.getClassTitle()].rightSlider;
                const divider = this.elements[this.getClassTitle()].divider;

                inputMin.value = this.getDefaultRangeMin().toString();
                inputMax.value = this.getDefaultRangeMax().toString();

                leftSlider.style.left = (100 / this.getMax()) * parseInt(inputMin.value) + '%';
                rightSlider.style.left = (100 / this.getMax()) * parseInt(inputMax.value) + '%';

                this.handleRange(inputMin, inputMax);
                this.calculateDivider(divider, leftSlider, rightSlider);

                URIHelper.addToHistory(this.getTitle() + '[min]', inputMin.value, true);
                URIHelper.addToHistory(this.getTitle() + '[max]', inputMax.value, true);
                Events.emit(Events.onAggregationValueChange, {
                    'name': this.getAttribute(),
                    'hasActive': false,
                });

                this.ranges[this.getClassTitle()].leftPosition = this.ranges[this.getClassTitle()].startLeft;
                this.ranges[this.getClassTitle()].rightPosition = this.ranges[this.getClassTitle()].startRight;
            });
    }

    calculatePositions(slider: HTMLElement, leftSlider: HTMLElement, rightSlider: HTMLElement): SliderRange {
        const startLeft: number = slider.getBoundingClientRect().x;
        const startRight: number = slider.getBoundingClientRect().x + slider.offsetWidth;
        const leftPosition: number = leftSlider.getBoundingClientRect().x;
        const rightPosition: number = rightSlider.getBoundingClientRect().x;
        const total: number = startRight - startLeft;

        return {
            startLeft: startLeft,
            startRight: startRight,
            leftPosition: leftPosition,
            rightPosition: rightPosition,
            total: total,
        };
    }

    calculateDivider(divider: HTMLElement, leftSlider: HTMLElement, rightSlider: HTMLElement) {
        const width = rightSlider.offsetLeft - leftSlider.offsetLeft;

        divider.style.width = width + 'px';
        divider.style.left = `${leftSlider.style.left}`;
    }

    moveRight(e: any) {
        const clientX = e.clientX ?? e.touches[0].clientX;
        const inputMax = this.elements[this.getClassTitle()].inputMax;
        const leftSlider = this.elements[this.getClassTitle()].leftSlider;
        const rightSlider = this.elements[this.getClassTitle()].rightSlider;
        const divider = this.elements[this.getClassTitle()].divider;

        if (!this.ranges[this.getClassTitle()]) {
            return;
        }

        let newLeft: number = (clientX - rightSlider.offsetWidth);

        if (newLeft < this.ranges[this.getClassTitle()].leftPosition) {
            newLeft = this.ranges[this.getClassTitle()].leftPosition;
        } else if (newLeft > this.ranges[this.getClassTitle()].startRight) {
            newLeft = this.ranges[this.getClassTitle()].startRight;
        }

        this.ranges[this.getClassTitle()].rightPosition = newLeft;
        const percentage: number = (100 / this.ranges[this.getClassTitle()].total) *
            (newLeft - this.ranges[this.getClassTitle()].startLeft);
        rightSlider.style.left = `${percentage}%`;
        inputMax.value = Math.round(((this.getMax() / 100) * percentage) + this.getMin()).toString();
        inputMax.dispatchEvent(new Event('change'));
        this.calculateDivider(divider, leftSlider, rightSlider);
    }

    moveLeft(e: any) {
        const clientX = e.clientX ?? e.touches[0].clientX;
        const inputMin = this.elements[this.getClassTitle()].inputMin;
        const leftSlider = this.elements[this.getClassTitle()].leftSlider;
        const rightSlider = this.elements[this.getClassTitle()].rightSlider;
        const divider = this.elements[this.getClassTitle()].divider;

        if (!this.ranges[this.getClassTitle()]) {
            return;
        }

        let newLeft: number = (clientX - (leftSlider.offsetWidth / 2));

        if (newLeft > this.ranges[this.getClassTitle()].rightPosition) {
            newLeft = this.ranges[this.getClassTitle()].rightPosition;
        } else if (newLeft < this.ranges[this.getClassTitle()].startLeft) {
            newLeft = this.ranges[this.getClassTitle()].startLeft;
        }

        this.ranges[this.getClassTitle()].leftPosition = newLeft;
        const percentage: number = (100 / this.ranges[this.getClassTitle()].total) *
            (newLeft - this.ranges[this.getClassTitle()].startLeft);
        leftSlider.style.left = percentage + '%';
        inputMin.value = Math.round(((this.getMax() / 100) * percentage) + this.getMin()).toString();
        inputMin.dispatchEvent(new Event('change'));
        this.calculateDivider(divider, leftSlider, rightSlider);
    }
}
