import { type Component as AsyncComponent } from "vue";
import { WidgetSettings } from "./widget_settings";
import { Observable } from "../model/observable";

// Input, that comes from user directly, e.g. inputting numbers on standard calculator
type UserInput = Number | String | Object | Array<Object> | Date | unknown;

// Input, that comes from other widget through its Output
type ProgrammableInput = UserInput;

type Output = ProgrammableInput;

export abstract class Widget {
  declare protected inputPreprocessor: Function;
  declare protected programmableInputPreprocessor: Function;

  get inputPreprocessorFunction(): string {
    return `(input: ${this.userInput.type}): ${this.userInput.type} => { 
      ${this.settings.inputPreprocessorCode.value} 
    }`;
  }

  get programmableInputPreprocessorFunction(): string {
    return `(input: ${this.programmableInput.type}): ${this.programmableInput.type} => { 
      ${this.settings.programmableInputPreprocessorCode.value} 
    }`;
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

    this.programmableInputPreprocessor = new Function(
      "input",
      this.settings.programmableInputPreprocessorCode.value,
    );
    this.settings.programmableInputPreprocessorCode.subscribe(
      (v: string) =>
        (this.programmableInputPreprocessor = new Function("input", v)),
    );

    this.userInput.subscribe((input: UserInput) => this.calculate(input));
    this.programmableInput.subscribe((input: ProgrammableInput) =>
      this.calculateProgrammable(input),
    );
  }

  protected calculate(input: UserInput): void {
    const preProcessedInput = this.inputPreprocessor(input);
    this.output.set(this._calculate(preProcessedInput));
  }

  protected calculateProgrammable(input: UserInput): void {
    const preProcessedInput = this.programmableInputPreprocessor(input);
    this.output.set(this._calculateProgrammable(preProcessedInput));
  }

  protected subscribeToInputs(): void {}

  protected abstract _calculate(input: UserInput): Output;
  protected abstract _calculateProgrammable(input: UserInput): Output;
}
