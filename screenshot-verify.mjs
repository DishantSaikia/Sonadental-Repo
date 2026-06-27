import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

const errors = []
page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()) })
page.on('pageerror', err => errors.push(err.message))

await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 60000 })
// Wait well past loading screen (2800ms dismiss + 850ms exit anim)
await new Promise(r => setTimeout(r, 4500))
await page.screenshot({ path: 'temporary screenshots/verify-desktop.png', clip: { x: 0, y: 0, width: 1440, height: 150 } })

if (errors.length) console.log('JS Errors:', errors.slice(0, 5).join('\n'))
else console.log('No JS errors')

await browser.close()
console.log('Done')
