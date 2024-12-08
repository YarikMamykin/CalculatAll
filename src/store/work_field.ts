import { defineStore } from 'pinia'

export class WidgetInfo {
  constructor(
    public type: string,
    public horizontalCellsOccupied: number = 1,
    public verticalCellsOccupied: number = 1,
    public element?: HTMLElement
  ) {}
}

interface State {
  widgets: Array<WidgetInfo>
  focused?: number
}

export const useWorkFieldStore = defineStore('workFieldStore', {
  state: (): State => {
    return {
      widgets: [],
      focused: undefined
    }
  }
})
