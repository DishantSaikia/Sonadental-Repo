import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise(r => setTimeout(r, 3500))
await page.screenshot({ path: 'temporary screenshots/mobile-navbar-crop.png', clip: { x: 0, y: 0, width: 390, height: 120 } })
await browser.close()
console.log('Saved mobile-navbar-crop.png')
