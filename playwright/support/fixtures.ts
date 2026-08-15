import { test as base } from '@playwright/test'
import { createOrderLockupActions } from './actions/orderLockupActions'
import { createConfiguratorActions } from './actions/configuratorActions'
import { createOrderActions } from './actions/orderActions'

type App = {
  orderLookup: ReturnType<typeof createOrderLockupActions>
  configurator: ReturnType<typeof createConfiguratorActions>
  order: ReturnType<typeof createOrderActions>
}

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      orderLookup: createOrderLockupActions(page),
      configurator: createConfiguratorActions(page),
      order: createOrderActions(page),
    }
    await use(app)
  },
})

export { expect } from '@playwright/test'
