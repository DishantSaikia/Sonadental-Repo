import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

// Desktop
let page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://localhost:3001', { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise(r => setTimeout(r, 4500))
await page.screenshot({ path: 'temporary screenshots/hero-desktop.png', clip: { x: 0, y: 0, width: 1440, height: 900 } })
await page.close()

// Mobile
page = await browser.newPage()
await page.setViewport({ width: 390, height: 844 })
await page.goto('http://localhost:3001', { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise(r => setTimeout(r, 4500))
await page.screenshot({ path: 'temporary screenshots/hero-mobile.png', clip: { x: 0, y: 0, width: 390, height: 844 } })
await page.close()

await browser.close()
console.log('Done')
