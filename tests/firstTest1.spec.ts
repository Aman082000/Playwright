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
    })

    test('Locator syntax rules',async({page})=>{
        
        await page.locator('input').click()

        await page.locator('#inputEmail1').click()

        await page.locator('.shape-rectangle').click()

        await page.locator('[placeholder="Email"]').click()

        await page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]').click()

        await page.locator('input[placeholder="Email"].shape-rectangle').click()


    
    })


})