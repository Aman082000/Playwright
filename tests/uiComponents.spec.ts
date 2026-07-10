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

test('Tooltips', async({page})=>{
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
    await toolTipCard.getByRole('button', {name: 'Top'}).hover()

    // await page.pause();

    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')
})

test('Dialog boxes', async({page})=>{
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog =>{
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
    // await page.pause();

    expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')

})

test('Web tables Part 1', async({page})=>{
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //Get the row 
    const thirdRow = page.getByRole('row', {name: 'twitter@outlook.com'})
    
    //Click on pencil icon
    await thirdRow.locator('.nb-edit').click()

   
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('36')

    await page.locator('.nb-checkmark').click()

    //await page.pause()

    //Next use case
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()


    const targetRow = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRow.locator('.nb-edit').click()

   await page.locator('input-editor').getByPlaceholder('E-mail').clear()
   await page.locator('input-editor').getByPlaceholder('E-mail').fill('saksam0808@gmail.com')

   await page.locator('.nb-checkmark').click()

   await expect(targetRow.locator('td').nth(5)).toHaveText('saksam0808@gmail.com')

    //await page.pause() 
})


test('Web tables Part 2', async({page})=>{
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    const ages = ['20', '30', '40', '200']
    for(const age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)

        const tableRows = page.locator('tbody tr')
        for(const row of await tableRows.all()){
            const textValue = await page.locator('td').last().textContent()
            if(age=='200'){
                   // expect(textValue).toEqual(" No data found ")
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            }
            else{
                expect(textValue).toEqual(age)
            }
        }
    }
})

test('Date Picker', async({page})=>{
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calenderInputField = page.locator('nb-card-body').getByPlaceholder('Form Picker')
    await calenderInputField.click()

    let date = new Date()
    date.setDate(date.getDate() + 100)

    const expectedDate = date.getDate().toString()
    const expectedMonth = date.toLocaleString('En-US', {month: 'short'})
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonth} ${expectedDate}, ${expectedYear}`

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()

    expect(calenderInputField).toHaveValue(dateToAssert)
    console.log(dateToAssert)
    //await page.pause()

})

test('Date Picker 2', async({page})=>{
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calenderInputField = page.locator('nb-card-body').getByPlaceholder('Form Picker')
    await calenderInputField.click()

    let date = new Date()
    date.setDate(date.getDate() + 200)

    const expectedDate = date.getDate().toString()
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    //console.log(calendarMonthAndYear)
    const expectedDateInCurrentDateFormat = ` ${expectedMonthLong} ${expectedYear} `

    while(calendarMonthAndYear!=null && !calendarMonthAndYear.includes(expectedDateInCurrentDateFormat)){
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()

    expect(calenderInputField).toHaveValue(dateToAssert)
    //console.log(dateToAssert)

})
