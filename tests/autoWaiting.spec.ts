import {test, expect} from '@playwright/test'

test.describe('First Suite', async()=>{

      test.beforeEach(async({page}, testInfo)=>{
        await page.goto('http://uitestingplayground.com/ajax')
        await page.getByText('Button Triggering AJAX Request').click()
        testInfo.setTimeout(testInfo.timeout + 2000)
    })

    test('Auto waiting', async({page})=>{
        const success = page.locator('.bg-success')   //using class of the text msg shown
        // await successMsg.click()
        // const successTxt = await success.textContent()
       
        // await success.waitFor({state: "attached"})

        // const successTxt = await success.allTextContents()
        // expect(successTxt).toEqual(["Data loaded with AJAX get request."])

        //Locator Assertion
        await expect (success).toHaveText('Data loaded with AJAX get request.',{timeout:200000})

    })

    test('alternative waits', async({page})=>{
        const success = page.locator('.bg-success')

        // await page.waitForSelector('.bg-success')
        // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

        await page.waitForLoadState('networkidle')

        const successTxt = await success.allTextContents()
        expect(successTxt).toEqual(["Data loaded with AJAX get request."])

    })

    test('timeouts', async({page})=>{

        //test.setTimeout(10000)
        test.slow()
        const success = page.locator('.bg-success')   
        await success.click()

    })

})