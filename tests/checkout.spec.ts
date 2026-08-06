import { test } from '../fixtures/pages.fixture';
import { validCheckout } from '../test-data/checkout.data';

test.describe('Checkout flow', () => {
  test('complete purchase happy path @regression', async ({
    homePage,
    cartPage,
    checkoutPage,
  }) => {
    // Arrange: add a product
    await homePage.goto();
    await homePage.addProductByIndex(0);

    // Act: go to cart -> checkout
    await cartPage.goto();
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckout(validCheckout);

    // Assert
    await checkoutPage.expectOrderConfirmed();
  });

  test('checkout with invalid details shows validation errors @regression', async ({
    homePage,
    cartPage,
    checkoutPage,
  }) => {
    await homePage.goto();
    await homePage.addProductByIndex(0);
    await cartPage.goto();
    await cartPage.proceedToCheckout();

    await checkoutPage.placeOrder(); // submit empty form
    await checkoutPage.expectValidationError();
  });
});
