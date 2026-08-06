import { test, expect } from '../fixtures/pages.fixture';

test.describe('Home / product listing', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('storefront loads with products @smoke', async ({ homePage }) => {
    await homePage.expectLoaded();
    expect(await homePage.getProductCount()).toBeGreaterThan(0);
  });

  test('cart starts empty @smoke', async ({ homePage }) => {
    expect(await homePage.header.getCartCount()).toBe(0);
  });

  test('adding a product updates the cart badge @regression', async ({ homePage }) => {
    await homePage.addProductByIndex(0);
    await expect
      .poll(async () => homePage.header.getCartCount())
      .toBeGreaterThan(0);
  });

  test('search returns results @regression', async ({ homePage }) => {
    await homePage.header.search('shirt'); // update term to a real catalog item
    await homePage.expectLoaded();
  });
});
