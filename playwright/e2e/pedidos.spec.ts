import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'

/// AAA - Arrange, Act, Assert

test.describe('Consultar Pedido', () => {

    test.beforeEach(async ({ page }) => {
        //Arrange
        await page.goto('http://localhost:5173/')
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

        await page.getByRole('link', { name: 'Consultar Pedido' }).click()
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
    });

    test('deve consultar um pedido aprovado', async ({ page }) => {

        // Test Data
        //const order = 'VLO-N79BUR'

        const order = {
            number: 'VLO-N79BUR',
            status: 'APROVADO',
            color: 'Glacier Blue',
            wheels: 'aero Wheels',
            customer: {
                name: 'Shi Testing',
                email: 'shi@dev.com'
            },
            payment: 'À Vista'

        }

        //Act
        await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)
        await page.getByRole('button', { name: 'Buscar Pedido' }).click()

        // //Assert

        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
              - img
              - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

        const statusBadge = page.getByRole('status').filter({ hasText: order.status })

        await expect(statusBadge).toHaveClass(/bg-green-100/)
        await expect(statusBadge).toHaveClass(/text-green-700/)

        const statusIcon = statusBadge.locator('svg')
        expect(statusIcon).toHaveClass(/lucide-circle-check-big/)

    })

    test('deve consultar um pedido reprovado', async ({ page }) => {

        // Test Data
        //const order = 'VLO-MLTU59'

        const order = {
            number: 'VLO-MLTU59',
            status: 'REPROVADO',
            color: 'Midnight Black',
            wheels: 'sport Wheels',
            customer: {
                name: 'Steve Jobs',
                email: 'jobs@apple.com'
            },
            payment: 'À Vista'

        }

        //Act
        await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)
        await page.getByRole('button', { name: 'Buscar Pedido' }).click()

        // //Assert

        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
              - img
              - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

        const statusBadge = page.getByRole('status').filter({ hasText: order.status })

        await expect(statusBadge).toHaveClass(/bg-red-100/)
        await expect(statusBadge).toHaveClass(/text-red-700/)

        const statusIcon = statusBadge.locator('svg')
        expect(statusIcon).toHaveClass(/lucide-circle-x/)


    })

    test('deve consultar um pedido em analise', async ({ page }) => {

        // Test Data

        const order = {
            number: 'VLO-YZFTUH',
            status: 'EM_ANALISE',
            color: 'Lunar White',
            wheels: 'aero Wheels',
            customer: {
                name: 'Beyonce Knowles',
                email: 'beyhive@email.com'
            },
            payment: 'À Vista'

        }

        //Act
        await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)
        await page.getByRole('button', { name: 'Buscar Pedido' }).click()

        // //Assert

        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
              - img
              - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

        const statusBadge = page.getByRole('status').filter({ hasText: order.status })

        await expect(statusBadge).toHaveClass(/bg-amber-100/)
        await expect(statusBadge).toHaveClass(/text-amber-700/)

        const statusIcon = statusBadge.locator('svg')
        expect(statusIcon).toHaveClass(/lucide-clock/)

    })

    test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

        const order = generateOrderCode()

        await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
        await page.getByRole('button', { name: 'Buscar Pedido' }).click()

        await expect(page.locator('#root')).toMatchAriaSnapshot(`
        - img
        - heading "Pedido não encontrado" [level=3]
        - paragraph: Verifique o número do pedido e tente novamente
        `);

    })

})

