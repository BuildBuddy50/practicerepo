import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from './components/Header';

/**
 * CartPage — the shopping cart.
 *
 * ⚠️  Replace placeholder selectors with real Nova Store selectors.
 */
export class CartPage extends BasePage {
  protected readonly path = '/cart';
  readonly header: Header;

  // --- Locators (UPDATE THESE) --------------------------------------
  readonly cartItems: Locator;
  readonly emptyMessage: Locator;
  readonly subtotal: Locator;
  readonly total: Locator;
  readonly checkoutButton: Locator;
  readonly continueShopping: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);

    // TODO: replace with real Nova Store selectors
    this.cartItems = page.locator('[data-testid="cart-item"]');
    this.emptyMessage = page.getByText(/your cart is empty/i);
    this.subtotal = page.locator('[data-testid="cart-subtotal"]');
    this.total = page.locator('[data-testid="cart-total"]');
    this.checkoutButton = page.getByRole('button', { name: /checkout/i });
    this.continueShopping = page.getByRole('link', { name: /continue shopping/i });
  }

  /** One cart-item row located by product name. */
  itemByName(name: string): Locator {
    return this.cartItems.filter({ hasText: name });
  }

  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async removeItem(name: string): Promise<void> {
    const row = this.itemByName(name);
    await row.getByRole('button', { name: /remove|delete/i }).click();
  }

  async updateQuantity(name: string, qty: number): Promise<void> {
    const row = this.itemByName(name);
    await row.getByRole('spinbutton').fill(String(qty));
  }

  async getTotal(): Promise<string> {
    return (await this.total.textContent())?.trim() ?? '';
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async expectEmpty(): Promise<void> {
    await expect(this.emptyMessage).toBeVisible();
  }

  async expectItemPresent(name: string): Promise<void> {
    await expect(this.itemByName(name)).toBeVisible();
  }
}
