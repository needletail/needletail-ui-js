Documentation can be found here: https://docs.needletail.io/3.0/#/packages/needletail-ui/

## Copy/paste examples

### Apply button mode + active-filter chips (non-breaking, URL-driven)

Apply-mode is enabled automatically when you add the `ApplyFilters` widget.

```js
import {
  Client,
  AggregationBar,
  Result,
  ApplyFilters,
  ActiveFilters,
  Checkbox,
  GeoRadius,
} from "@needletail/ui";

const client = new Client("READ_KEY");

const aggs = new AggregationBar({
  el: ".needletail-aggregation-bar",
  clear_filters: { use: true, top: true, bottom: false },
})
  .addField(
    new Checkbox({
      title: "Brand",
      attribute: "brand",
      collapsible: false,
      default_collapsed: false,
      hide_on_empty: true,
      show_more_options: { use: true, load: 10 },
      search: { use: true, placeholder: "Search brands…" },
    })
  )
  .addField(
    new GeoRadius({
      title: "Location",
      attribute: "location", // geo_point field in your index
      cities_bucket: "nl_cities",
      cities_search_fields: ["city"],
      display_field: "city",
      lat_field: "lat",
      lng_field: "lng",
      default_distance: "25km",
      show_geolocation: true,
    })
  );

client
  .addMultipleWidgets([
    aggs,
    new ActiveFilters({ el: ".needletail-active-filters" }),
    new ApplyFilters({ el: ".needletail-apply-filters", text: "Apply", cancel_text: "Cancel" }),
    new Result({ el: ".needletail-results", buckets: ["products"] }),
  ])
  .init();
```

### DropdownSelect aggregation

```js
import { DropdownSelect } from "@needletail/ui";

export default new DropdownSelect({
  title: "Color",
  attribute: "color",
  any_label: "Any color",
  hide_on_empty: true,
  option_order: [],
  filter_options: [],
});
```

### DatePresets aggregation

```js
import { DatePresets } from "@needletail/ui";

export default new DatePresets({
  title: "Created at",
  attribute: "created_at",
  show_custom: true,
  input_type: "date",
  min_date: "2024-01-01",
  max_date: "2026-12-31",
  presets: [
    { key: "today", label: "Today" },
    { key: "last_7_days", label: "Last 7 days" },
    { key: "this_month", label: "This month" },
    { key: "custom", label: "Custom" },
  ],
});
```

### MultiDate aggregation (Flatpickr “multiple” mode friendly)

```js
import { MultiDate } from "@needletail/ui";

export default new MultiDate({
  title: "Delivery dates",
  attribute: "delivery_date",
  input_type: "date",
  any_label: "Pick a date",
  add_label: "Add",
});
```
