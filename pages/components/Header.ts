import { Page, Locator } from '@playwright/test';

/**
 * Header / top navigation — appears on every page, so it lives as a
 * reusable component rather than being duplicated in each page object.
 *
 * ⚠️  SELECTORS ARE PLACEHOLDERS. Replace the strings below with the
 *     real selectors from the Nova Store DOM. Prefer, in order:
 *       1. getByRole / getByLabel / getByText  (user-facing, robust)
 *       2. data-testid attributes               (add them if you can)
 *       3. CSS/id selectors                      (last resort)
 */
export class Header {
  // --- Locators (UPDATE THESE) --------------------------------------
  readonly logo: Locator;
  readonly searchInput: Locator;
  readonly cartIcon: Locator;
  readonly cartCount: Locator;
  readonly navHome: Locator;
  readonly navProducts: Locator;

  constructor(page: Page) {
    // TODO: replace with real Nova Store selectors
    this.logo = page.getByRole('link', { name: /nova store/i });
    this.searchInput = page.getByPlaceholder(/search/i);
    this.cartIcon = page.getByRole('link', { name: /cart/i });
    this.cartCount = page.locator('[data-testid="cart-count"]'); // e.g. the badge number
    this.navHome = page.getByRole('link', { name: /home/i });
    this.navProducts = page.getByRole('link', { name: /products|shop/i });
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  async openCart(): Promise<void> {
    await this.cartIcon.click();
  }

  /** Returns the number shown on the cart badge (0 if not present). */
  async getCartCount(): Promise<number> {
    if (!(await this.cartCount.isVisible().catch(() => false))) return 0;
    const text = (await this.cartCount.textContent())?.trim() ?? '0';
    return parseInt(text, 10) || 0;
  }
}
