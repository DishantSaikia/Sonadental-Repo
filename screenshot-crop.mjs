import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 60000 })
// Wait for loading screen to fully exit (2800ms dismiss + 850ms animation)
await new Promise(r => setTimeout(r, 4000))
await page.screenshot({ path: 'temporary screenshots/crop-desktop-navbar.png', clip: { x: 0, y: 0, width: 1440, height: 140 } })

// Also mobile
await page.setViewport({ width: 390, height: 844 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise(r => setTimeout(r, 4000))
await page.screenshot({ path: 'temporary screenshots/crop-mobile-navbar.png', clip: { x: 0, y: 0, width: 390, height: 120 } })

await browser.close()
console.log('Done')
