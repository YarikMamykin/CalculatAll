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
  declare public readonly userInput: Observable<UserInput>;
  declare public readonly programmableInput: Observable<ProgrammableInput>;
  declare public readonly output: Observable<Output>;
  declare private inputPreprocessor: Function;

  protected constructor(public readonly component: AsyncComponent) {
    this.inputPreprocessor = new Function("input", "return input;");
  }

  public calculate(input: UserInput): void {
    const preProcessedInput = this.inputPreprocessor.call(input);
    this.output.set(this._calculate(preProcessedInput));
  }

  public updateInputPreprocessor(newCode: string): void {
    this.inputPreprocessor = new Function("input", newCode);
  }

  protected abstract _calculate(input: UserInput): Output;
}
