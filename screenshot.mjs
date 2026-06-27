import puppeteer from 'puppeteer'
import fs from 'node:fs'
import path from 'node:path'

const url = process.argv[2] || 'http://localhost:3000'
const label = process.argv[3] ? `-${process.argv[3]}` : ''
const dir = './temporary screenshots'
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

const existing = fs.readdirSync(dir).filter(f => f.startsWith('screenshot-')).length
const outPath = path.join(dir, `screenshot-${existing + 1}${label}.png`)

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
// Wait for animations to settle
await new Promise(r => setTimeout(r, 3500))
await page.screenshot({ path: outPath, fullPage: true })
await browser.close()
console.log(`Saved: ${outPath}`)
