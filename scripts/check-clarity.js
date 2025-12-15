// scripts/check-clarity.js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  // Hook addEventListener before any page script runs
  await context.addInitScript(() => {
    window.__addedEvents = [];
    const orig = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (type, listener, options) {
      try { window.__addedEvents.push({ target: this && this.tagName ? this.tagName : 'window', type }); } catch (e) {}
      return orig.call(this, type, listener, options);
    };
  });

  const page = await context.newPage();

  page.on('request', request => {
    const url = request.url();
    if (url.includes('clarity.ms') || url.includes('b.clarity.ms')) {
      console.log('[NET]', request.method(), url);
    }
  });

  // Replace with your local dev URL
  const url = process.env.URL || 'http://localhost:3000';
  console.log('Visiting', url);

  await page.goto(url, { waitUntil: 'networkidle' });

  // Give some time for deferred scripts to run
  await page.waitForTimeout(1000);

  const addedEvents = await page.evaluate(() => window.__addedEvents.slice(0,500));
  const unloadProps = await page.evaluate(() => ({
    onbeforeunload: typeof window.onbeforeunload,
    onunload: typeof window.onunload
  }));
  const hasClarityVar = await page.evaluate(() => typeof window.clarity !== 'undefined');

  console.log('onbeforeunload/onunload props:', unloadProps);
  console.log('window.clarity defined:', hasClarityVar);
  console.log('Recorded addEventListener calls (first 100):', addedEvents.slice(0,100));

  await browser.close();
})();
