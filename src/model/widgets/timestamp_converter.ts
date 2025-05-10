import { Widget } from "../widget";
import { TimestampConverterWidgetSettings } from "../widget_settings";
import { type Component as AsyncComponent } from "vue";
import { Observable } from "../../model/observable";

type UserInput = Number | Date;
type ProgrammableInput = Number | Date;
type Output = Date;

export class TimestampConverterWidget extends Widget {
  public userInput: Observable<UserInput>;
  public programmableInput: Observable<ProgrammableInput>;
  public output: Observable<UserInput>;

  constructor(component: AsyncComponent) {
    super(component);
    this.userInput = new Observable<UserInput>(new Date());
    this.programmableInput = new Observable<ProgrammableInput>(0);
    this.output = new Observable<Output>(new Date());
    this.settings = new TimestampConverterWidgetSettings();
    this.subscribeToInputs();
  }

  protected override _calculate(input: UserInput): Output {
    return new Date(input instanceof Number ? 0 : input.getUTCMilliseconds());
  }
}
