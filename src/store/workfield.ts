import { defineStore } from "pinia";
import { type Component as AsyncComponent } from "vue";
import { WidgetSettings } from "../model/widget_settings";
import { type Widget } from "../model/widget";
import { generateId, type ID } from "../model/id";

interface WidgetPreview {
  widgetType: AsyncComponent;
  settings: WidgetSettings;
}

export interface WorkfieldState {
  widgets: Record<ID, Widget>;
}

export const useWorkfieldStore = defineStore("workfield", {
  state: (): WorkfieldState => {
    return {
      widgets: {},
    };
  },
  actions: {
    addWidget({ settings, widgetType }: WidgetPreview) {
      this.widgets[generateId()] = { settings, widgetType };
    },
    updateWidget(id: string, settings: WidgetSettings) {
      this.widgets[id].settings = settings;
    },
    removeWidget(id: string) {
      delete this.widgets[id];
    },
  },
});
