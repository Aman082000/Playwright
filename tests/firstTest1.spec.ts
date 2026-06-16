import {test} from '@playwright/test'

test.describe('Test Suite',()=>{

    test.beforeEach(async({page})=>{
        await page.goto('http://localhost:4200/')
        await page.getByText('Forms').click()
    })

    test('Form Layouts', async ({page})=>{
        await page.getByText('Form Layouts').click()
        await page.locator('[placeholder="Email"]').first().click()
    })

    test('Datepicker', async({page})=>{
        await page.getByText('Datepicker').click()
    })

})


test.describe('Test Suite 2',()=>{
    
    test.beforeEach(async({page})=>{
        await page.goto('http://localhost:4200/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Locator syntax rules',async({page})=>{
        
        await page.locator('input')

        await page.locator('#inputEmail1').click()

        await page.locator('.shape-rectangle')

        await page.locator('[placeholder="Email"]')

        await page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

        await page.locator('input[placeholder="Email"].shape-rectangle')

        await page.locator(':text-is("Using the Grid")')

        await page.locator(':text("Using")')
    
    })

    test('User Facing Locators', async({page})=>{
        await page.getByRole('textbox', {name: "Email"}).first().click()

        await page.getByRole('button', {name: "Sign In"}).first().click()

        await page.getByLabel("Email").first().click()

        await page.getByPlaceholder('Jane Doe').first().click()

        await page.getByText('Using the Grid').click()

        await page.getByTestId('SignIn').click()

        await page.getByTitle('IoT Dashboard').click()
    })

})