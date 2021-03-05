import template from './../../Html/Aggregations/slider.html';
import templateRange from './../../Html/Aggregations/slider_range.html';
import {Aggregation} from './../../Imports/BaseClasses';
import Mustache from "mustache";
import _debounce from "lodash/debounce";
import {Events, URIHelper} from "../../Imports/Helpers";
import {SliderSettings, SliderRange, SliderElements} from "../../Imports/Interfaces";

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
    type: string;
    allowedTypes: string[] = ['to', 'from'];

    constructor(options: SliderSettings = {}) {
        super(options);

        this.min = options.min || 0;
        this.max = options.max || 10;
        this.defaultValue = options.default_value || 5;
        this.range = (typeof options.range !== 'undefined') ? options.range : this.range;
        this.defaultRangeMin = options.default_range_min || this.min;
        this.defaultRangeMax = options.default_range_max || this.max;
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
        this.elements = {};
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
                this.elements[this.classTitle] = {
                    slider: element.querySelector('.needletail-aggregation-slider-range'),
                    inputMin: element.querySelector('.needletail-aggregation-slider-input-min'),
                    inputMax: element.querySelector('.needletail-aggregation-slider-input-max'),
                    leftSlider: element.querySelector('.needletail-aggregation-slider-range-left'),
                    rightSlider: element.querySelector('.needletail-aggregation-slider-range-right'),
                    divider: element.querySelector('.needletail-aggregation-slider-range-divider')
                };

                let slider = this.elements[this.classTitle].slider;
                let inputMin = this.elements[this.classTitle].inputMin;
                let inputMax = this.elements[this.classTitle].inputMax;
                let leftSlider = this.elements[this.classTitle].leftSlider;
                let rightSlider = this.elements[this.classTitle].rightSlider;
                let divider = this.elements[this.classTitle].divider;

                inputMin.value = URIHelper.getSearchParam(title + '[min]') || this.defaultRangeMin.toString();
                inputMax.value = URIHelper.getSearchParam(title + '[max]') || this.defaultRangeMax.toString();

                [inputMin, inputMax].forEach((input: HTMLInputElement) => {
                    input.min = this.min.toString();
                    input.max = this.max.toString();
                });

                this.ranges[this.classTitle] = this.calculatePositions(slider, leftSlider, rightSlider);
                window.onresize = (e: UIEvent) => {
                    this.ranges[this.classTitle] = this.calculatePositions(slider, leftSlider, rightSlider);
                    this.calculateDivider(divider, leftSlider, rightSlider);
                }

                inputMin.addEventListener('change', _debounce(() => {
                    if (parseInt(inputMin.value) < this.min) {
                        inputMin.value = this.min.toString();
                    } else if (parseInt(inputMin.value) > parseInt(inputMax.value)) {
                        inputMin.value = inputMax.value;
                    }

                    let percentage = ((100 / this.max) * parseInt(inputMin.value));
                    leftSlider.style.left = percentage + '%';
                    inputMax.min = inputMin.value;

                    this.calculateDivider(divider, leftSlider, rightSlider);
                    this.handleRange(inputMin, inputMax);
                }, 200));

                inputMax.addEventListener('change', _debounce(() => {
                    if (parseInt(inputMax.value) > this.max) {
                        inputMax.value = this.max.toString();
                    } else if (parseInt(inputMax.value) < parseInt(inputMin.value)) {
                        inputMax.value = inputMin.value;
                    }

                    let percentage = ((100 / this.max) * parseInt(inputMax.value));
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
                    }
                });

                leftSlider.addEventListener('touchstart', (e) => {
                    document.ontouchmove = (e) => {
                        e.preventDefault();
                        this.moveLeft(e);
                    };

                    document.ontouchend = (e) => {
                        document.ontouchend = null;
                        document.ontouchmove = null;
                    }
                })

                rightSlider.addEventListener('mousedown', (e) => {
                    document.onmousemove = (e) => {
                        e.preventDefault();
                        this.moveRight(e);
                    }

                    document.onmouseup = (e) => {
                        document.onmouseup = null;
                        document.onmousemove = null;
                    }
                });

                rightSlider.addEventListener('touchstart', (e) => {
                    document.ontouchmove = (e) => {
                        e.preventDefault();
                        this.moveRight(e);
                    }

                    document.ontouchend = (e) => {
                        document.ontouchend = null;
                        document.ontouchmove = null;
                    }
                });

                if (URIHelper.getSearchParam(title + '[min]')) {
                    leftSlider.style.left = (100 / this.max) * parseInt(inputMin.value) + '%';
                }

                if (URIHelper.getSearchParam(title + '[max]')) {
                    rightSlider.style.left = `${(100 / this.max) * parseInt(inputMax.value)}%`;
                }
                this.calculateDivider(divider, leftSlider, rightSlider);
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
            let inputMin = this.elements[this.classTitle].inputMin;
            let inputMax = this.elements[this.classTitle].inputMax;
            let leftSlider = this.elements[this.classTitle].leftSlider;
            let rightSlider = this.elements[this.classTitle].rightSlider;
            let divider = this.elements[this.classTitle].divider;

            inputMin.value = this.defaultRangeMin.toString();
            inputMax.value = this.defaultRangeMax.toString();

            leftSlider.style.left = (100 / this.max) * parseInt(inputMin.value) + '%';
            rightSlider.style.left = (100 / this.max) * parseInt(inputMax.value) + '%';

            this.handleRange(inputMin, inputMax);
            this.calculateDivider(divider, leftSlider, rightSlider);

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

    calculateDivider(divider: HTMLElement, leftSlider: HTMLElement, rightSlider: HTMLElement) {
        let width = rightSlider.offsetLeft - leftSlider.offsetLeft;

        divider.style.width = width + 'px';
        divider.style.left = `${leftSlider.style.left}`;
    }

    moveRight(e: any) {
        let clientX = e.clientX ?? e.touches[0].clientX;
        let inputMax = this.elements[this.classTitle].inputMax;
        let leftSlider = this.elements[this.classTitle].leftSlider;
        let rightSlider = this.elements[this.classTitle].rightSlider;
        let divider = this.elements[this.classTitle].divider;

        if (!this.ranges[this.classTitle]) {
            return;
        }

        let newLeft: number = (clientX - rightSlider.offsetWidth);

        if (newLeft < this.ranges[this.classTitle].leftPosition) {
            newLeft = this.ranges[this.classTitle].leftPosition;
        } else if (newLeft > this.ranges[this.classTitle].startRight) {
            newLeft = this.ranges[this.classTitle].startRight;
        }

        this.ranges[this.classTitle].rightPosition = newLeft;
        let percentage: number = (100 / this.ranges[this.classTitle].total) * (newLeft - this.ranges[this.classTitle].startLeft);
        rightSlider.style.left = `${percentage}%`;
        inputMax.value = Math.round(((this.max / 100) * percentage) + this.min).toString();
        inputMax.dispatchEvent(new Event('change'));
        this.calculateDivider(divider, leftSlider, rightSlider);
    }

    moveLeft(e: any) {
        let clientX = e.clientX ?? e.touches[0].clientX;
        let inputMin = this.elements[this.classTitle].inputMin;
        let leftSlider = this.elements[this.classTitle].leftSlider;
        let rightSlider = this.elements[this.classTitle].rightSlider;
        let divider = this.elements[this.classTitle].divider;

        if (!this.ranges[this.classTitle]) {
            return;
        }

        let newLeft: number = (clientX - (leftSlider.offsetWidth / 2));

        if (newLeft > this.ranges[this.classTitle].rightPosition) {
            newLeft = this.ranges[this.classTitle].rightPosition;
        } else if (newLeft < this.ranges[this.classTitle].startLeft) {
            newLeft = this.ranges[this.classTitle].startLeft;
        }

        this.ranges[this.classTitle].leftPosition = newLeft;
        let percentage: number = (100 / this.ranges[this.classTitle].total) * (newLeft - this.ranges[this.classTitle].startLeft);
        leftSlider.style.left = percentage + "%";
        inputMin.value = Math.round(((this.max / 100) * percentage) + this.min).toString();
        inputMin.dispatchEvent(new Event('change'));
        this.calculateDivider(divider, leftSlider, rightSlider);
    }
}
