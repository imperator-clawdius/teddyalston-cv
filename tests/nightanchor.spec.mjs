import { test, expect } from '@playwright/test';

test('NightAnchor support and privacy have actionable existing contact links', async ({ page }) => {
  await page.goto('/catalog.html');
  await page.getByRole('link', { name: 'Support and privacy' }).click();
  await expect(page).toHaveURL(/\/nightanchor\/$/);
  await expect(page.getByRole('link', { name: 'Email support' })).toHaveAttribute('href', 'mailto:theodore.alston@gmail.com');
  await page.getByRole('link', { name: 'Privacy policy', exact: true }).click();
  await expect(page).toHaveURL(/\/nightanchor\/privacy\/$/);
  await expect(page.getByRole('heading', { name: 'NightAnchor Privacy Policy', exact: true })).toBeVisible();
  await expect(page.getByText('Effective date: June 1, 2026')).toBeVisible();
  await expect(page.getByRole('link', { name: 'theodore.alston@gmail.com' })).toHaveAttribute('href', 'mailto:theodore.alston@gmail.com');
  await expect(page.locator('[href*="nightanchor-sleep-shield"]')).toHaveCount(0);
  await expect(page.locator('form, script')).toHaveCount(0);
  await page.getByRole('link', { name: 'NightAnchor support', exact: true }).click();
  await expect(page).toHaveURL(/\/nightanchor\/$/);
});

for (const path of ['/nightanchor/', '/nightanchor/privacy/']) {
  test(`${path} keeps its content and navigation reachable on mobile`, async ({ page }) => {
    for (const width of [320, 412, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      const overflow = await page.locator('h1, h2, p, li, a').evaluateAll(nodes => nodes
        .filter(el => { const r = el.getBoundingClientRect(); return r.width && (r.right > innerWidth + 1 || r.left < 0 || el.scrollWidth > el.clientWidth + 2); })
        .map(el => el.textContent.trim()));
      expect(overflow, `width ${width}`).toEqual([]);
    }
    await page.goto(path);
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
  });
}
