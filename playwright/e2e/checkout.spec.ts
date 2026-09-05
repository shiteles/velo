import { test, expect } from '../support/fixtures'

test.describe('Checkout', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/order')
    await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()
  })

  test.describe('Validações de campos obrigatórios', () => {


    let alerts: any

    test.beforeEach(async ({ app }) => {
      alerts = app.order.elements.alerts
    })


    test('deve validar obrigatoriedade de todos os campos em branco', async ({ app }) => {
      // Act
      await app.order.submit()

      // Assert
      await expect(alerts.name).toHaveText('Nome deve ter pelo menos 2 caracteres')
      await expect(alerts.lastname).toHaveText('Sobrenome deve ter pelo menos 2 caracteres')
      await expect(alerts.email).toHaveText('Email inválido')
      await expect(alerts.phone).toHaveText('Telefone inválido')
      await expect(alerts.document).toHaveText('CPF inválido')
      await expect(alerts.store).toHaveText('Selecione uma loja')
      await expect(alerts.terms).toHaveText('Aceite os termos')
    })

    test('deve validar limite mínimo de caracteres para Nome e Sobrenome', async ({ page, app }) => {

      const customer = {
        name: 'A',
        lastname: 'B',
        email: 'testing@teste.com',
        phone: '(11) 99999-9999',
        document: '41133355566',
      }

      // Arrange
      await app.order.fillCustomerData(customer)
      await app.order.selectStore('Velô Paulista')
      await app.order.acceptTerms()

      // Act
      await app.order.submit()

      // Assert
      await expect(alerts.name).toHaveText('Nome deve ter pelo menos 2 caracteres')
      await expect(alerts.lastname).toHaveText('Sobrenome deve ter pelo menos 2 caracteres')
    })

    test('deve exibir erro para e-mail com formato inválido', async ({ page, app }) => {

      const customer = {
        name: 'Shirlene',
        lastname: 'Silva',
        email: 'shig@.com',
        phone: '(11) 99999-9999',
        document: '41133355566',
      }

      // Arrange
      await app.order.fillCustomerData(customer)
      await app.order.selectStore('Velô Paulista')
      await app.order.acceptTerms()

      // Act
      await app.order.submit()

      // Assert
      await expect(alerts.email).toHaveText('Email inválido')
    })

    test('deve exibir erro para CPF inválido', async ({ page, app }) => {

      const customer = {
        name: 'Shirlene',
        lastname: 'Silva',
        email: 'shig@email.com',
        phone: '(11) 99999-9999',
        document: '411333555699',
      }

      // Arrange
      await app.order.fillCustomerData(customer)
      await app.order.selectStore('Velô Paulista')
      await app.order.acceptTerms()

      // Act
      await app.order.submit()

      // Assert
      await expect(alerts.document).toHaveText('CPF inválido')
    })

    test('deve exigir o aceite dos termos ao finalizar com dados válidos', async ({ page, app }) => {

      const customer = {
        name: 'Shirlene',
        lastname: 'Silva',
        email: 'shig@email.com',
        phone: '(11) 99999-9999',
        document: '41133355566',
      }

      // Arrange
      await app.order.fillCustomerData(customer)
      await app.order.selectStore('Velô Paulista')


      await expect(app.order.elements.terms).not.toBeChecked() // Premissa inicial

      // Act
      await app.order.submit()

      // Assert
      await expect(alerts.terms).toHaveText('Aceite os termos')
    })
  })

})



