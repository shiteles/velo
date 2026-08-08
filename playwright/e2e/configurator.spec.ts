import { test } from '../support/fixtures'


test.describe('Configuração do Veículo', () => {
  test.beforeEach(async ({ app }) => {
    await app.configurator.open()
  })

  test('deve atualizar a imagem e manter o preço ao trocar a cor do veículo', async ({ app }) => {
    await app.configurator.validatePrice('R$ 40.000,00')

    await app.configurator.selectColor('Midnight Black')
    await app.configurator.validatePrice('R$ 40.000,00')

    await app.configurator.validateCarImage('/src/assets/midnight-black-aero-wheels.png')
  })

  test('deve atualizar o preço e a imagem ao alternar as rodas, e restaurar os valores padrão', async ({ app }) => {
    await app.configurator.validatePrice('R$ 40.000,00')

    await app.configurator.selectWheels('Sport Wheels')
    await app.configurator.validatePrice('R$ 42.000,00')

    await app.configurator.validateCarImage('/src/assets/glacier-blue-sport-wheels.png')

    await app.configurator.selectWheels('Aero Wheels')
    await app.configurator.validatePrice('R$ 40.000,00')

    await app.configurator.validateCarImage('/src/assets/glacier-blue-aero-wheels.png')
  })

  test('deve atualizar o preço ao marcar e desmarcar opcionais e persistir no checkout', async ({ app }) => {
    await app.configurator.validatePrice('R$ 40.000,00')

    await app.configurator.checkOptional('Precision Park')
    await app.configurator.validatePrice('R$ 45.500,00')

    await app.configurator.checkOptional('Flux Capacitor')
    await app.configurator.validatePrice('R$ 50.500,00')

    await app.configurator.uncheckOptional('Precision Park')
    await app.configurator.validatePrice('R$ 45.000,00')

    await app.configurator.uncheckOptional('Flux Capacitor')
    await app.configurator.validatePrice('R$ 40.000,00')

    await app.configurator.goToCheckout()
    await app.order.validateSummaryPrice('R$ 40.000,00')
  })
})
