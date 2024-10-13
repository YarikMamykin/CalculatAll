import { test, expect } from '@playwright/test'
import { parse } from 'node-html-parser'

test('visits the app root url, presses email icon which opens Email view, checks content of Email view and presses Cancel button', async ({
  page
}) => {
  expect(await page.goto('/')).toBeTruthy()
  const controlPanelIcons = page
    .locator('div#app')
    .locator('div#control-panel > div.control-panel-icons > svg')
  await expect(controlPanelIcons).toHaveCount(3)
  const workField = page.locator('div#app').locator('div#work-field')
  await expect(workField).toBeVisible()
  await expect(workField).toBeEmpty()

  await controlPanelIcons.first().click({ timeout: 1000 })
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
  expect(await modalWindowHeader.locator('>h2').innerText({ timeout: 1000 })).toBe('EMAIL')

  const cancelButton = modalWindowHeader.locator('>svg.cancel-button')
  expect(await cancelButton.innerHTML({ timeout: 1000 })).not.toBe('')
  expect(await cancelButton.isEnabled({ timeout: 1000 })).toBeTruthy()

  const modalWindowEmailContainer = workField
    .locator('div.modal-window-plate')
    .locator('div.modal-window')
    .locator('form.email-container')
  expect(await modalWindowEmailContainer.count()).toBe(1)

  const emailHeader = modalWindowEmailContainer.locator('div.email-header')
  expect(await emailHeader.count()).toBe(1)
  expect(await modalWindowEmailContainer.locator('p').count()).toBe(3)
  const toLabel = modalWindowEmailContainer.locator('p').first()
  expect(await toLabel.innerText({ timeout: 1000 })).toBe('To:')
  const toEmail = modalWindowEmailContainer.locator('p').nth(1)
  expect(await toEmail.innerText({ timeout: 1000 })).toBe('ymamykin@gmail.com')
  const fromLabel = modalWindowEmailContainer.locator('p').last()
  expect(await fromLabel.innerText({ timeout: 1000 })).toBe('From:')
  const fromEmail = modalWindowEmailContainer.locator('input')
  expect(await fromEmail.count()).toBe(1)
  expect(await fromEmail.getAttribute('placeholder', { timeout: 1000 })).toBe('your.email@domain')

  const emailBody = modalWindowEmailContainer.locator('textarea')
  expect(await emailBody.count()).toBe(1)
  expect(await emailBody.getAttribute('placeholder', { timeout: 1000 })).toBe(
    'Put your feedback right here...'
  )

  const errorLabel = modalWindowEmailContainer.locator('label')
  expect(await errorLabel.count()).toBe(1)

  const sendButton = modalWindowEmailContainer.locator('button')
  expect(await sendButton.count()).toBe(1)
  expect(await sendButton.innerText({ timeout: 1000 })).toBe('Send')
  expect(await sendButton.isEnabled({ timeout: 1000 })).toBeTruthy()

  await cancelButton.click({ timeout: 1000 })

  await expect(workField).toBeVisible()
  await expect(workField).toBeEmpty()
})

test('visits the app root url, presses email icon which opens Email view, does user email address and body input and presses send', async ({
  page
}) => {
  expect(await page.goto('/')).toBeTruthy()
  const controlPanelIcons = page
    .locator('div#app')
    .locator('div#control-panel > div.control-panel-icons > svg')
  await expect(controlPanelIcons).toHaveCount(3)
  const workField = page.locator('div#app').locator('div#work-field')
  await expect(workField).toBeVisible()
  await expect(workField).toBeEmpty()

  await controlPanelIcons.first().click({ timeout: 1000 })
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
  expect(await modalWindowHeader.locator('>h2').innerText({ timeout: 1000 })).toBe('EMAIL')

  const cancelButton = modalWindowHeader.locator('>svg.cancel-button')
  expect(await cancelButton.innerHTML({ timeout: 1000 })).not.toBe('')
  expect(await cancelButton.isEnabled({ timeout: 1000 })).toBeTruthy()

  const modalWindowEmailContainer = workField
    .locator('div.modal-window-plate')
    .locator('div.modal-window')
    .locator('form.email-container')
  expect(await modalWindowEmailContainer.count()).toBe(1)

  const emailHeader = modalWindowEmailContainer.locator('div.email-header')
  expect(await emailHeader.count()).toBe(1)
  expect(await modalWindowEmailContainer.locator('p').count()).toBe(3)
  const toLabel = modalWindowEmailContainer.locator('p').first()
  expect(await toLabel.innerText({ timeout: 1000 })).toBe('To:')
  const toEmail = modalWindowEmailContainer.locator('p').nth(1)
  expect(await toEmail.innerText({ timeout: 1000 })).toBe('ymamykin@gmail.com')
  const fromLabel = modalWindowEmailContainer.locator('p').last()
  expect(await fromLabel.innerText({ timeout: 1000 })).toBe('From:')
  const fromEmail = modalWindowEmailContainer.locator('input')
  expect(await fromEmail.count()).toBe(1)
  expect(await fromEmail.getAttribute('placeholder', { timeout: 1000 })).toBe('your.email@domain')

  const emailBody = modalWindowEmailContainer.locator('textarea')
  expect(await emailBody.count()).toBe(1)
  expect(await emailBody.getAttribute('placeholder', { timeout: 1000 })).toBe(
    'Put your feedback right here...'
  )

  const errorLabel = modalWindowEmailContainer.locator('label')
  expect(await errorLabel.count()).toBe(1)

  const sendButton = modalWindowEmailContainer.locator('button')
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
