const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

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

  const url = process.env.URL || 'http://localhost:3000';
  console.log('Visiting', url);

  // ensure no persisted consent
  await page.addInitScript(() => { try { localStorage.removeItem('analytics_consent'); } catch (e) {} });

  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  console.log('-- BEFORE TRIGGER --');
  const beforeHas = await page.evaluate(() => ({
    clarityVar: typeof window.clarity !== 'undefined',
    consent: (() => { try { return localStorage.getItem('analytics_consent'); } catch (e) { return null; } })(),
  }));
  console.log('before:', beforeHas);

  // Call the exposed enable function on window
  const called = await page.evaluate(async () => {
    try {
      if (typeof window.__enableClarity === 'function') {
        await window.__enableClarity();
        return true;
      }
      return false;
    } catch (e) { return false; }
  });

  console.log('Called window.__enableClarity():', called);

  // wait for the script to load and network activity
  await page.waitForTimeout(1800);

  const afterHas = await page.evaluate(() => ({
    clarityVar: typeof window.clarity !== 'undefined',
    consent: (() => { try { return localStorage.getItem('analytics_consent'); } catch (e) { return null; } })(),
    scriptTags: Array.from(document.scripts).map(s => s.src).filter(Boolean).filter(src => src.includes('clarity')).slice(0,10)
  }));

  console.log('-- AFTER TRIGGER --');
  console.log('after:', afterHas);

  await browser.close();
})();
