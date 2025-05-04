import { Widget } from "../widget";
import { StandardWidgetSettings } from "../widget_settings";
import { type Component as AsyncComponent } from "vue";

export class StandardWidget extends Widget {
  constructor(component: AsyncComponent) {
    super(component);
  }

  public override calculate(): Number {
    return new Number(this.userInput);
  }

  protected override initSettings(): void {
    this.settings = new StandardWidgetSettings();
  }

  protected override initInputs(): void {
    this.userInput = "0";
    this.programmableInput = 0;
  }

  protected override initOutput(): void {
    this.output = 0;
  }
}
