import puppeteer from 'puppeteer'
import fs from 'node:fs'

const dir = './temporary screenshots'
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
const existing = fs.readdirSync(dir).filter(f => f.startsWith('screenshot-')).length
const outPath = dir + '/screenshot-' + (existing + 1) + '-hero-viewport.png'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise(r => setTimeout(r, 3500))
await page.screenshot({ path: outPath, fullPage: false })
await browser.close()
console.log('Saved: ' + outPath)
