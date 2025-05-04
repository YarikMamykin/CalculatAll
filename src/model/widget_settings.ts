export class WidgetSettings {
  protected constructor(public readonly name: string) {}

  public clone(): WidgetSettings {
    return new WidgetSettings(this.name);
  }
}

export class StandardWidgetSettings extends WidgetSettings {
  constructor() {
    super("Standard");
  }
}

export class TimestampConverterWidgetSettings extends WidgetSettings {
  constructor() {
    super("Timestamp Converter");
  }
}
