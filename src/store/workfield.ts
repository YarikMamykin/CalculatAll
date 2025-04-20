import { defineStore } from "pinia";
import { type Component as AsyncComponent } from "vue";

export interface Widget {
  name: string;
  widgetType: AsyncComponent;
}

interface WidgetToAdd extends Widget {
  id: string;
}

export interface WorkfieldState {
  widgets: Record<string, Widget>;
}

export const useWorkfieldStore = defineStore("workfield", {
  state: (): WorkfieldState => {
    return {
      widgets: {},
    };
  },
  actions: {
    addWidget({ name, widgetType, id }: WidgetToAdd) {
      this.widgets[id] = { name, widgetType };
    },
    removeWidget(id: string) {
      delete this.widgets[id];
    },
  },
});
