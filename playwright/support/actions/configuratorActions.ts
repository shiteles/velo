import { Page, expect } from '@playwright/test'

export function createConfiguratorActions(page: Page) {
  const totalPrice = page.getByTestId('total-price')

  return {
    elements: {
      totalPrice,
    },

    async open() {
      await page.goto('/configure')
      await expect(totalPrice).toBeVisible()
    },

    async selectColor(color: string) {
      await page.getByRole('button', { name: color }).click()
    },

    async selectWheels(wheels: string) {
      await page.getByRole('button', { name: new RegExp(wheels) }).click()
    },

    async validatePrice(price: string) {
      await expect(totalPrice).toBeVisible()
      await expect(totalPrice).toHaveText(price)
    },

    async validateCarImage(src: string) {
      const carImage = page.locator('img[alt^="Velô Sprint"]')
      await expect(carImage).toHaveAttribute('src', src)
    },
  }
}
