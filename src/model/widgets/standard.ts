import { Widget } from "../widget";
import { StandardWidgetSettings } from "../widget_settings";
import { type Component as AsyncComponent } from "vue";
import { Observable } from "../../model/observable";

type UserInput = String;
type ProgrammableInput = Number;
type Output = Number;

export class StandardWidget extends Widget {
  public userInput: Observable<UserInput>;
  public programmableInput: Observable<ProgrammableInput>;
  public output: Observable<Output>;

  constructor(component: AsyncComponent) {
    super(component);
    this.userInput = new Observable<UserInput>("");
    this.programmableInput = new Observable<ProgrammableInput>(0);
    this.output = new Observable<Output>(0);
    this.settings = new StandardWidgetSettings();
    this.subscribeToInputs();
  }

  protected override _calculate(input: UserInput): Output {
    return new Number(input);
  }
}
