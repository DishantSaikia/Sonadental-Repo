import puppeteer from 'puppeteer'
import fs from 'node:fs'
import path from 'node:path'

const dir = './temporary screenshots'
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 60000 })

// Wait for fonts and initial animations
await new Promise(r => setTimeout(r, 3500))

// Hero (top)
await page.evaluate(() => window.scrollTo(0, 0))
await new Promise(r => setTimeout(r, 600))
await page.screenshot({ path: path.join(dir, 'section-hero.png'), fullPage: false })

// Stats + About
await page.evaluate(() => window.scrollTo({ top: window.innerHeight, behavior: 'instant' }))
await new Promise(r => setTimeout(r, 800))
await page.screenshot({ path: path.join(dir, 'section-stats.png'), fullPage: false })

// Services
await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 2.2, behavior: 'instant' }))
await new Promise(r => setTimeout(r, 800))
await page.screenshot({ path: path.join(dir, 'section-services.png'), fullPage: false })

// Specialists
await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 3.4, behavior: 'instant' }))
await new Promise(r => setTimeout(r, 800))
await page.screenshot({ path: path.join(dir, 'section-specialists.png'), fullPage: false })

// Calculator
await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 4.6, behavior: 'instant' }))
await new Promise(r => setTimeout(r, 800))
await page.screenshot({ path: path.join(dir, 'section-calculator.png'), fullPage: false })

// Testimonials
await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 5.8, behavior: 'instant' }))
await new Promise(r => setTimeout(r, 800))
await page.screenshot({ path: path.join(dir, 'section-testimonials.png'), fullPage: false })

// Contact + Footer
await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }))
await new Promise(r => setTimeout(r, 800))
await page.screenshot({ path: path.join(dir, 'section-footer.png'), fullPage: false })

await browser.close()
console.log('Done — screenshots saved to ./temporary screenshots/')
