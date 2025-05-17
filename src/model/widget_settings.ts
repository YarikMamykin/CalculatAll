import { Observable } from "./observable";

export class WidgetSettings {
  protected constructor(
    public readonly name: string,
    public inputPreprocessorCode: Observable<string> = new Observable<string>(
      "return input;",
    ),
    public programmableInputPreprocessorCode: Observable<string> = new Observable<string>(
      "return input;",
    ),
  ) {}

  public clone(): WidgetSettings {
    return new WidgetSettings(
      this.name,
      new Observable<string>(this.inputPreprocessorCode.value),
      new Observable<string>(this.programmableInputPreprocessorCode.value),
    );
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
