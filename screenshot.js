import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  try {
    const screenshotDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    
    console.log("Navigating to http://localhost:5173/ ...");
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    
    // Screenshot 0 (top)
    console.log("Capturing scroll 0...");
    await page.screenshot({ path: path.join(screenshotDir, 'screenshot_0.png') });
    
    // Scroll down by 400px
    console.log("Scrolling by 400px...");
    await page.evaluate(() => window.scrollTo(0, 400));
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(screenshotDir, 'screenshot_400.png') });
    
    // Scroll down by 800px
    console.log("Scrolling by 800px...");
    await page.evaluate(() => window.scrollTo(0, 800));
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(screenshotDir, 'screenshot_800.png') });
    
    // Scroll down by 1200px
    console.log("Scrolling by 1200px...");
    await page.evaluate(() => window.scrollTo(0, 1200));
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(screenshotDir, 'screenshot_1200.png') });
    
    await browser.close();
    console.log(`Screenshots captured successfully in ${screenshotDir}!`);
  } catch (err) {
    console.error("Error capturing screenshots:", err);
    process.exit(1);
  }
})();
