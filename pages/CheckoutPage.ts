import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface CheckoutDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

/**
 * CheckoutPage — shipping + payment form and order confirmation.
 *
 * ⚠️  Replace placeholder selectors with real Nova Store selectors.
 */
export class CheckoutPage extends BasePage {
  protected readonly path = '/checkout';

  // --- Locators (UPDATE THESE) --------------------------------------
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly zipInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cardExpiryInput: Locator;
  readonly cardCvvInput: Locator;
  readonly placeOrderButton: Locator;
  readonly orderConfirmation: Locator;
  readonly validationErrors: Locator;

  constructor(page: Page) {
    super(page);

    // TODO: replace with real Nova Store selectors
    this.fullNameInput = page.getByLabel(/full name|name/i);
    this.emailInput = page.getByLabel(/email/i);
    this.addressInput = page.getByLabel(/address/i);
    this.cityInput = page.getByLabel(/city/i);
    this.zipInput = page.getByLabel(/zip|postal/i);
    this.cardNumberInput = page.getByLabel(/card number/i);
    this.cardExpiryInput = page.getByLabel(/expiry|expiration/i);
    this.cardCvvInput = page.getByLabel(/cvv|cvc/i);
    this.placeOrderButton = page.getByRole('button', { name: /place order|pay now/i });
    this.orderConfirmation = page.getByText(/thank you|order confirmed|success/i);
    this.validationErrors = page.locator('[data-testid="error-message"]');
  }

  async fillShipping(details: CheckoutDetails): Promise<void> {
    await this.fullNameInput.fill(details.fullName);
    await this.emailInput.fill(details.email);
    await this.addressInput.fill(details.address);
    await this.cityInput.fill(details.city);
    await this.zipInput.fill(details.zip);
  }

  async fillPayment(details: CheckoutDetails): Promise<void> {
    if (details.cardNumber) await this.cardNumberInput.fill(details.cardNumber);
    if (details.cardExpiry) await this.cardExpiryInput.fill(details.cardExpiry);
    if (details.cardCvv) await this.cardCvvInput.fill(details.cardCvv);
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }

  /** Full happy-path checkout in one call. */
  async completeCheckout(details: CheckoutDetails): Promise<void> {
    await this.fillShipping(details);
    await this.fillPayment(details);
    await this.placeOrder();
  }

  async expectOrderConfirmed(): Promise<void> {
    await expect(this.orderConfirmation).toBeVisible();
  }

  async expectValidationError(): Promise<void> {
    await expect(this.validationErrors.first()).toBeVisible();
  }
}
