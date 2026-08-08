import { Page, expect } from '@playwright/test'

export function createConfiguratorActions(page: Page) {
  const totalPrice = page.getByTestId('total-price')

  const optionalCheckbox = (name: string) =>
    page.getByRole('checkbox', { name: new RegExp(name) })

  return {
    elements: {
      totalPrice,
    },

    async open() {
      await page.goto('/configure')
      await page.evaluate(() => localStorage.removeItem('velo-configurator-storage'))
      await page.reload()
      await expect(totalPrice).toBeVisible()
    },

    async selectColor(color: string) {
      await page.getByRole('button', { name: color }).click()
    },

    async selectWheels(wheels: string) {
      await page.getByRole('button', { name: new RegExp(wheels) }).click()
    },

    async checkOptional(name: string) {
      await optionalCheckbox(name).check()
    },

    async uncheckOptional(name: string) {
      await optionalCheckbox(name).uncheck()
    },

    async validatePrice(price: string) {
      await expect(totalPrice).toHaveText(price)
    },

    async validateCarImage(src: string) {
      const carImage = page.locator('img[alt^="Velô Sprint"]')
      await expect(carImage).toHaveAttribute('src', src)
    },

    async goToCheckout() {
      await page.getByRole('button', { name: 'Monte o Seu' }).click()
      await expect(page).toHaveURL(/\/order$/)
    },
  }
}
