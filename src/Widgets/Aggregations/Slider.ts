import template from './../../Html/Aggregations/slider.html';
import templateRange from './../../Html/Aggregations/slider_range.html';
import {Aggregation} from './../../Imports/BaseClasses';
import Mustache from "mustache";
import _debounce from "lodash/debounce";
import {Events, URIHelper} from "../../Imports/Helpers";
import {SliderSettings, SliderRange} from "../../Imports/Interfaces";

export class Slider extends Aggregation {
    discriminator: string = 'Range';
    min: number;
    max: number;
    defaultValue: number;
    range: boolean = false;
    defaultRangeMin: number;
    defaultRangeMax: number;
    ranges: {[key: string]: SliderRange};
    type: string;
    allowedTypes: string[] = ['to', 'from'];

    constructor(options: SliderSettings = {}) {
        super(options);

        this.min = options.min || 0;
        this.max = options.max || 10;
        this.defaultValue = options.default_value || 5;
        this.range = (typeof options.range !== 'undefined') ? options.range : this.range;
        this.defaultRangeMin = options.default_range_min || 0;
        this.defaultRangeMax = options.default_range_max || 10;
        this.type = options.type || 'to';

        if (this.allowedTypes.indexOf(this.type) === -1) {
            this.type = 'to';
        }

        let value = this.defaultValue.toString();
        if (this.range) {
            this.type = 'from:to';
            value = this.defaultRangeMin + ':' + this.defaultRangeMax;
        }

        this.value = {
            field: this.attribute,
            value: value,
            type: this.type,
            is_aggregation: true,
            exclude_from_search: true,
        }

        this.ranges = {};
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
        this.min = min;
        this.max = max;
        return this;
    }

    getTemplate(): string {
        if (this.template) {
            return this.template;
        }

        if (this.range) {
            return templateRange;
        }

        return template;
    }

    /**
     * Renders the template for the aggregation
     * @param options
     */
    render(): string {
        let template = this.getTemplate();
        return Mustache.render(template, {
            title: this.getTitle(),
            classTitle: this.classTitle,
            name: this.getTitle(),
            min: this.getMin(),
            max: this.getMax(),
            value: this.getDefaultValue(),
            collapsible: (this.getCollapsible()) ? 'needletail-collapsible' : '',
            collapsed: (this.getCollapsible() && this.getDefaultCollapsed()) ? 'needletail-collapsed' : ''
        });
    }

