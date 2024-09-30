import { test, expect } from '@playwright/test'
import { parse } from 'node-html-parser'

test('visits the app root url, presses about icon which opens About view, checks text displayed and clicks Cancel button', async ({
  page
}) => {
  expect(await page.goto('/')).toBeTruthy()
  const controlPanelIcons = page.locator('div#app').locator('div#control-panel > svg')
  await expect(controlPanelIcons).toHaveCount(3)
  const workField = page.locator('div#app').locator('div#work-field')
  await expect(workField).toBeVisible()
  await expect(workField).toBeEmpty()

  await controlPanelIcons.last().click({ timeout: 1000 })
  await expect(workField).toBeVisible()
  await expect(workField.locator('div.modal-window-plate')).toBeVisible()

  const modalWindow = workField.locator('div.modal-window-plate').locator('div.modal-window')
  await expect(modalWindow).toBeVisible()

  const modalWindowHTML = parse(await modalWindow.innerHTML({ timeout: 1000 }))
  expect(modalWindowHTML.childNodes.length).toBe(2)

  const modalWindowHeader = workField
    .locator('div.modal-window-plate')
    .locator('div.modal-window')
    .locator('div.modal-window-header')
  expect(await modalWindowHeader.count()).toBe(1)
  expect(await modalWindowHeader.isVisible()).toBeTruthy()
  expect(parse(await modalWindowHeader.innerHTML({ timeout: 1000 })).childNodes.length).toBe(2)
  expect(await modalWindowHeader.locator('>h2').innerText({ timeout: 1000 })).toBe('ABOUT')

  const cancelButton = modalWindowHeader.locator('>svg.cancel-button')
  expect(await cancelButton.innerHTML({ timeout: 1000 })).not.toBe('')
  expect(await cancelButton.isEnabled({ timeout: 1000 })).toBeTruthy()

  const modalWindowAboutText = workField
    .locator('div.modal-window-plate')
    .locator('div.modal-window')
    .locator('pre#about-text')
  expect(await modalWindowAboutText.count()).toBe(1)
  expect((await modalWindowAboutText.innerText({ timeout: 1000 })).length).toBeGreaterThan(
    'CalculatAll'.length
  )

  await cancelButton.click({ timeout: 1000 })

  await expect(workField).toBeVisible()
  await expect(workField).toBeEmpty()
})
