import { defineStore } from "pinia";
import { type WidgetSettings } from "../model/widget_settings";
import { type Widget } from "../model/widget";
import { ID } from "../model/id";
import { Workfield } from "../model/workfield";

export interface WorkfieldState {
  workfield: Workfield;
}

export const useWorkfieldStore = defineStore("workfield", {
  state: (): WorkfieldState => {
    return {
      workfield: new Workfield(),
    };
  },
  getters: {
    widget: (state) => (id: ID) => state.workfield.widget(id),
    widgets: (state) => state.workfield.widgets,
  },
  actions: {
    addWidget(widget: Widget) {
      this.workfield.addWidget(widget);
    },
    updateWidget(id: ID, settings: WidgetSettings) {
      this.workfield.updateWidget(id, settings);
    },
    removeWidget(id: ID) {
      this.workfield.removeWidget(id);
    },
    connectWidgets(from: ID, to: ID) {
      this.workfield.connectWidgets(from, to);
    },
    disconnectWidgets(which: ID, from: ID) {
      this.workfield.disconnectWidgets(which, from);
    },
  },
});
