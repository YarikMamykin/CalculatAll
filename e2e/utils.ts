import { Locator, Page } from '@playwright/test'
import { parse } from 'node-html-parser'

export function controlPanel(page: Page): Locator {
  return page.locator('div#app').locator('div#control-panel')
}

export function controlPanelIcons(page: Page): Locator {
  return controlPanel(page).locator('div.control-panel-icons > svg')
}

export function workField(page: Page): Locator {
  return page.locator('div#app').locator('div#work-field')
}

export function brandIcon(page: Page): Locator {
  return controlPanel(page).locator('.brand-icon')
}

export function donationIcon(page: Page): Locator {
  return controlPanel(page).locator('.donation-icon')
}

export function modalWindowPlate(page: Page): Locator {
  return workField(page).locator('div.modal-window-plate')
}

export function modalWindow(page: Page): Locator {
  return modalWindowPlate(page).locator('div.modal-window')
}

export function modalWindowHeader(page: Page): Locator {
  return modalWindow(page).locator('div.modal-window-header')
}

export function modalWindowHeaderText(page: Page, timeout: number): Promise<string> {
  return modalWindowHeader(page).locator('>h2').innerText({ timeout })
}

export async function modalWindowHeaderChildCount(page: Page, timeout: number): Promise<number> {
  return parse(await modalWindowHeader(page).innerHTML({ timeout })).childNodes.length
}

export function modalWindowHeaderCancelButton(page: Page): Locator {
  return modalWindowHeader(page).locator('>svg.cancel-button')
}

export function modalWindowEmailContainer(page: Page): Locator {
  return modalWindow(page).locator('form.email-container')
}
