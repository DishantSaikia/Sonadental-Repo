import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

const errors = []
const requests404 = []
page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()) })
page.on('pageerror', err => errors.push('PAGE ERROR: ' + err.message))
page.on('response', res => { if (res.status() === 404) requests404.push(res.url()) })

await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise(r => setTimeout(r, 5000))

console.log('404s:', requests404.join('\n'))
console.log('Errors:', errors.join('\n'))

// Check if loading screen is still visible
const loadingVisible = await page.evaluate(() => {
  const el = document.querySelector('.fixed.inset-0.z-\\[9999\\]')
  return el ? getComputedStyle(el).opacity : 'not found'
})
console.log('Loading screen opacity:', loadingVisible)

await browser.close()
