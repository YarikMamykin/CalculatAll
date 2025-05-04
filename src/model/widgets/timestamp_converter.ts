import { Widget } from "../widget";
import { TimestampConverterWidgetSettings } from "../widget_settings";
import { type Component as AsyncComponent } from "vue";
import { Observable } from "../../model/observable";

export class TimestampConverterWidget extends Widget {
  public userInput: Observable<Date> = new Observable<Date>(new Date());
  public programmableInput: Observable<Date | Number> = new Observable<
    Date | Number
  >(0);
  public output: Observable<Date> = new Observable<Date>(new Date());

  constructor(component: AsyncComponent) {
    super(component);
    this.settings = new TimestampConverterWidgetSettings();
  }

  public override calculate(input: Date | Number): void {
    this.output.set(
      input instanceof Number ? new Date(input as number) : input,
    );
  }
}
