import { defineStore } from "pinia";
import { WidgetSettings } from "../model/widget_settings";
import { type Widget, type WidgetPreview } from "../model/widget";
import { ID } from "../model/id";

export interface WorkfieldState {
  widgets: Map<ID, Widget>;
}

export const useWorkfieldStore = defineStore("workfield", {
  state: (): WorkfieldState => {
    return {
      widgets: new Map<ID, Widget>(),
    };
  },
  getters: {
    widget: (state) => (id: ID) => state.widgets.get(id),
  },
  actions: {
    addWidget({ settings, widgetType }: WidgetPreview) {
      this.widgets.set(new ID(), { settings, widgetType });
    },
    updateWidget(id: ID, settings: WidgetSettings) {
      const widget = this.widgets.get(id);
      if (widget) {
        widget.settings = settings;
      }
    },
    removeWidget(id: ID) {
      this.widgets.delete(id);
    },
  },
});
