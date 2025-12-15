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

  page.on('console', msg => {
    try { console.log('PAGE_CONSOLE:', msg.text()); } catch (e) {}
  });

  page.on('request', request => {
    const url = request.url();
    if (url.includes('clarity.ms') || url.includes('b.clarity.ms')) {
      console.log('[NET]', request.method(), url);
    }
  });

  const url = process.env.URL || 'http://localhost:3000';
  console.log('Visiting', url);

  // Ensure no consent persisted
  await context.clearCookies();
  await page.addInitScript(() => {
    try { localStorage.removeItem('analytics_consent'); } catch (e) {}
  });

  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  const addedEvents1 = await page.evaluate(() => window.__addedEvents.slice(0,500));
  const unloadProps1 = await page.evaluate(() => ({
    onbeforeunload: typeof window.onbeforeunload,
    onunload: typeof window.onunload
  }));
  const hasClarityVar1 = await page.evaluate(() => typeof window.clarity !== 'undefined');

  console.log('\n-- BEFORE CONSENT --');
  console.log('onbeforeunload/onunload props:', unloadProps1);
  console.log('window.clarity defined:', hasClarityVar1);
  console.log('Recorded addEventListener calls (first 100):', addedEvents1.slice(0,100));

  // Try to click the consent button if present
  const acceptBtn = await page.$('text=Accepter');
  if (acceptBtn) {
    console.log('\nClicking Accept button');
    await acceptBtn.click();
    // Wait for dynamic import and network
    await page.waitForTimeout(1500);
    const clarityScripts = await page.evaluate(() => Array.from(document.scripts).map(s => s.src).filter(Boolean).filter(src => src.includes('clarity')).slice(0,10));
    console.log('Script tags with "clarity" after click:', clarityScripts);
    const stored = await page.evaluate(() => {
      try { return localStorage.getItem('analytics_consent'); } catch (e) { return null; }
    });
    console.log('localStorage.analytics_consent after click:', stored);
  } else {
    console.log('\nNo Accept button found on page');
  }

  // Explicitly set localStorage consent to simulate acceptance if UI click failed
  await page.evaluate(() => {
    try { localStorage.setItem('analytics_consent', 'granted'); } catch (e) {}
  });
  console.log('\nSet localStorage.analytics_consent = granted directly');

  // Inject official Clarity snippet directly from the test to confirm network activity
  await page.evaluate(() => {
    try {
      if (!window.clarity) {
        (function(c, l, a, r, i) {
          c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments); };
          const t = l.createElement(r);
          t.async = 1;
          t.src = `https://www.clarity.ms/tag/${i}`;
          const y = l.getElementsByTagName(r)[0];
          if (y && y.parentNode) y.parentNode.insertBefore(t, y);
        })(window, document, 'clarity', 'script', 'slgv50xvaf');
      }
    } catch (e) {}
  });
  await page.waitForTimeout(1500);
  const clarityScriptsAfter = await page.evaluate(() => Array.from(document.scripts).map(s => s.src).filter(Boolean).filter(src => src.includes('clarity')).slice(0,10));
  console.log('Script tags with "clarity" after injection:', clarityScriptsAfter);
  const hasClarityNow = await page.evaluate(() => typeof window.clarity !== 'undefined');
  console.log('window.clarity defined after injection:', hasClarityNow);

  // Reload to let any init that sets window.clarity run
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const addedEvents2 = await page.evaluate(() => window.__addedEvents.slice(0,500));
  const unloadProps2 = await page.evaluate(() => ({
    onbeforeunload: typeof window.onbeforeunload,
    onunload: typeof window.onunload
  }));
  const hasClarityVar2 = await page.evaluate(() => typeof window.clarity !== 'undefined');

  console.log('\n-- AFTER CONSENT --');
  console.log('onbeforeunload/onunload props:', unloadProps2);
  console.log('window.clarity defined:', hasClarityVar2);
  console.log('Recorded addEventListener calls (first 100):', addedEvents2.slice(0,100));

  await browser.close();
})();
