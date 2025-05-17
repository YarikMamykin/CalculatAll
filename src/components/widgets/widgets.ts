import { defineAsyncComponent, type Component as AsyncComponent } from "vue";
import { StandardWidget } from "../../model/widgets/standard";
import { TimestampConverterWidget } from "../../model/widgets/timestamp_converter";
import { Widget } from "../../model/widget";

interface WidgetData {
  component: AsyncComponent;
  widgetType: new (...args: any[]) => Widget;
}

export const widgets: Record<string, WidgetData> = {
  Standard: {
    component: defineAsyncComponent(() => import("./Standard.vue")),
    widgetType: StandardWidget,
  },
  "Timestamp Converter": {
    component: defineAsyncComponent(() => import("./TimestampConverter.vue")),
    widgetType: TimestampConverterWidget,
  },
};
