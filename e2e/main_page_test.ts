import { test, expect } from '@playwright/test'
import { controlPanel, controlPanelIcons, workField, brandIcon } from './utils'

test('visits the app root url', async ({ page }) => {
  await page.goto('/')
  await expect(controlPanel(page)).toBeVisible()
  await expect(controlPanel(page)).toHaveCSS('display', 'flex')
  await expect(controlPanel(page)).toHaveCSS('gap', '48px')
  await expect(controlPanelIcons(page)).toHaveCount(3)
  await expect(workField(page)).toBeVisible()
  await expect(workField(page)).toBeEmpty()
  await expect(brandIcon(page)).toBeVisible()
})
