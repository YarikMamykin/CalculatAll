import { type Component as AsyncComponent } from "vue";
import { WidgetSettings } from "./widget_settings";
import { Observable } from "../model/observable";

// Input, that comes from user directly, e.g. inputting numbers on standard calculator
type UserInput = Number | String | Object | Array<Object> | Date;

// Input, that comes from other widget through its Output
type ProgrammableInput = UserInput;

type Output = ProgrammableInput;

export abstract class Widget {
  declare public settings: WidgetSettings;
  declare public userInput: Observable<UserInput>;
  declare public programmableInput: Observable<ProgrammableInput>;
  declare public output: Observable<Output>;

  protected constructor(public readonly component: AsyncComponent) {
    this.userInput.subscribe(this.calculate);
  }

  public abstract calculate(input: UserInput): void;
}
