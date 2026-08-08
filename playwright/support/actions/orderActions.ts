import { Page, expect } from '@playwright/test'

export function createOrderActions(page: Page) {
  const summaryTotalPrice = page.getByTestId('summary-total-price')

  return {
    elements: {
      summaryTotalPrice,
    },

    async validateSummaryPrice(price: string) {
      await expect(summaryTotalPrice).toHaveText(price)
    },
  }
}
