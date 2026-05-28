const { test, expect } = require('@playwright/test');
const BASE_URL = 'https://afford-it.co.nz/website/halalmeat/';

test.describe('UI/UX Design Tests', () => {

  test('Homepage loads successfully', async ({ page }) => {
    const response = await page.goto(BASE_URL);
    expect(response.status()).toBe(200);
    await expect(page.locator('body')).toBeVisible();
  });

  test('Page title exists', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/.+/);
  });

  test('Page has a logo or brand name', async ({ page }) => {
    await page.goto(BASE_URL);
    const logo = page.locator('img, .logo, header');
    await expect(logo.first()).toBeVisible();
  });

  test('Navigation menu is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    const nav = page.locator('nav, .nav, .navbar, .menu, header');
    await expect(nav.first()).toBeVisible();
  });

  test('Hero section or banner is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    const hero = page.locator('.hero, .banner, .slider, .carousel, section').first();
    await expect(hero).toBeVisible();
  });

  test('Footer is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('Page is responsive on mobile screen', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL);
    await expect(page.locator('body')).toBeVisible();
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(400);
  });

  test('Page is responsive on tablet screen', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);
    await expect(page.locator('body')).toBeVisible();
  });

  test('No horizontal scrollbar on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE_URL);
    const hasHorizontalScroll = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(hasHorizontalScroll).toBeFalsy();
  });

  test('Images on homepage load properly', async ({ page }) => {
    await page.goto(BASE_URL);
    const images = await page.locator('img').all();
    for (const img of images.slice(0, 5)) {
      const naturalWidth = await img.evaluate((el) => el.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('Page loads within 10 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto(BASE_URL);
    expect(Date.now() - start).toBeLessThan(10000);
  });

  test('Fonts and text are visible', async ({ page }) => {
    await page.goto(BASE_URL);
    const headings = page.locator('h1, h2, h3').first();
    await expect(headings).toBeVisible();
  });

  test('Buttons have visible styling', async ({ page }) => {
    await page.goto(BASE_URL);
    const button = page.locator('button, .btn, a.button').first();
    await expect(button).toBeVisible();
  });

});
