import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise(r => setTimeout(r, 6000))
// Full top area — wider crop to see both edges clearly
await page.screenshot({ path: 'temporary screenshots/desktop-navbar-full.png', clip: { x: 0, y: 0, width: 1440, height: 130 } })
// Right edge crop
await page.screenshot({ path: 'temporary screenshots/desktop-navbar-right.png', clip: { x: 1350, y: 0, width: 90, height: 130 } })
// Left edge crop
await page.screenshot({ path: 'temporary screenshots/desktop-navbar-left.png', clip: { x: 0, y: 0, width: 90, height: 130 } })
await browser.close()
console.log('Done')
