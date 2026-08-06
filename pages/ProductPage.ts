import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from './components/Header';

/**
 * ProductPage — an individual product's detail view.
 *
 * ⚠️  Replace placeholder selectors with real Nova Store selectors.
 */
export class ProductPage extends BasePage {
  protected readonly path = '/product';
  readonly header: Header;

  // --- Locators (UPDATE THESE) --------------------------------------
  readonly title: Locator;
  readonly price: Locator;
  readonly description: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly confirmationToast: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);

    // TODO: replace with real Nova Store selectors
    this.title = page.locator('[data-testid="product-detail-title"]');
    this.price = page.locator('[data-testid="product-detail-price"]');
    this.description = page.locator('[data-testid="product-detail-description"]');
    this.quantityInput = page.getByRole('spinbutton', { name: /quantity/i });
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
    this.confirmationToast = page.getByRole('alert');
  }

  async setQuantity(qty: number): Promise<void> {
    await this.quantityInput.fill(String(qty));
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async getPrice(): Promise<string> {
    return (await this.price.textContent())?.trim() ?? '';
  }

  async expectAddedConfirmation(): Promise<void> {
    await expect(this.confirmationToast).toBeVisible();
  }
}
