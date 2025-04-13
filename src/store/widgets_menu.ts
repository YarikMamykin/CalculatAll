import { defineStore } from "pinia";

export interface WidgetsMenuState {
  show: boolean;
}

export const useWidgetsMenuStore = defineStore("widgetsMenu", {
  state: (): WidgetsMenuState => {
    return {
      show: false,
    };
  },
});