    /**
     * Add listeners, set the default value
     */
    executeJS() {
        let title = this.getTitle();
        let prevVal = URIHelper.getSearchParam(title);

        document.querySelectorAll(`.needletail-aggregation-slider-input.needletail-aggregation-slider-input-${this.classTitle}`).forEach((element: HTMLInputElement) => {
            element.value = prevVal || this.getDefaultValue().toString();
            document.addEventListener("DOMContentLoaded", () => {
                this.handle(element, true);
            });

            element.addEventListener('change', () => {
                this.handle(element);
            });
        });

        document.querySelectorAll('.needletail-aggregation-slider-container__range').forEach((element: HTMLInputElement) => {
            document.addEventListener("DOMContentLoaded", () => {
                let slider: HTMLElement = element.querySelector('.needletail-aggregation-slider-range');
                let inputMin: HTMLInputElement = element.querySelector('.needletail-aggregation-slider-input-min');
                let inputMax: HTMLInputElement = element.querySelector('.needletail-aggregation-slider-input-max');
                let leftSlider: HTMLElement = element.querySelector('.needletail-aggregation-slider-range-left');
                let rightSlider: HTMLElement = element.querySelector('.needletail-aggregation-slider-range-right');

                inputMin.value = URIHelper.getSearchParam(title + '[min]') || this.defaultRangeMin.toString();
                inputMax.value = URIHelper.getSearchParam(title + '[max]') || this.defaultRangeMax.toString();

                [inputMin, inputMax].forEach((input: HTMLInputElement) => {
                    input.min = this.min.toString();
                    input.max = this.max.toString();
                });

                this.ranges[this.discriminator] = this.calculatePositions(slider, leftSlider, rightSlider);
                window.onresize = (e: UIEvent) => {
                    this.ranges[this.discriminator] = this.calculatePositions(slider, leftSlider, rightSlider);
                }

                inputMin.addEventListener('change', _debounce(() => {
                    if (parseInt(inputMin.value) < this.min) {
                        inputMin.value = this.min.toString();
                    } else if (parseInt(inputMin.value) > parseInt(inputMax.value)) {
                        inputMin.value = inputMax.value;
                    }

                    let percentage = ((100 / this.min) * parseInt(inputMin.value));
                    leftSlider.style.left = percentage + '%';
                    inputMax.min = inputMin.value;

                    this.handleRange(inputMin, inputMax);
                }, 200));

                inputMax.addEventListener('change', _debounce(() => {
                    if (parseInt(inputMax.value) > this.max) {
                        inputMax.value = this.max.toString();
                    } else if (parseInt(inputMax.value) < parseInt(inputMin.value)) {
                        inputMax.value = inputMin.value;
                    }

                    let percentage = ((100 / this.max) * parseInt(inputMax.value));
                    rightSlider.style.left = percentage + '%';
                    inputMin.max = inputMax.value;

                    this.handleRange(inputMin, inputMax);
                }, 200));

                leftSlider.addEventListener('mousedown', (e) => {
                    document.onmousemove = (e) => {
                        if (!this.ranges[this.discriminator]) {
                            return;
                        }

                        let newLeft: number = (e.clientX - (leftSlider.offsetWidth / 2));

                        if (newLeft > this.ranges[this.discriminator].rightPosition) {
                            newLeft = this.ranges[this.discriminator].rightPosition;
                        } else if (newLeft < this.ranges[this.discriminator].startLeft) {
                            newLeft = this.ranges[this.discriminator].startLeft;
                        }

                        this.ranges[this.discriminator].leftPosition = newLeft;
                        let percentage: number = (100 / this.ranges[this.discriminator].total) * (newLeft - this.ranges[this.discriminator].startLeft);
                        leftSlider.style.left = percentage + "%";
                        inputMin.value = Math.round(((this.max / 100) * percentage) + this.min).toString();
                        inputMin.dispatchEvent(new Event('change'));
                    };

                    document.onmouseup = (e) => {
                        document.onmouseup = null;
                        document.onmousemove = null;
                    }
                });

                rightSlider.addEventListener('mousedown', (e) => {
                    document.onmousemove = (e) => {
                        if (!this.ranges[this.discriminator]) {
                            return;
                        }

                        let newLeft: number = (e.clientX + (rightSlider.offsetWidth / 2));

                        if (newLeft < this.ranges[this.discriminator].leftPosition) {
                            newLeft = this.ranges[this.discriminator].leftPosition;
                        } else if (newLeft > this.ranges[this.discriminator].startRight) {
                            newLeft = this.ranges[this.discriminator].startRight;
                        }

                        this.ranges[this.discriminator].rightPosition = newLeft;
                        let percentage: number = (100 / this.ranges[this.discriminator].total) * (newLeft - this.ranges[this.discriminator].startLeft);
                        rightSlider.style.left = percentage + "%";
                        inputMax.value = Math.round(((this.max / 100) * percentage) + this.min).toString();
                        inputMax.dispatchEvent(new Event('change'));
                    };

                    document.onmouseup = (e) => {
                        document.onmouseup = null;
                        document.onmousemove = null;
                    }
                });

                if (URIHelper.getSearchParam(title + '[min]')) {
                    leftSlider.style.left = (100 / this.max) * parseInt(inputMin.value) + '%';
                }

                if (URIHelper.getSearchParam(title + '[max]')) {
                    rightSlider.style.left = (100 / this.max) * parseInt(inputMax.value) + '%';
                }
            });
        });

        document.querySelectorAll(`.needletail-aggregation.needletail-aggregation-slider.needletail-aggregation-slider-${this.classTitle}`).forEach((element) => {
            if (this.getCollapsible()) {
                element.addEventListener('click', (e) => {
                    if (element.classList.contains('needletail-collapsed')) {
                        element.classList.remove('needletail-collapsed');
                    } else {
                        element.classList.add('needletail-collapsed');
                    }
                });
            }
        });
    }

