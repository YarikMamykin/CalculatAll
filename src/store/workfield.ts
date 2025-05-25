import { defineStore } from "pinia";
import { type WidgetSettings } from "../model/widget_settings";
import { type Widget } from "../model/widget";
import { ID } from "../model/id";
import { Workfield } from "../model/workfield";
import { Point } from "../model/point";

export interface WorkfieldState {
  workfield: Workfield;
  temporaryConnection: Point[];
  drawingConnection: boolean;
}

export const useWorkfieldStore = defineStore("workfield", {
  state: (): WorkfieldState => {
    return {
      workfield: new Workfield(),
      temporaryConnection: [],
      drawingConnection: false,
    };
  },
  getters: {
    widget: (state) => (id: ID) => state.workfield.widget(id),
    widgets: (state) => state.workfield.widgets,
    points: (state): string =>
      state.temporaryConnection.map((p: Point) => p.toString()).join(" "),
    drawing: (state): boolean => state.drawingConnection,
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
    addTemporaryConnectionPoint(p: Point) {
      if (0 === this.temporaryConnection.length) {
        this.temporaryConnection.push(new Point(p.x, p.y));
        return;
      }
    },
    toggleDrawing() {
      this.drawingConnection = !this.drawingConnection;
    },
  },
});
