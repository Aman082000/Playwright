import { test } from '@playwright/test';


test.beforeEach('before each', async ({ page }) => {
    await page.goto('http://localhost:4200/');
})

test.describe('first test suite', () => {
    test.beforeEach('before each', async ({ page }) => {
        await page.getByText('Forms').click();
    })

    test('the first test', async ({ page }) => {
        await page.getByText('Form Layouts').click();
    })

    test('Navigate to DatePicker Page', async ({ page }) => {
        await page.getByText('Datepicker').click();
    })
})

test.describe('second test suite', () => {
    test.beforeEach('before each', async ({ page }) => {
        await page.getByText('Charts', { exact: true }).click();
    })

    test('the first test', async ({ page }) => {
        await page.getByText('Echarts', { exact: true }).click();
    })

})