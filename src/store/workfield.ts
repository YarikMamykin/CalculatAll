import { defineStore } from "pinia";
import { WidgetSettings } from "../model/widget_settings";
import { type Widget } from "../model/widget";
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
    addWidget(widget: Widget) {
      this.widgets.set(new ID(), widget);
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
