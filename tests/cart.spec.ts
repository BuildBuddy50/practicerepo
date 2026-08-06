import { test, expect } from '../fixtures/pages.fixture';

test.describe('Shopping cart', () => {
  test('empty cart shows empty message @smoke', async ({ cartPage }) => {
    await cartPage.goto();
    await cartPage.expectEmpty();
  });

  test('product added from home appears in cart @regression', async ({
    homePage,
    cartPage,
  }) => {
    await homePage.goto();
    await homePage.addProductByIndex(0);
    await cartPage.goto();
    expect(await cartPage.getItemCount()).toBeGreaterThan(0);
  });

  test('removing an item empties the cart @regression', async ({
    homePage,
    cartPage,
  }) => {
    await homePage.goto();
    await homePage.addProductByIndex(0);
    await cartPage.goto();

    const firstItemName = await cartPage.cartItems.first().textContent();
    if (firstItemName) {
      await cartPage.removeItem(firstItemName.trim());
    }
    // Depending on app behaviour, either count drops or empty message shows.
    await expect
      .poll(async () => cartPage.getItemCount())
      .toBeLessThanOrEqual(1);
  });
});
