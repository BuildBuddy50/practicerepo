import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from './components/Header';

/**
 * HomePage — the product listing / storefront landing page.
 *
 * ⚠️  Replace placeholder selectors with real Nova Store selectors.
 */
export class HomePage extends BasePage {
  protected readonly path = '/';
  readonly header: Header;

  // --- Locators (UPDATE THESE) --------------------------------------
  readonly productCards: Locator;
  readonly productTitle: Locator; // relative, used within a card
  readonly productPrice: Locator; // relative, used within a card
  readonly addToCartButtons: Locator;
  readonly sortDropdown: Locator;
  readonly categoryFilter: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);

    // TODO: replace with real Nova Store selectors
    this.productCards = page.locator('[data-testid="product-card"]');
    this.productTitle = page.locator('[data-testid="product-title"]');
    this.productPrice = page.locator('[data-testid="product-price"]');
    this.addToCartButtons = page.getByRole('button', { name: /add to cart/i });
    this.sortDropdown = page.getByRole('combobox', { name: /sort/i });
    this.categoryFilter = page.getByRole('list', { name: /categor/i });
  }

  /** How many product cards are rendered. */
  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }

  /** Locate a single product card by its visible name. */
  productByName(name: string): Locator {
    return this.productCards.filter({ hasText: name });
  }

  /** Add a specific product to the cart by name. */
  async addProductToCart(name: string): Promise<void> {
    const card = this.productByName(name);
    await card.getByRole('button', { name: /add to cart/i }).click();
  }

  /** Add the Nth product (0-indexed) to the cart. */
  async addProductByIndex(index: number): Promise<void> {
    await this.addToCartButtons.nth(index).click();
  }

  async getProductPrice(name: string): Promise<string> {
    const card = this.productByName(name);
    return (await card.locator('[data-testid="product-price"]').textContent())?.trim() ?? '';
  }

  async sortBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption({ label: option });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.productCards.first()).toBeVisible();
  }
}
