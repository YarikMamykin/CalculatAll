import { describe, expect, test } from "@jest/globals";
import { TestWidget } from "./utils/test_widget";
import { Workfield } from "../workfield";
import type { Widget } from "../widget";
import type { ID } from "../id";

describe("Workfield", () => {
  test("Add widget", () => {
    const workfield = new Workfield();
    const testWidget = new TestWidget();
    workfield.addWidget(testWidget);
    const widgets = workfield.widgets;

    widgets.forEach((value: Widget) => {
      expect(value).toEqual(testWidget);
    });
  });

  test("Remove widget", () => {
    const workfield = new Workfield();
    const testWidget = new TestWidget();
    workfield.addWidget(testWidget);

    workfield.widgets.forEach((value: Widget) => {
      expect(value).toEqual(testWidget);
    });

    const id: ID | undefined = Array.from(workfield.widgets.keys()).at(0);
    workfield.removeWidget(id as ID);
    expect(workfield.widgets.size).toBe(0);
  });

  test("Connect/Disconnect widgets", () => {
    const workfield = new Workfield();
    const testWidget1 = new TestWidget();
    testWidget1.programmableInput.set(1);
    const testWidget2 = new TestWidget();
    testWidget2.programmableInput.set(2);
    workfield.addWidget(testWidget1);
    workfield.addWidget(testWidget2);
    expect(Array.from(workfield.widgets.values())).toEqual([
      testWidget1,
      testWidget2,
    ]);
    expect(testWidget1.output.value).toBe(3);
    expect(testWidget2.output.value).toBe(6);

    const ids = Array.from(workfield.widgets.keys());
    workfield.connectWidgets(ids.at(0) as ID, ids.at(1) as ID);
    // Check output still same
    expect(testWidget1.output.value).toBe(3);
    expect(testWidget2.output.value).toBe(6);

    testWidget1.programmableInput.set(10);
    // Check value changed on both widgets outputs and inputs
    expect(testWidget1.output.value).toBe(30);
    expect(testWidget2.output.value).toBe(90);
  });
});
