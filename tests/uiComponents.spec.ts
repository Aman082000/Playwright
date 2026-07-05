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

test('Checkboxes', async({page})=>{
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    //Already checked by default - so unchecking and checking again 
    // await page.getByRole('checkbox', {name: 'Hide on click'}).click({force: true})
    // await page.getByRole('checkbox', {name: 'Hide on click'}).click({force: true})

    // await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true})
    // await page.getByRole('checkbox', {name: 'Hide on click'}).check({force: true})

    //Check all and verify all checked
    const allboxes = await page.getByRole('checkbox')
    for(const box of await allboxes.all()){
        await box.check({force: true})
        expect(box.isChecked()).toBeTruthy()
    }

    //Uncheck all and verify all unchecked
    const allBoxes1 = await page.getByRole('checkbox')
    for(const box of await allBoxes1.all()){
        await box.uncheck()
        expect(box.isChecked()).toBeFalsy()
    }

})

test('Lists and Dropdown', async({page})=>{

    //Click on Drop down -- see expanded list
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    //Obtain all items in the drop down
    //const listItems = await page.getByRole('list').locator('nb-option')
    const listItems = await page.locator('nb-option-list nb-option')
    await expect(listItems).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])

    //Click on one item in the drop down
    await listItems.filter({hasText: 'Cosmic'}).click()

    //Verify background color
    const headerCSS = page.locator('nb-layout-header')
    await expect(headerCSS).toHaveCSS('background-color',"rgb(50, 50, 89)")

    //Verify all colors and all backgrounds
    const colors = {
        'Light': 'rgb(255, 255, 255)',
        'Dark': 'rgb(34, 43, 69)',
        'Cosmic': 'rgb(50, 50, 89)',
        'Corporate': 'rgb(255, 255, 255)'
    }

    //Open the drop down menu 
    await dropDownMenu.click()
    for(const color in colors){
        await listItems.filter({hasText: color}).click()
        await expect(headerCSS).toHaveCSS('background-color', colors[color])
        if(color != 'Corporate')
            await dropDownMenu.click()   //open the drop down menu everytime except for last color
    }

})