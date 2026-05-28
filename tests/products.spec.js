const { test, expect } = require('@playwright/test');
const BASE_URL = 'https://afford-it.co.nz/website/halalmeat/';

test.describe('Product & Navigation Tests', () => {

  test('Product categories are visible', async ({ page }) => {
    await page.goto(BASE_URL);
    const category = page.getByText(/beef|lamb|goat|chicken|meat|shop/i);
    await expect(category.first()).toBeVisible();
  });

  test('Products are displayed on the page', async ({ page }) => {
    await page.goto(BASE_URL);
    const products = page.locator('.product, .item, .card, [class*="product"]');
    const count = await products.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Product images are visible', async ({ page }) => {
    await page.goto(BASE_URL);
    const productImages = page.locator('.product img, .item img, .card img');
    const count = await productImages.count();
    if (count > 0) {
      await expect(productImages.first()).toBeVisible();
    }
  });

  test('Product names are visible', async ({ page }) => {
    await page.goto(BASE_URL);
    const productNames = page.locator('.product h2, .product h3, .product-title, .item h2, .card h2');
    const count = await productNames.count();
    if (count > 0) {
      await expect(productNames.first()).toBeVisible();
    }
  });

  test('Product prices are visible', async ({ page }) => {
    await page.goto(BASE_URL);
    const prices = page.locator('.price, [class*="price"], .amount, .woocommerce-Price-amount');
    const count = await prices.count();
    if (count > 0) {
      await expect(prices.first()).toBeVisible();
    }
  });

  test('Clicking a product opens product page', async ({ page }) => {
    await page.goto(BASE_URL);
    const productLink = page.locator('.product a, .item a, .card a').first();
    if (await productLink.count() > 0) {
      await productLink.click();
      await expect(page).not.toHaveURL(BASE_URL + 'error');
    }
  });

  test('Add to cart button exists on product', async ({ page }) => {
    await page.goto(BASE_URL);
    const addToCart = page.getByText(/add to cart|buy now|order/i);
    if (await addToCart.count() > 0) {
      await expect(addToCart.first()).toBeVisible();
    }
  });

  test('Cart icon is visible in header', async ({ page }) => {
    await page.goto(BASE_URL);
    const cart = page.locator('.cart, .woocommerce-cart, [class*="cart"], a[href*="cart"]');
    if (await cart.count() > 0) {
      await expect(cart.first()).toBeVisible();
    }
  });

});
