import { test, expect } from '@playwright/test'
import {
  controlPanelIcons,
  workField,
  modalWindowPlate,
  modalWindow,
  modalWindowHeader,
  modalWindowHeaderChildCount,
  modalWindowHeaderText,
  modalWindowHeaderCancelButton
} from './utils'

test('visits the app root url, presses about icon which opens Widgets view, clicks Cancel button', async ({
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
