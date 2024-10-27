import { defineStore } from 'pinia'

interface State {
  widgets: string[]
}

export const useWorkFieldStore = defineStore('workFieldStore', {
  state: (): State => {
    return {
      widgets: []
    }
  }
})
