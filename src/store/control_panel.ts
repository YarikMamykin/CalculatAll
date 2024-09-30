import { defineStore } from 'pinia'

export enum CurrentView {
  Main = 0,
  Email = 1,
  Add = 2,
  About = 3
}

interface State {
  currentView: CurrentView
  viewsMap: Map<CurrentView, any>
}

export const useControlPanelStore = defineStore('controlPanel', {
  state: (): State => {
    return {
      currentView: CurrentView.Main,
      viewsMap: new Map<number, any>()
    }
  },
  actions: {
    setView(view: CurrentView): void {
      this.currentView = view
      this.viewsMap.forEach((reference: any, id: CurrentView) => {
        id === view
          ? reference.value.classList.add('control-panel-element-selected')
          : reference.value.classList.remove('control-panel-element-selected')
      })
    },

    resetView(): void {
      this.setView(CurrentView.Main)
    }
  }
})
