import { defineStore } from "pinia";
import { type Component as AsyncComponent } from "vue";

export interface Widget {
  name: string;
  widgetType: AsyncComponent;
  id: string;
}

export interface WorkfieldState {
  widgets: Widget[];
}

export const useWorkfieldStore = defineStore("workfield", {
  state: (): WorkfieldState => {
    return {
      widgets: [],
    };
  },
  actions: {
    addWidget(w: Widget) {
      this.widgets.push(w);
    },
    removeWidget(id: string) {
      const index = this.widgets.findIndex((w) => id === w.id);
      if (index !== -1) {
        this.widgets.splice(index, 1);
      }
    },
  },
});
