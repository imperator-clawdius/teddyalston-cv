import { test, expect } from '@playwright/test';

for (const path of ['/', '/catalog.html']) {
  test(`${path} has working local assets, links, fragments, and PDF`, async ({ page, request }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    expect((await page.goto(path)).status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    const references = await page.locator('[href], [src]').evaluateAll(nodes => nodes
      .map(node => node.getAttribute('href') || node.getAttribute('src'))
      .filter(Boolean));
    for (const reference of new Set(references)) {
      const url = new URL(reference, page.url());
      if (url.origin !== new URL(page.url()).origin) continue;
      const response = await request.get(url.href);
      expect(response.status(), reference).toBe(200);
      if (url.hash) {
        // Check the target document too, including catalog -> home fragments.
        const html = await response.text();
        expect(html, reference).toContain(`id="${decodeURIComponent(url.hash.slice(1))}"`);
      }
      if (url.pathname.endsWith('.pdf')) {
        expect(response.headers()['content-type']).toContain('application/pdf');
        expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
      }
    }
    for (const img of await page.locator('img').all()) {
      if (await img.isVisible()) await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate(node => node.complete && node.naturalWidth > 0)).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}

for (const width of [320, 412, 768, 880, 881, 900, 1000, 1001, 1024, 1160, 1161, 1200, 1280, 1360, 1361, 1440]) {
  test(`headline and actions fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.locator('h1, .headline-line, a.action, .case-link, .case-points, .architecture-figure, .case-row, .model-steps, .operator-copy').evaluateAll(nodes => nodes
      .filter(el => { const r = el.getBoundingClientRect(); return r.width && (r.right > innerWidth + 1 || r.left < 0 || el.scrollWidth > el.clientWidth + 2); })
      .map(el => el.textContent.trim()));
    expect(overflow).toEqual([]);
  });
}

test('mobile menu closes after selection and Escape restores trigger focus', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 823 });
  await page.goto('/');
  const menu = page.locator('.mobile-menu');
  const trigger = menu.locator('summary');
  await trigger.click();
  await menu.getByRole('link', { name: 'Work', exact: true }).click();
  await expect(page).toHaveURL(/#trident$/);
  await expect(menu).not.toHaveAttribute('open');
  await trigger.click();
  await menu.getByRole('link', { name: 'About', exact: true }).focus();
  await page.keyboard.press('Escape');
  await expect(menu).not.toHaveAttribute('open');
  await expect(trigger).toBeFocused();
});

test('keyboard skip links reach the main content on both pages', async ({ page }) => {
  for (const path of ['/', '/catalog.html']) {
    await page.goto(path);
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
  }
});

test('headline remains readable when external fonts fail', async ({ page }) => {
  await page.route(/fonts\.(googleapis|gstatic)\.com/, route => route.abort());
  for (const width of [320, 412, 768, 1024, 1361, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const overflow = await page.locator('h1, .headline-line').evaluateAll(nodes => nodes
      .filter(el => el.scrollWidth > el.clientWidth + 2).map(el => el.textContent.trim()));
    expect(overflow, `fallback font at ${width}px`).toEqual([]);
  }
});

test('resume action downloads the PDF', async ({ page }) => {
  await page.goto('/');
  const pendingDownload = page.waitForEvent('download');
  await page.locator('.hero-statement').getByRole('link', { name: 'Resume' }).click();
  const download = await pendingDownload;
  expect(download.suggestedFilename()).toBe('Teddy-Alston-CV.pdf');
  expect(await download.failure()).toBeNull();
});

test('catalog content stays within the viewport', async ({ page }) => {
  for (const width of [320, 412, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/catalog.html');
    const overflow = await page.locator('h1, h2, p, a').evaluateAll(nodes => nodes
      .filter(el => { const r = el.getBoundingClientRect(); return r.width && (r.right > innerWidth + 1 || r.left < 0 || el.scrollWidth > el.clientWidth + 2); })
      .map(el => el.textContent.trim()));
    expect(overflow, `catalog at ${width}px`).toEqual([]);
  }
});

test('native mobile navigation works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 412, height: 823 } });
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:8791/');
    await page.locator('.mobile-menu summary').click();
    await page.locator('.mobile-menu').getByRole('link', { name: 'Contact', exact: true }).click();
    await expect(page).toHaveURL(/#contact$/);
  } finally {
    await context.close();
  }
});
