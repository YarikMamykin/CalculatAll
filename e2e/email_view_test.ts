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
  modalWindowEmailContainer
} from './utils'

test('visits the app root url, presses email icon which opens Email view, checks content of Email view and presses Cancel button', async ({
  page
}) => {
  expect(await page.goto('/')).toBeTruthy()
  await expect(controlPanelIcons(page)).toHaveCount(3)
  await expect(workField(page)).toBeVisible()
  await expect(workField(page)).toBeEmpty()

  await controlPanelIcons(page).first().click({ timeout: 1000 })
  await expect(workField(page)).toBeVisible()
  await expect(modalWindowPlate(page)).toBeVisible()

  await expect(modalWindow(page)).toBeVisible()

  expect(await modalWindowHeaderChildCount(page, 1000)).toBe(2)

  expect(await modalWindowHeader(page).count()).toBe(1)
  expect(await modalWindowHeader(page).isVisible()).toBeTruthy()
  expect(await modalWindowHeaderChildCount(page, 1000)).toBe(2)
  expect(await modalWindowHeaderText(page, 1000)).toBe('EMAIL')

  expect(await modalWindowHeaderCancelButton(page).innerHTML({ timeout: 1000 })).not.toBe('')
  expect(await modalWindowHeaderCancelButton(page).isEnabled({ timeout: 1000 })).toBeTruthy()

  expect(await modalWindowEmailContainer(page).count()).toBe(1)

  const emailHeader = modalWindowEmailContainer(page).locator('div.email-header')
  expect(await emailHeader.count()).toBe(1)
  expect(await modalWindowEmailContainer(page).locator('p').count()).toBe(3)
  const toLabel = modalWindowEmailContainer(page).locator('p').first()
  expect(await toLabel.innerText({ timeout: 1000 })).toBe('To:')
  const toEmail = modalWindowEmailContainer(page).locator('p').nth(1)
  expect(await toEmail.innerText({ timeout: 1000 })).toBe('ymamykin@gmail.com')
  const fromLabel = modalWindowEmailContainer(page).locator('p').last()
  expect(await fromLabel.innerText({ timeout: 1000 })).toBe('From:')
  const fromEmail = modalWindowEmailContainer(page).locator('input')
  expect(await fromEmail.count()).toBe(1)
  expect(await fromEmail.getAttribute('placeholder', { timeout: 1000 })).toBe('your.email@domain')

  const emailBody = modalWindowEmailContainer(page).locator('textarea')
  expect(await emailBody.count()).toBe(1)
  expect(await emailBody.getAttribute('placeholder', { timeout: 1000 })).toBe(
    'Put your feedback right here...'
  )

  const errorLabel = modalWindowEmailContainer(page).locator('label')
  expect(await errorLabel.count()).toBe(1)

  const sendButton = modalWindowEmailContainer(page).locator('button')
  expect(await sendButton.count()).toBe(1)
  expect(await sendButton.innerText({ timeout: 1000 })).toBe('Send')
  expect(await sendButton.isEnabled({ timeout: 1000 })).toBeTruthy()

  await modalWindowHeaderCancelButton(page).click({ timeout: 1000 })

  await expect(workField(page)).toBeVisible()
  await expect(workField(page)).toBeEmpty()
})

