import { Widget } from "../widget";
import { TimestampConverterWidgetSettings } from "../widget_settings";
import { type Component as AsyncComponent } from "vue";
import { Observable } from "../../model/observable";

type UserInput = Number | Date;
type ProgrammableInput = Number | Date;
type Output = Date;

export class TimestampConverterWidget extends Widget {
  constructor(component: AsyncComponent) {
    super(
      component,
      new Observable<UserInput>(new Date()),
      new Observable<ProgrammableInput>(0),
      new Observable<Output>(new Date()),
      new TimestampConverterWidgetSettings(),
    );
  }

  protected override _calculate(input: UserInput): Output {
    return new Date(input instanceof Number ? 0 : input.getUTCMilliseconds());
  }

  protected override _calculateProgrammable(input: ProgrammableInput): Output {
    return new Date(input instanceof Number ? 0 : input.getUTCMilliseconds());
  }
}
