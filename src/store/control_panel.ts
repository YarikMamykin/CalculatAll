import { defineStore } from 'pinia'

export enum CurrentView {
  Main = 0,
  Email = 1,
  Add = 2,
  About = 3
}

interface State {
  currentView: CurrentView
}

export const useControlPanelStore = defineStore('controlPanel', {
  state: (): State => {
    return {
      currentView: CurrentView.Main
    }
  }
})
