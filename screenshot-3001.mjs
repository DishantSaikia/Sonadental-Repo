import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://localhost:3001', { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise(r => setTimeout(r, 4500))
await page.screenshot({ path: 'temporary screenshots/navbar-desktop-3001.png', clip: { x: 0, y: 0, width: 1440, height: 150 } })

// Right edge
await page.screenshot({ path: 'temporary screenshots/navbar-right-3001.png', clip: { x: 1340, y: 0, width: 100, height: 150 } })
// Left edge
await page.screenshot({ path: 'temporary screenshots/navbar-left-3001.png', clip: { x: 0, y: 0, width: 100, height: 150 } })

// Mobile
await page.setViewport({ width: 390, height: 844 })
await page.goto('http://localhost:3001', { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise(r => setTimeout(r, 4500))
await page.screenshot({ path: 'temporary screenshots/navbar-mobile-3001.png', clip: { x: 0, y: 0, width: 390, height: 120 } })

await browser.close()
console.log('Done')
