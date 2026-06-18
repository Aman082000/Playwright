import {test, expect} from '@playwright/test'

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

    test('Child Elements', async({page}) => {
        await page.locator('nb-card nb-radio :text-is("Option 1")').click()

        await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

        await page.locator('nb-card').getByRole('button', {name: "Sign In"}).first().click()

        await page.locator('nb-card').nth(1).getByRole('button',{name: "Sign In"}).click()
    })

    test('Locating parent elements', async({page}) => {

        await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox',{name: "Email"}).click()

        await page.locator('nb-card',{has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Password"}).click() 


        await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox',{name: "Password"}).click()
        await page.locator('nb-card').filter({has: page.locator("#exampleInputEmail1")}).getByRole('textbox',{name: "Email"}).click()

        await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign In"}).click()

        await page.locator(':text-is("Using the Grid")').locator("..").getByRole('textbox',{name: "Password"}).click()

    })

    test('Reusing Locators', async({page})=>{
        const basicForm = page.locator('nb-card', {hasText: "Basic form"})
        const emailField = basicForm.getByRole('textbox',{name: "Email"})

        await emailField.fill("test@test.com")
        await basicForm.getByRole('textbox',{name: "Password"}).fill("Welcome123")
        await basicForm.getByRole('checkbox', { name: 'Check me out' }).click({force: true})

        await basicForm.getByRole('button',{name: "Submit"}).click()

        await expect(emailField).toHaveValue('test@test.com')
    })

    test('Extracting Values', async({page})=>{
        //Single text value
        const basicForm = await page.locator('nb-card')
                                    .filter({hasText: "Basic Form"})
        
        const buttonContent= await basicForm.getByRole('button', {name: "Submit"}).textContent()
        expect(buttonContent).toEqual('Submit')

        //Multiple text values
        const radioButtons = await page.locator('nb-card',{hasText: "Using the Grid"})
                                 .locator('nb-radio')
                                 .allTextContents()
        
        console.log(radioButtons)                         
        expect(radioButtons).toContain('Option 1')

        //Input value
        const emailField = page.locator('nb-card')
            .filter({hasText: "Basic form"})
            .getByRole('textbox',{name: "Email"})
            
        await emailField.fill('test@test.com')

        const emailValue = await emailField.inputValue()
        expect(emailValue).toEqual("test@test.com")   
        
        const attributeValue = await emailField.getAttribute("placeholder")
        expect(attributeValue).toEqual('Email')
    })

    test('Assertions', async({page})=>{
        
        //General Assertions
        const value = 5
        expect(value).toEqual(5)

        const button = await page.locator('nb-card')
                                 .filter({hasText:"Basic form"})
                                 .getByRole('button',{name: "Submit"})
        
        const buttonValue = await button.textContent()

        expect(buttonValue).toEqual("Submit")  
        
        //Locator Assertions
        await expect(button).toHaveText('Submit')

        //Soft Assertions
        expect.soft(button).toHaveText('Submit10')
        await button.click()

    })

})