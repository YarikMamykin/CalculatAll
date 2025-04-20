import { defineAsyncComponent, type Component as AsyncComponent } from "vue";

export type WidgetsTypes = Record<string, AsyncComponent>;

export const widgets = {
  Standard: defineAsyncComponent(() => import("./Standard.vue")),
  "Timestamp Converter": defineAsyncComponent(
    () => import("./TimestampConverter.vue"),
  ),
} satisfies WidgetsTypes;

export function generateWidgetId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 8);
  return `${timestamp}${random}`;
}
