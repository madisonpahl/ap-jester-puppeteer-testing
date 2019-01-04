const faker = require("faker")

const timeout = 5000

const width = 1500
const height = 1000

const APP = 'https://test.coveredcondos.com/'

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

describe(
  '/ (Covered Condos Links Test)',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.setViewport({ width, height })
      await page.goto(APP), timeout
    })

    afterAll(async () => {
      await page.close()
    })

    it('should load without error', async () => {
      let text = await page.evaluate(() => document.body.textContent)
      expect(text).toContain('CoveredCondos')
      await page.goto(APP+'about')
      await page.goto(APP+'faq')
      await page.goto(APP+'terms')
      await page.goto(APP+'privacy')
    })
  },
  timeout
)
