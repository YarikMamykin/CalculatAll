import { type Component as AsyncComponent } from "vue";
import { WidgetSettings } from "./widget_settings";

interface Input {
  data: Number | String | Object | Array<Object>;
}

interface Output {
  data: Number | String | Object | Array<Object>;
}

export interface Widget {
  widgetType: AsyncComponent;
  settings: WidgetSettings;
  input?: Input;
  output?: Output;
}
