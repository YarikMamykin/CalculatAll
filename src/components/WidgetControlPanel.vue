<script setup lang="ts">
import { useWorkFieldStore, WidgetInfo } from '@/store/work_field'

const workFieldStore = useWorkFieldStore()

function narrowWidget() {
  if (undefined === workFieldStore.focused) {
    return
  }
  const widget: WidgetInfo = workFieldStore.widgets.at(
    workFieldStore.focused as number
  ) as WidgetInfo
  console.log('NARROWING: ', widget.element)
  const maxColumns: number = Number(
    getComputedStyle(widget.element).getPropertyValue('--max-widgets-per-row')
  )
  widget.horizontalCellsOccupied =
    widget.horizontalCellsOccupied > 1 ? widget.horizontalCellsOccupied - 1 : 1
  const currentRow = Math.floor(workFieldStore.focused / maxColumns)
  const currentCol = workFieldStore.focused % maxColumns
  if (1 === widget.horizontalCellsOccupied) {
    widget.element.style.gridArea = ''
  } else {
    widget.element.style.gridArea = `${currentRow + 1}/${currentCol + 1}/${widget.verticalCellsOccupied + 1}/${widget.horizontalCellsOccupied + 1 + currentCol}`
  }
}
function widenWidget() {
  if (undefined === workFieldStore.focused) {
    return
  }
  const widget = workFieldStore.widgets.at(workFieldStore.focused as number) as WidgetInfo
  console.log('WIDENING: ', widget.element)
  const maxColumns: number = Number(
    getComputedStyle(widget.element).getPropertyValue('--max-widgets-per-row')
  )
  console.log(maxColumns)
  const currentRow = Math.floor(workFieldStore.focused / maxColumns)
  const currentCol = workFieldStore.focused % maxColumns
  const maxColumnsForWidget = maxColumns - currentCol
  widget.horizontalCellsOccupied += 1
  widget.horizontalCellsOccupied =
    widget.horizontalCellsOccupied > maxColumnsForWidget
      ? maxColumns + 1
      : widget.horizontalCellsOccupied
  widget.element.style.gridArea = `${currentRow + 1}/${currentCol + 1}/${widget.verticalCellsOccupied + 1}/${widget.horizontalCellsOccupied + 1}`
}
</script>

<template>
  <div id="widget-control-panel">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xml:space="preserve"
      class="widget-control-panel-element"
      viewBox="0 0 488.4 488.4"
      @click="narrowWidget"
    >
      <path
        d="M393.8 260.9h94.6v-33.4h-94.6l40-39.5-23.7-23.7-80.2 79.9 80.2 79.9 23.7-23.7zM94.6 227.5H0v33.4h94.6l-40 39.5 23.7 23.7 80.2-79.9-80.2-79.9L54.6 188zM185.7 0H228v488.4h-42.3zM268.6 0h42.3v488.4h-42.3z"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xml:space="preserve"
      class="widget-control-panel-element"
      viewBox="0 0 490 490"
      @click="widenWidget"
    >
      <path
        d="M425.8 228.3h-71.1v33.4h71.1l-39.6 39.7 23.7 23.7L490 245l-80.1-80.1-23.7 23.7zM64.2 261.7h71.1v-33.4H64.2l39.6-39.7-23.7-23.7L0 245l80.1 80.1 23.7-23.7zM178.5 0h50.2v490h-50.2zM269.5 0h50.2v490h-50.2z"
      />
    </svg>
  </div>
</template>