    /**
     * Handles the setting of the URL and putting the correct value in for the search
     * @param element
     * @param skipHistory
     */
    handle(element: any, skipHistory = false) {
        if (!skipHistory) {
            URIHelper.addToHistory(this.getTitle(), element.value);
        }

        this.value = {
            field: this.attribute,
            value: element.value,
            type: this.type,
            is_aggregation: true
        };

        this.hasActiveAggregation = true;
        if (!element.value) {
            this.value = {
                field: this.attribute,
                value: this.defaultValue,
                type: this.type,
                is_aggregation: true,
                exclude_from_search: true,
            }

            this.hasActiveAggregation = false;
        }

        Events.emit(Events.onBeforeResultRequest, {});
        Events.emit(Events.onAggregationValueChange, {
            'name': this.attribute,
            'hasActive': this.hasActiveAggregation
        });
    }

    handleRange(inputMin: any, inputMax: any, skipHistory = false) {
        if (!skipHistory) {
            URIHelper.addToHistory(this.getTitle() + '[min]', inputMin.value);
            URIHelper.addToHistory(this.getTitle() + '[max]', inputMax.value);
        }

        this.value = {
            field: this.attribute,
            value: inputMin.value + ':' + inputMax.value,
            type: this.type,
            is_aggregation: true
        };

        this.hasActiveAggregation = true;
        if (!inputMin.value && !inputMax.value) {
            this.value = {
                field: this.attribute,
                value: this.min + ':' + this.max,
                type: this.type,
                is_aggregation: true,
                exclude_from_search: true,
            }

            this.hasActiveAggregation = false;
        }

        Events.emit(Events.onBeforeResultRequest, {});
        Events.emit(Events.onAggregationValueChange, {
            'name': this.attribute,
            'hasActive': this.hasActiveAggregation
        });
    }

    reset() {
        document.querySelectorAll(`.needletail-aggregation-slider-input.needletail-aggregation-slider-input-${this.classTitle}`).forEach((element: HTMLInputElement) => {
            element.value = this.getDefaultValue().toString();
            this.handle(element);

            URIHelper.addToHistory(this.getTitle(), element.value, true);
            Events.emit(Events.onAggregationValueChange, {
                'name': this.attribute,
                'hasActive': false
            });
        });

        document.querySelectorAll('.needletail-aggregation-slider-container__range').forEach((element: HTMLInputElement) => {
            let inputMin: HTMLInputElement = element.querySelector('.needletail-aggregation-slider-input-min');
            let inputMax: HTMLInputElement = element.querySelector('.needletail-aggregation-slider-input-max');
            let leftSlider: HTMLElement = element.querySelector('.needletail-aggregation-slider-range-left');
            let rightSlider: HTMLElement = element.querySelector('.needletail-aggregation-slider-range-right');

            inputMin.value = this.defaultRangeMin.toString();
            inputMax.value = this.defaultRangeMax.toString();

            leftSlider.style.left = (100 / this.max) * parseInt(inputMin.value) + '%';
            rightSlider.style.left = (100 / this.max) * parseInt(inputMax.value) + '%';

            this.handleRange(inputMin, inputMax);

            URIHelper.addToHistory(this.getTitle() + '[min]', inputMin.value, true);
            URIHelper.addToHistory(this.getTitle() + '[max]', inputMax.value, true);
            Events.emit(Events.onAggregationValueChange, {
                'name': this.attribute,
                'hasActive': false
            });
        });
    }

    calculatePositions(slider: HTMLElement, leftSlider: HTMLElement, rightSlider: HTMLElement): SliderRange {
        let startLeft: number = slider.getBoundingClientRect().x;
        let startRight: number = slider.getBoundingClientRect().x + slider.offsetWidth;
        let leftPosition: number = leftSlider.getBoundingClientRect().x;
        let rightPosition: number = rightSlider.getBoundingClientRect().x;
        let total: number = startRight - startLeft;

        return {
            startLeft: startLeft,
            startRight: startRight,
            leftPosition: leftPosition,
            rightPosition: rightPosition,
            total: total
        };
    }
}
