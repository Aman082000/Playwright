import {test, expect} from '@playwright/test'


test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/')

})

test.describe('Form Layouts', ()=>{

    test.beforeEach(async({page})=>{
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input Fields', async({page})=>{
        const emailInputField = page.locator('nb-card',{hasText: "Using the Grid"}).getByRole('textbox', {name: 'Email'})

        await emailInputField.fill('aman.bhardwaj@gmail.com')
        await emailInputField.clear()
        await emailInputField.pressSequentially('saksam@gmail.com',{delay: 500})

        //Generic assertion
        const value = await emailInputField.inputValue()
        expect(value).toEqual('saksam@gmail.com')

        //Locator assertion
        await expect(emailInputField).toHaveValue('saksam@gmail.com')
    })

    test('Radio button', async({page})=>{
        await page.locator('nb-card',{hasText: 'Using the Grid'})
                  .getByRole('radio',{name: 'Option 1'})
                  .check({force: true});

        await page.locator('nb-card',{hasText: 'Using the Grid'})
                  .getByLabel('Option 2')
                  .check({force: true});    
                  
        //Generic assertion
        const radioButtonStatus = await page.locator('nb-card', {hasText: 'Using the Grid'})
                                             .getByRole('radio', {name: 'Option 2'})
                                             .isChecked();

        expect(radioButtonStatus).toBeTruthy()     
        
        //Locator assertion
        expect(await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('radio', {name: 'Option 2'})).toBeChecked()

        await page.locator('nb-card', {hasText: 'Using the Grid'})
                  .getByRole('radio', {name: 'Option 1'})
                  .check({force: true});    
        const radioValue = await page.locator('nb-card', {hasText: 'Using the Grid'})
                               .getByRole('radio', {name: 'Option 1'})
                               .isChecked()
         
        expect(radioValue).toBeTruthy()                       
    })
})