import { ID } from "./id";
import { Widget } from "./widget";
import { type WidgetSettings } from "./widget_settings";

type Widgets = Map<ID, Widget>;

export class Workfield {
  private _widgets: Widgets;

  constructor() {
    this._widgets = new Map<ID, Widget>();
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
    this.widget(id)?.output.unsubscribe();
    this.widgets.forEach((widget: Widget) => widget.output.unsubscribe(id));
    this.widgets.delete(id);
  }

  public connectWidgets(from: ID, to: ID) {
    this.widget(from)?.output.subscribe(
      (value: unknown) => this.widgets.get(to)?.programmableInput.set(value),
      to,
    );
  }

  public disconnectWidgets(which: ID, from: ID) {
    // Because there is no way to be sure that either
    // `which` or `from` is the source of data
    // workfield should try to unsubscribe both ways.
    // Observable does nothing if subscriber not found.
    this.widget(which)?.output.unsubscribe(from);
    this.widget(from)?.output.unsubscribe(which);
  }

  public widgetsConnectedToInput(wid: ID): Widgets {
    let widgets: Widgets = new Map<ID, Widget>();
    const w = this.widget(wid);
    if (!w) widgets;

    for (const [widgetId, widget] of this._widgets) {
      const subs = widget.output.subscribersList();
      subs
        .filter((id: ID) => wid === id)
        .forEach(() => widgets.set(widgetId, widget));
    }

    return widgets;
  }

  public widgetsConnectedToOutput(wid: ID): Widgets {
    let widgets: Widgets = new Map<ID, Widget>();
    const w = this.widget(wid);
    if (!w) return widgets;

    w.output
      .subscribersList()
      .forEach((id: ID) => widgets.set(id, this.widget(id) as Widget));

    return widgets;
  }
}
