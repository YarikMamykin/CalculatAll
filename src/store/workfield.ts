import { defineStore } from "pinia";
import { type Component as AsyncComponent } from "vue";
import { WidgetSettings } from "./widget_settings";

interface Input {
  data: Number | String | Object | Array<Object>;
}

interface Output {
  data: Number | String | Object | Array<Object>;
}

function generateWidgetId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 8);
  return `${timestamp}${random}`;
}

interface WidgetPreview {
  widgetType: AsyncComponent;
  settings: WidgetSettings;
}

export interface Widget {
  widgetType: AsyncComponent;
  settings: WidgetSettings;
  input?: Input;
  output?: Output;
}

export interface WorkfieldState {
  widgets: Record<string, Widget>;
}

export const useWorkfieldStore = defineStore("workfield", {
  state: (): WorkfieldState => {
    return {
      widgets: {},
    };
  },
  actions: {
    addWidget({ settings, widgetType }: WidgetPreview) {
      this.widgets[generateWidgetId()] = { settings, widgetType };
    },
    updateWidget(id: string, settings: WidgetSettings) {
      this.widgets[id].settings = settings;
    },
    removeWidget(id: string) {
      delete this.widgets[id];
    },
  },
});
