import {test, expect} from '@playwright/test';

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/')
})

test('sliders', async({page})=>{
    
    //1. Update attribute
    const tempGauge = await page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    
    tempGauge.evaluate( node =>{
        
        node.setAttribute('cx', '232.60')
        node.setAttribute('cy', '232.60')

    })

    tempGauge.click()

    //2. Actual mouse movement
    
})