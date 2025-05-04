import { type Component as AsyncComponent } from "vue";
import { WidgetSettings } from "./widget_settings";

// Input, that comes from user directly, e.g. inputting numbers on standard calculator
type UserInput = Number | String | Object | Array<Object> | Date;

// Input, that comes from other widget through its Output
type ProgrammableInput = UserInput;

type Output = ProgrammableInput;

export abstract class Widget {
  public readonly component: AsyncComponent;
  public settings!: WidgetSettings;
  public userInput!: UserInput;
  public programmableInput!: ProgrammableInput;
  public output!: Output;

  constructor(component: AsyncComponent) {
    this.component = component;

    this.initSettings();
    this.initInputs();
    this.initOutput();
  }

  public abstract calculate(): Output;

  protected abstract initSettings(): void;
  protected abstract initInputs(): void;
  protected abstract initOutput(): void;
}
