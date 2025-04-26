import { defineStore } from "pinia";
import { type Component as AsyncComponent } from "vue";
import { WidgetSettings } from "./widget_settings";

export interface Widget {
  widgetType: AsyncComponent;
  settings: WidgetSettings;
}

interface WidgetToAdd extends Widget {
  id: string;
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
    addWidget({ settings, widgetType, id }: WidgetToAdd) {
      this.widgets[id] = { settings, widgetType };
    },
    updateWidget(id: string, settings: WidgetSettings) {
      this.widgets[id].settings = settings;
    },
    removeWidget(id: string) {
      delete this.widgets[id];
    },
  },
});
