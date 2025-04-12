import { defineAsyncComponent } from "vue";

export const widgets = {
  Standard: defineAsyncComponent(() => import("./Standard.vue")),
  "Timestamp Converter": defineAsyncComponent(
    () => import("./TimestampConverter.vue"),
  ),
};
