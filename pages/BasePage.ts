import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage holds functionality shared by every page object:
 * navigation, waiting, and thin wrappers around common actions so
 * individual page objects stay focused on *what* they do, not *how*.
 *
 * Every concrete page (HomePage, CartPage, ...) extends this class.
 */
export abstract class BasePage {
  protected readonly page: Page;

  /**
   * Path relative to baseURL that this page lives at.
   * Concrete pages override this (e.g. '/cart', '#/checkout').
   */
  protected abstract readonly path: string;

  constructor(page: Page) {
    this.page = page;
  }

  /** Navigate to this page's path relative to baseURL. */
  async goto(): Promise<void> {
    await this.page.goto(this.path);
    await this.waitForPageLoad();
  }

  /** Override in subclasses if a page has a specific "ready" signal. */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Current page title. */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /** Current URL. */
  getUrl(): string {
    return this.page.url();
  }

  // --- Thin, reusable action wrappers -------------------------------

  protected async click(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  protected async type(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  protected async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent())?.trim() ?? '';
  }

  protected async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  // --- Common assertions --------------------------------------------

  async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async expectText(locator: Locator, expected: string | RegExp): Promise<void> {
    await expect(locator).toHaveText(expected);
  }
}
