import { test, expect } from '@playwright/test'

test('visits the app root url', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('div#app').locator('div#control-panel')).toBeVisible()
  await expect(page.locator('div#app').locator('div#control-panel')).toHaveCSS('display', 'flex')
  await expect(page.locator('div#app').locator('div#control-panel')).toHaveCSS('gap', '40px')
  await expect(page.locator('div#app').locator('div#control-panel')).toHaveCSS(
    'padding-top',
    '20px'
  )
  await expect(page.locator('div#app').locator('div#control-panel')).toHaveCSS(
    'padding-bottom',
    '20px'
  )
  await expect(page.locator('div#app').locator('div#control-panel > svg')).toHaveCount(3)
  await expect(page.locator('div#app').locator('div#work-field')).toBeVisible()
  await expect(page.locator('div#app').locator('div#work-field')).toBeEmpty()
})
