import { defineStore } from "pinia";
import { type WidgetSettings } from "../model/widget_settings";
import { type Widget } from "../model/widget";
import { type ID } from "../model/id";
import { Workfield } from "../model/workfield";
import { Point } from "../model/point";

interface Connection {
  output: ID;
  input: ID;
  points: Point[];
}

export interface WorkfieldState {
  workfield: Workfield;
  temporaryConnection: Point[];
  drawingConnection: boolean;
  connections: Connection[];
}

export const useWorkfieldStore = defineStore("workfield", {
  state: (): WorkfieldState => {
    return {
      workfield: new Workfield(),
      temporaryConnection: [],
      drawingConnection: false,
      connections: [],
    };
  },
  getters: {
    widget: (state) => (id: ID) => state.workfield.widget(id),
    widgets: (state) => state.workfield.widgets,
    points: (state): Point[] => state.temporaryConnection,
    drawing: (state): boolean => state.drawingConnection,
    widgetsConnectedToInput:
      (state) =>
      (id: ID): Map<ID, Widget> =>
        state.workfield.widgetsConnectedToInput(id),
    widgetsConnectedToOutput:
      (state) =>
      (id: ID): Map<ID, Widget> =>
        state.workfield.widgetsConnectedToOutput(id),
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
      this.connections = this.connections.filter(
        (connection) =>
          !connection.input.equals(id) && !connection.output.equals(id),
      );
    },
    connectWidgets(from: ID, to: ID) {
      this.workfield.connectWidgets(from, to);
    },
    disconnectWidgets(which: ID, from: ID) {
      this.workfield.disconnectWidgets(which, from);
    },
    addTemporaryConnectionPoint(p: Point) {
      this.temporaryConnection.push(new Point(p.x, p.y));
    },
    addConnection(c: Connection) {
      this.connections.push(c);
    },
    toggleDrawing() {
      this.drawingConnection = !this.drawingConnection;
    },
    resetTemporaryConnection() {
      this.temporaryConnection = [];
    },
  },
});
