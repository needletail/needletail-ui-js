export default `
<div
    class="needletail-aggregation needletail-aggregation-date-filter needletail-aggregation-date-filter-{{ class_title }} {{ collapsible }} {{ collapsed }}"
    data-selector-exact-input="{{ selector_exact_input }}"
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
            class="needletail-aggregation-date-filter-input needletail-datefilter-flatpickr-exact needletail-datefilter-flatpickr-exact-{{ name }}"
            placeholder="{{ any_label }}"
            readonly
        />

        <!-- Hidden input that DateFilter listens to (exact value) -->
        <input
            type="hidden"
            class="needletail-aggregation-date-filter-input needletail-aggregation-date-filter-input-exact needletail-aggregation-date-filter-input-exact-{{ name }}"
            value="{{ exact }}"
        />

        <!-- JSON array of enabled dates, filled from Needletail aggs when use_aggregation_values=true -->
        {{#use_aggregation_values}}
            <script
                type="application/json"
                class="needletail-aggregation-date-filter-available-values-json needletail-aggregation-date-filter-available-values-json-{{ name }}"
            >{{{ available_values_json }}}</script>
        {{/use_aggregation_values}}
    </div>
</div>
`;

