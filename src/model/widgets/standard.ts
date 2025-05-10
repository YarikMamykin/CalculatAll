import { Widget } from "../widget";
import { StandardWidgetSettings } from "../widget_settings";
import { type Component as AsyncComponent } from "vue";
import { Observable } from "../../model/observable";

type UserInput = String;
type ProgrammableInput = Number;
type Output = Number;

export class StandardWidget extends Widget {
  constructor(component: AsyncComponent) {
    super(
      component,
      new Observable<UserInput>(""),
      new Observable<ProgrammableInput>(0),
      new Observable<Output>(0),
      new StandardWidgetSettings(),
    );
  }

  protected override _calculate(input: UserInput): Output {
    return new Number(input);
  }
}
