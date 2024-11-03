import { defineStore } from 'pinia'

interface State {
  widgets: string[]
  focused?: Number
}

export const useWorkFieldStore = defineStore('workFieldStore', {
  state: (): State => {
    return {
      widgets: [],
      focused: undefined
    }
  }
})
