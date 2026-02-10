export default `
<div
    class="needletail-aggregation needletail-aggregation-date-filter needletail-aggregation-date-filter-{{ class_title }} {{ collapsible }} {{ collapsed }}"
    data-selector-from="{{ selector_from }}"
    data-selector-to="{{ selector_to }}"
    data-min-date="{{ min_date }}"
    data-max-date="{{ max_date }}"
>
    <div class="needletail-aggregation-date-filter-title">
        {{ title }}
    </div>

    <div class="needletail-collapsible-container">
        <!-- Visible input (flatpickr attaches here) -->
        <input
            type="text"
            class="needletail-aggregation-date-filter-input needletail-datefilter-flatpickr-range needletail-datefilter-flatpickr-range-{{ name }}"
            placeholder="{{ any_label }}"
            readonly
        />

        <!-- Hidden inputs DateFilter listens to (range values) -->
        <div class="needletail-hidden">
            <input
                type="hidden"
                class="needletail-aggregation-date-filter-input needletail-aggregation-date-filter-input-from-{{ name }}"
                value="{{ from }}"
            />
            <input
                type="hidden"
                class="needletail-aggregation-date-filter-input needletail-aggregation-date-filter-input-to-{{ name }}"
                value="{{ to }}"
            />
        </div>
    </div>
</div>
`;

