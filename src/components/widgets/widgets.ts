import { defineAsyncComponent, type Component as AsyncComponent } from "vue";

export type WidgetsTypes = Record<string, AsyncComponent>;

export const widgets = {
  Standard: defineAsyncComponent(() => import("./Standard.vue")),
  "Timestamp Converter": defineAsyncComponent(
    () => import("./TimestampConverter.vue"),
  ),
} satisfies WidgetsTypes;
