import { Widget } from "../widget";
import { StandardWidgetSettings } from "../widget_settings";
import { type Component as AsyncComponent } from "vue";
import { Observable } from "../../model/observable";

export class StandardWidget extends Widget {
  public userInput: Observable<String> = new Observable<String>("");
  public programmableInput: Observable<Number> = new Observable<Number>(0);
  public output: Observable<Number> = new Observable<Number>(0);

  constructor(component: AsyncComponent) {
    super(component);
    this.settings = new StandardWidgetSettings();
  }

  public override calculate(input: String): void {
    this.output.set(new Number(input));
  }
}
