import {test, expect} from '@playwright/test'

test.describe('Second Suite', async()=>{

      test.beforeEach(async({page})=>{
        await page.goto('http://uitestingplayground.com/ajax')
        await page.getByText('Button Triggering AJAX Request').click()

    })

    test('Auto waiting', async({page})=>{
        const success = page.locator('.bg-success')   //using class of the text msg shown
        // await successMsg.click()
        // const successTxt = await success.textContent()
       
        await success.waitFor({state: "attached"})

        const successTxt = await success.allTextContents()
        expect(successTxt).toEqual(["Data loaded with AJAX get request."])

    })
})