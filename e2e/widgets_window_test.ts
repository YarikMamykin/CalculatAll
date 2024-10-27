import { test, expect } from '@playwright/test'
import {
  controlPanelIcons,
  workField,
  modalWindowPlate,
  modalWindow,
  modalWindowHeader,
  modalWindowHeaderChildCount,
  modalWindowHeaderText,
  modalWindowHeaderCancelButton,
  widgetTypes,
  widgetPreviewItem,
  widgetPreviewItems,
  widgetPreviewItemContent
} from './utils'

test('visits the app root url, presses add icon which opens Widgets view, clicks Cancel button', async ({
  page
}) => {
  expect(await page.goto('/')).toBeTruthy()

  await expect(controlPanelIcons(page)).toHaveCount(3)
  await expect(workField(page)).toBeVisible()
  await expect(workField(page)).toBeEmpty()

  await controlPanelIcons(page).nth(1).click({ timeout: 1000 })
  await expect(workField(page)).toBeVisible()
  await expect(modalWindowPlate(page)).toBeVisible()

  await expect(modalWindow(page)).toBeVisible()

  expect(await modalWindowHeaderChildCount(page, 1000)).toBe(2)

  expect(await modalWindowHeader(page).count()).toBe(1)
  expect(await modalWindowHeader(page).isVisible()).toBeTruthy()
  expect(await modalWindowHeaderChildCount(page, 1000)).toBe(2)
  expect(await modalWindowHeaderText(page, 1000)).toBe('WIDGETS')

  expect(await modalWindowHeaderCancelButton(page).innerHTML({ timeout: 1000 })).not.toBe('')
  expect(await modalWindowHeaderCancelButton(page).isEnabled({ timeout: 1000 })).toBeTruthy()

  await modalWindowHeaderCancelButton(page).click({ timeout: 1000 })

  await expect(workField(page)).toBeVisible()
  await expect(workField(page)).toBeEmpty()
})

test('visits the app root url, presses add icon which opens Widgets view, selects first widget, first widget is placed on work field', async ({
  page
}) => {
  expect(await page.goto('/')).toBeTruthy()

  await expect(controlPanelIcons(page)).toHaveCount(3)
  await expect(workField(page)).toBeVisible()
  await expect(workField(page)).toBeEmpty()

  await controlPanelIcons(page).nth(1).click({ timeout: 1000 })
  await expect(workField(page)).toBeVisible()
  await expect(modalWindowPlate(page)).toBeVisible()

  await expect(modalWindow(page)).toBeVisible()

  expect(await modalWindowHeaderChildCount(page, 1000)).toBe(2)

  expect(await modalWindowHeader(page).count()).toBe(1)
  expect(await modalWindowHeader(page).isVisible()).toBeTruthy()
  expect(await modalWindowHeaderChildCount(page, 1000)).toBe(2)
  expect(await modalWindowHeaderText(page, 1000)).toBe('WIDGETS')

  expect(await widgetPreviewItems(page).count()).toBe(widgetTypes.size)

  const firstWidgetContent = await widgetPreviewItemContent(page, 0)
  const otherWidgetsContent: Array<typeof firstWidgetContent> = Array.from(widgetTypes).map(
    async (_, index: number): Promise<String> => {
      const result = await widgetPreviewItemContent(page, index)
      return result
    }
  )
  otherWidgetsContent.shift()
  await widgetPreviewItem(page, 0).click({ timeout: 1000 })

  await expect(modalWindow(page)).not.toBeVisible()
  await expect(workField(page)).toBeVisible()
  await expect(workField(page)).not.toBeEmpty()
  await expect(await workField(page).innerHTML({ timeout: 1000 })).toContain(firstWidgetContent)
  otherWidgetsContent.forEach(async (el: Promise<String>) => {
    expect(await workField(page).innerHTML({ timeout: 1000 })).not.toContain(await el)
  })
})

test('visits the app root url, presses add icon which opens Widgets view, selects first widget, first widget is placed on work field, then repeats all the same with the second widget', async ({
  page
}) => {
  expect(await page.goto('/')).toBeTruthy()

  await expect(controlPanelIcons(page)).toHaveCount(3)
  await expect(workField(page)).toBeVisible()
  await expect(workField(page)).toBeEmpty()

  await controlPanelIcons(page).nth(1).click({ timeout: 1000 })
  await expect(workField(page)).toBeVisible()
  await expect(modalWindowPlate(page)).toBeVisible()

  await expect(modalWindow(page)).toBeVisible()

  expect(await modalWindowHeaderChildCount(page, 1000)).toBe(2)

  expect(await modalWindowHeader(page).count()).toBe(1)
  expect(await modalWindowHeader(page).isVisible()).toBeTruthy()
  expect(await modalWindowHeaderChildCount(page, 1000)).toBe(2)
  expect(await modalWindowHeaderText(page, 1000)).toBe('WIDGETS')

  expect(await widgetPreviewItems(page).count()).toBe(widgetTypes.size)

  const otherWidgetsContent: Array<typeof firstWidgetContent> = Array.from(widgetTypes).map(
    async (_, index: number): Promise<String> => {
      const result = await widgetPreviewItemContent(page, index)
      return result
    }
  )
  const firstWidgetContent: Promise<String> = otherWidgetsContent.shift() as Promise<String>
  const secondWidgetContent: Promise<String> = otherWidgetsContent.shift() as Promise<String>

  // Click on first widget in Widgets Window
  await widgetPreviewItem(page, 0).click({ timeout: 1000 })

  // Open Widgets Window again
  await controlPanelIcons(page).nth(1).click({ timeout: 1000 })
  // Click on second widget in Widgets Window
  await widgetPreviewItem(page, 1).click({ timeout: 1000 })

  await expect(modalWindow(page)).not.toBeVisible()
  await expect(workField(page)).toBeVisible()
  await expect(workField(page)).not.toBeEmpty()
  await expect(await workField(page).innerHTML({ timeout: 1000 })).toContain(
    await firstWidgetContent
  )
  await expect(await workField(page).innerHTML({ timeout: 1000 })).toContain(
    await secondWidgetContent
  )
  otherWidgetsContent.forEach(async (el: Promise<String>) => {
    expect(await workField(page).innerHTML({ timeout: 1000 })).not.toContain(await el)
  })
})
