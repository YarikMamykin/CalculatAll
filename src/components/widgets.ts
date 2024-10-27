import WidgetType1 from '@/components/widgets/WidgetType1.vue'
import WidgetType2 from '@/components/widgets/WidgetType2.vue'

type WidgetTypes = typeof WidgetType1 | typeof WidgetType2

export const widgets: Record<string, WidgetTypes> = {
  WidgetType1,
  WidgetType2
}

export const widgetTypes = Object.freeze(Object.keys(widgets))
