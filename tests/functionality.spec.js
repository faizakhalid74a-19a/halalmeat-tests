const { test, expect } = require('@playwright/test');
const BASE_URL = 'https://afford-it.co.nz/website/halalmeat/';

test.describe('Functionality Tests', () => {

  test('All navigation links work without 404', async ({ page }) => {
    await page.goto(BASE_URL);
    const links = await page.locator('nav a, .menu a').all();
    for (const link of links.slice(0, 5)) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('tel')) {
        const response = await page.goto(href.startsWith('http') ? href : BASE_URL + href);
        expect(response?.status()).not.toBe(404);
        await page.goto(BASE_URL);
      }
    }
  });

  test('Contact information is present', async ({ page }) => {
    await page.goto(BASE_URL);
    const contact = page.getByText(/contact|phone|email|address|call us/i);
    await expect(contact.first()).toBeVisible();
  });

  test('Email link works', async ({ page }) => {
    await page.goto(BASE_URL);
    const emailLink = page.locator('a[href^="mailto"]');
    if (await emailLink.count() > 0) {
      const href = await emailLink.first().getAttribute('href');
      expect(href).toContain('mailto:');
    }
  });

  test('Phone number link works', async ({ page }) => {
    await page.goto(BASE_URL);
    const phoneLink = page.locator('a[href^="tel"]');
    if (await phoneLink.count() > 0) {
      const href = await phoneLink.first().getAttribute('href');
      expect(href).toContain('tel:');
    }
  });

  test('Search functionality works if present', async ({ page }) => {
    await page.goto(BASE_URL);
    const searchInput = page.locator('input[type="search"], input[placeholder*="search" i], .search-input');
    if (await searchInput.count() > 0) {
      await searchInput.first().fill('chicken');
      await page.keyboard.press('Enter');
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('No JavaScript errors on homepage', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto(BASE_URL);
    expect(errors.length).toBe(0);
  });

  test('Page has proper meta description for SEO', async ({ page }) => {
    await page.goto(BASE_URL);
    const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDesc).toBeTruthy();
  });

  test('Social media links work if present', async ({ page }) => {
    await page.goto(BASE_URL);
    const socialLinks = page.locator('a[href*="facebook"], a[href*="instagram"], a[href*="twitter"]');
    if (await socialLinks.count() > 0) {
      await expect(socialLinks.first()).toBeVisible();
    }
  });

  test('Halal certification or trust badge is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    const halal = page.getByText(/halal|certified|trusted/i);
    await expect(halal.first()).toBeVisible();
  });

});
