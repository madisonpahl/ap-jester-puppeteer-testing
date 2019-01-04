const faker = require("faker")

const timeout = 5000

const width = 1500
const height = 1000

const APP = 'https://test.coveredcondos.com/?i=A'

const lead = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  company: faker.company.companyName(),
  address: faker.address.streetAddress()
}

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

describe(
  '/ (Covered Condos Persona A)',
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
      await page.click('.banner_button')
      await delay(500)
      if (text.includes('CCInterestMultiPage')){
        await page.click('.ContactName')
        await page.type('.ContactName', lead.name)
        await page.click('.ContactEmail')
        await page.type('.ContactEmail', lead.email)
        await page.select('select', 'COA')
        await page.click('.sv_next_btn')
        await page.click('.CompanyName')
        await page.type('.CompanyName', lead.company)
        await page.click('#autocomplete')
        await page.type('#autocomplete', lead.address)
        await page.click('.sv_next_btn')
        await delay(100)
        await page.click('.sv_complete_btn')
        await delay(1000)
      }
      else if (text.includes('CCInterestSinglePage')){
        await page.click('.ContactName')
        await page.type('.ContactName', lead.name)
        await page.click('.ContactEmail')
        await page.type('.ContactEmail', lead.email)
        await page.click('.CompanyName')
        await page.type('.CompanyName', lead.company)
        await page.select('select', 'COA')
        await page.click('#autocomplete')
        await page.type('#autocomplete', lead.address)
        await page.click('.sv_complete_btn')
        await delay(1000)

      }
      
    })
  },
  timeout
)