test('visits the app root url, presses email icon which opens Email view, does user email address and body input and presses send', async ({
  page
}) => {
  expect(await page.goto('/')).toBeTruthy()
  await expect(controlPanelIcons(page)).toHaveCount(3)
  await expect(workField(page)).toBeVisible()
  await expect(workField(page)).toBeEmpty()

  await controlPanelIcons(page).first().click({ timeout: 1000 })
  await expect(workField(page)).toBeVisible()
  await expect(modalWindowPlate(page)).toBeVisible()

  await expect(modalWindow(page)).toBeVisible()

  expect(await modalWindowHeaderChildCount(page, 1000)).toBe(2)

  expect(await modalWindowHeader(page).count()).toBe(1)
  expect(await modalWindowHeader(page).isVisible()).toBeTruthy()
  expect(await modalWindowHeaderChildCount(page)).toBe(2)
  expect(await modalWindowHeaderText(page, 1000)).toBe('EMAIL')

  expect(await modalWindowHeaderCancelButton(page).innerHTML({ timeout: 1000 })).not.toBe('')
  expect(await modalWindowHeaderCancelButton(page).isEnabled({ timeout: 1000 })).toBeTruthy()

  expect(await modalWindowEmailContainer(page).count()).toBe(1)

  const emailHeader = modalWindowEmailContainer(page).locator('div.email-header')
  expect(await emailHeader.count()).toBe(1)
  expect(await modalWindowEmailContainer(page).locator('p').count()).toBe(3)
  const toLabel = modalWindowEmailContainer(page).locator('p').first()
  expect(await toLabel.innerText({ timeout: 1000 })).toBe('To:')
  const toEmail = modalWindowEmailContainer(page).locator('p').nth(1)
  expect(await toEmail.innerText({ timeout: 1000 })).toBe('ymamykin@gmail.com')
  const fromLabel = modalWindowEmailContainer(page).locator('p').last()
  expect(await fromLabel.innerText({ timeout: 1000 })).toBe('From:')
  const fromEmail = modalWindowEmailContainer(page).locator('input')
  expect(await fromEmail.count()).toBe(1)
  expect(await fromEmail.getAttribute('placeholder', { timeout: 1000 })).toBe('your.email@domain')

  const emailBody = modalWindowEmailContainer(page).locator('textarea')
  expect(await emailBody.count()).toBe(1)
  expect(await emailBody.getAttribute('placeholder', { timeout: 1000 })).toBe(
    'Put your feedback right here...'
  )

  const errorLabel = modalWindowEmailContainer(page).locator('label')
  expect(await errorLabel.count()).toBe(1)

  const sendButton = modalWindowEmailContainer(page).locator('button')
  expect(await sendButton.count()).toBe(1)
  expect(await sendButton.innerText({ timeout: 1000 })).toBe('Send')
  expect(await sendButton.isEnabled({ timeout: 1000 })).toBeTruthy()

  // invalid email with empty body falls with default form validation
  await fromEmail.fill('invalid-email', { timeout: 1000 })
  expect(await emailBody.inputValue({ timeout: 1000 })).toBe('')
  await sendButton.click({ timeout: 1000 })
  expect(await fromEmail.inputValue({ timeout: 1000 })).toBe('invalid-email')
  expect(await emailBody.inputValue({ timeout: 1000 })).toBe('')
  expect(await errorLabel.innerText({ timeout: 1000 })).toBe('')

  // invalid email with non empty body doesn't pass regex check
  await fromEmail.fill('12c12@kek', { timeout: 1000 })
  await emailBody.fill('1', { timeout: 1000 })
  await sendButton.click({ timeout: 1000 })
  expect(await fromEmail.inputValue({ timeout: 1000 })).toBe('12c12@kek')
  expect(await emailBody.inputValue({ timeout: 1000 })).toBe('1')
  expect(await errorLabel.innerText({ timeout: 1000 })).toBe('Email validation error: regex')

  // normal email, currently fails to send cause no implementation on 'backend' side
  await fromEmail.fill('ymamykin@gmail.com', { timeout: 1000 })
  await emailBody.fill('some body', { timeout: 1000 })
  await sendButton.click({ timeout: 1000 })
  expect(await fromEmail.inputValue({ timeout: 1000 })).toBe('ymamykin@gmail.com')
  expect(await emailBody.inputValue({ timeout: 1000 })).toBe('some body')
  expect(await errorLabel.innerText({ timeout: 1000 })).toBe(
    'Failed to send email. Please, try later.'
  )
})
