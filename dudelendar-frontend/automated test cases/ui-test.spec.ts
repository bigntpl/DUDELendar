import { test, expect, type Page } from '@playwright/test'

test.describe('Login', () => {
  test('Should login successfully', async ({ page }) => {
    await page.goto('/')
    // Click Login menu
    await page.locator('"Login"').click()
    // Fill the data
    await page.getByRole('textbox', { name: 'enter your username' }).click()
    await page.getByRole('textbox', { name: 'enter your username' }).fill('username1')
    await page.getByRole('textbox', { name: 'enter your password' }).click()
    await page.getByRole('textbox', { name: 'enter your password' }).fill('password2')
    // Click Login button
    await page.getByRole('button', { name: 'Sign In' }).click()

    // Check that redirect to correct page
    await expect(page.locator('"Please wait..."')).toBeVisible()
    await expect(page.locator('"DUDELendar"').nth(1)).toBeVisible()
    await expect(page.locator('"username1"')).toBeVisible()
  })
})

test.describe('Create task', () => {
  test('Should create task successfully', async ({ page, request }) => {
    await page.goto('/')
    // Login first
    await page.locator('"Login"').click()
    // Fill the data
    await page.getByRole('textbox', { name: 'enter your username' }).click()
    await page.getByRole('textbox', { name: 'enter your username' }).fill('username1')
    await page.getByRole('textbox', { name: 'enter your password' }).click()
    await page.getByRole('textbox', { name: 'enter your password' }).fill('password2')
    // Click Login button
    await page.getByRole('button', { name: 'Sign In' }).click()
    await page.waitForTimeout(3000)

    // Click Calendar
    await page.locator('"Calendar"').click()
    // Click the preferred time slot
    await page.locator('tr:nth-child(20) > td:nth-child(2)').click()
    // Fill the task title
    await page.getByLabel('Add task...').click()
    await page.getByLabel('Add task...').fill('Test task 5')
    // Select the task starting date
    await page.getByPlaceholder('mm/dd/yyyy hh:mm (a|p)m').first().click()
    await page.getByPlaceholder('mm/dd/yyyy hh:mm (a|p)m').first().fill('11/29/2022 06:00 AM')
    // Select the task ending date
    await page.getByPlaceholder('mm/dd/yyyy hh:mm (a|p)m').nth(1).click()
    await page.getByPlaceholder('mm/dd/yyyy hh:mm (a|p)m').nth(1).fill('11/29/2022 11:00 AM')
    await page.getByText('to').nth(1).click()
    // Fill the task description
    await page.getByLabel('Detail').click()
    await page.getByLabel('Detail').fill('Test task 5 detail')
    // Click add task
    await page.getByRole('button', { name: 'Add Event' }).click()
    await page.waitForTimeout(2000)

    // Check that redirect to correct page
    await page.goto('/calendar')
    // Check all the task information
    await expect(page.locator('"Test task 5"')).toBeVisible()
    await expect(page.locator('"6:00 - 11:00"')).toBeVisible()
    await page.locator('"Test task 5"').click()
    await expect(await page.locator('id=:r0:').inputValue()).toStrictEqual('Test task 5')
    await expect(await page.getByPlaceholder('mm/dd/yyyy hh:mm (a|p)m').first().inputValue()).toStrictEqual(
      '11/29/2022 06:00 AM'
    )
    await expect(await page.getByPlaceholder('mm/dd/yyyy hh:mm (a|p)m').nth(1).inputValue()).toStrictEqual(
      '11/29/2022 11:00 AM'
    )
    await expect(await page.locator('id=:r3:').inputValue()).toStrictEqual('Test task 5 detail')
  })
})

test.describe('Logout', () => {
  test('Should logout successfully and cannot access the calendar', async ({ page }) => {
    await page.goto('/')
    // Click Login menu
    await page.locator('"Login"').click()
    // Fill the data
    await page.getByRole('textbox', { name: 'enter your username' }).click()
    await page.getByRole('textbox', { name: 'enter your username' }).fill('username1')
    await page.getByRole('textbox', { name: 'enter your password' }).click()
    await page.getByRole('textbox', { name: 'enter your password' }).fill('password2')
    // Click Login button
    await page.getByRole('button', { name: 'Sign In' }).click()
    await page.waitForTimeout(3000)

    // Click Calendar
    await page.locator('"Calendar"').click()

    // Click username again to logout
    await page.locator('"username1"').click()
    // Try to access the calendar
    await page.locator('"Calendar"').click()
    // The website will redirect back to the login page
    await expect(page.locator('"Login"')).toBeVisible()
    await expect(page.locator('"Sign in to your account"')).toBeVisible()
  })
})
