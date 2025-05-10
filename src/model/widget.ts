import { type Component as AsyncComponent } from "vue";
import { WidgetSettings } from "./widget_settings";
import { Observable } from "../model/observable";

// Input, that comes from user directly, e.g. inputting numbers on standard calculator
type UserInput = Number | String | Object | Array<Object> | Date;

// Input, that comes from other widget through its Output
type ProgrammableInput = UserInput;

type Output = ProgrammableInput;

export abstract class Widget {
  declare protected inputPreprocessor: Function;

  public updateInputPreprocessor(newCode: string): void {
    this.inputPreprocessor = new Function("input", newCode);
  }

  protected constructor(
    public readonly component: AsyncComponent,
    public readonly userInput: Observable<UserInput>,
    public readonly programmableInput: Observable<ProgrammableInput>,
    public readonly output: Observable<Output>,
    public settings: WidgetSettings,
  ) {
    this.inputPreprocessor = new Function(
      "input",
      this.settings.inputPreprocessorCode.value,
    );
    this.settings.inputPreprocessorCode.subscribe(
      (v: string) => (this.inputPreprocessor = new Function("input", v)),
    );

    this.userInput.subscribe((input: UserInput) => this.calculate(input));
    this.programmableInput.subscribe((input: ProgrammableInput) =>
      this.calculate(input),
    );
  }

  protected calculate(input: UserInput): void {
    const preProcessedInput = this.inputPreprocessor(input);
    this.output.set(this._calculate(preProcessedInput));
  }

  protected subscribeToInputs(): void {}

  protected abstract _calculate(input: UserInput): Output;
}
