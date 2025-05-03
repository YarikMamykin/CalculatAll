import { defineStore } from "pinia";
import { WidgetSettings } from "../model/widget_settings";
import { type Widget, type WidgetPreview } from "../model/widget";
import { generateId, type ID } from "../model/id";

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
