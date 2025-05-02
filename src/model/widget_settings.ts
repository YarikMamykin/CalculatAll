export class WidgetSettings {
  constructor(public readonly name: string) {}

  public clone(): WidgetSettings {
    return new WidgetSettings(this.name);
  }
}
