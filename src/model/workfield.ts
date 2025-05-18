import { ID } from "./id";
import { Widget } from "./widget";
import { ConnectionsTable } from "./connections_table";
import { type WidgetSettings } from "./widget_settings";

type Widgets = Map<ID, Widget>;

export class Workfield {
  private _widgets: Widgets;
  private connections: ConnectionsTable;

  constructor() {
    this._widgets = new Map<ID, Widget>();
    this.connections = new ConnectionsTable();
  }

  public get widgets(): Widgets {
    return this._widgets;
  }

  public addWidget(widget: Widget) {
    this._widgets.set(new ID(), widget);
  }

  public widget(id: ID): Widget | undefined {
    return this._widgets.get(id);
  }

  public updateWidget(id: ID, settings: WidgetSettings) {
    const widget = this._widgets.get(id);
    if (widget) {
      widget.settings.update(settings);
    }
  }

  public removeWidget(id: ID) {
    this._widgets.delete(id);
  }

  public connectWidgets(from: ID, to: ID) {
    this.connections.add(from, to);
  }

  public disconnectWidgets(which: ID, from: ID) {
    this.connections.remove(which, from);
  }
}
