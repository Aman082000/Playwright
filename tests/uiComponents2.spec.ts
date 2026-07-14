import {test, expect} from '@playwright/test';

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/')
})

test('sliders', async({page})=>{
    
    //1. Update attribute
    // const tempGauge = await page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    
    // tempGauge.evaluate( node =>{
        
    //     node.setAttribute('cx', '232.60')
    //     node.setAttribute('cy', '232.60')

    // })

    // tempGauge.click()

    //2. Actual mouse movement
    const tempBox = await page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()
    const x = box.x + box.width/2
    const y = box.y + box.height/2

    await page.mouse.move(x,y)
    await page.mouse.down()
    await page.mouse.move(x+200, y)
    await page.mouse.move(x+200, y+100)
    await page.mouse.up()
    
    await expect(tempBox).toContainText('28')    
})