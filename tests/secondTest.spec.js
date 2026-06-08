import {test, expect} from '@playwright/test';


test.beforeEach('before each', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
})


// test('Locate email input field using different selectors', async({page}) =>{
    
//     //by tagName
//     page.locator('input')

//     //by className
//     await page.locator('.shape-rectangle').first().click() 

//     //by id
//     page.locator('#inputEmail1')

//     //by attribute name
//     page.locator('[placeholder="Email"]')

//     //by class value
//     page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

//     //combine different selectors
//     page.locator('input[placeholder="Email"]')

//     //by XPath
//     page.locator('//*[id="inputEmail1"]')
    
//     //by partial text match 
//     page.locator(':text["Using"]')

//     //by exact text match
//     page.locator(':text-is("Using the Grid")')

// })

test('User facing locators', async({page}) => {
    await page.getByRole('textbox', {name: 'Email'}).first().click()
    await page.getByRole('button', {name: 'Sign in'}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    // await page.getByTitle('IoT Dashboard').click()

    await page.getByTestId('SignIn').click()
})

test('locating child elements', async({page})=>{

    await page.locator("nb-card nb-radio :text-is('Option 1')").click()

    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click()

    await page.locator('nb-card').nth(3).getByRole('button').click()
    
})

test('Locating parent elements', async({page}) => {
    
    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox',{name: 'Email'}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: 'Email'}).click()

    await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox', {name: 'Email'}).click()

    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: 'Password'}).click()
    
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign In'}).click()

    await page.locator('nb-card', {hasText: 'Using the Grid'}).locator('..').getByRole('textbox', {name: 'Email'}).click()

    // await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: 'Email'}).click()

})

test('Reusing the locators', async({page})=>{
    
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
    const emailInput = basicForm.getByRole('textbox',{name: 'Email'})

    await emailInput.fill('test@test.com')
    await basicForm.getByRole('textbox',{name: 'Password'}).fill('test123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button', {name: 'Submit'}).click()

    await expect(emailInput).toHaveValue('test@test.com')
})

