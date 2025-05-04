import { Widget } from "../widget";
import { TimestampConverterWidgetSettings } from "../widget_settings";
import { type Component as AsyncComponent } from "vue";

export class TimestampConverterWidget extends Widget {
  constructor(component: AsyncComponent) {
    super(component);
  }

  public override calculate(): Number {
    return new Number(this.userInput);
  }

  protected override initSettings(): void {
    this.settings = new TimestampConverterWidgetSettings();
  }

  protected override initInputs(): void {
    this.userInput = "0";
    this.programmableInput = 0;
  }

  protected override initOutput(): void {
    this.output = 0;
  }
}
