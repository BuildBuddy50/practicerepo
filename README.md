# Nova Store — Playwright POM Framework

A Page Object Model test-automation framework for the [Nova Store](https://buildbuddy50.github.io/novastore/) app, built with **Playwright + TypeScript**.

> ⚠️ **Read this first.** The selectors in the page objects are **placeholders**. They were written against a standard e-commerce structure because the live DOM could not be inspected during generation. Before the suite will pass, map each placeholder to the real Nova Store selector (see *Wiring up real selectors* below). This is a ~15-minute pass, mostly find-and-replace.

## Project structure

```
novastore-pom/
├── pages/                    # Page Objects
│   ├── BasePage.ts           # shared base class (nav, waits, action wrappers)
│   ├── HomePage.ts           # product listing / storefront
│   ├── ProductPage.ts        # product detail
│   ├── CartPage.ts           # shopping cart
│   ├── CheckoutPage.ts       # checkout + confirmation
│   └── components/
│       └── Header.ts         # shared header/nav component
├── fixtures/
│   └── pages.fixture.ts      # injects page objects into tests
├── tests/                    # test specs
│   ├── home.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
├── test-data/                # test data (checkout details, product names)
├── utils/                    # helpers (price parsing, etc.)
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## Setup

```bash
npm install
npx playwright install
```

## Running tests

```bash
npm test                 # all tests, all browsers (headless)
npm run test:headed      # headed
npm run test:ui          # Playwright UI mode
npm run test:chromium    # single browser
npm run test:smoke       # only @smoke-tagged tests
npm run test:regression  # only @regression-tagged tests
npm run report           # open last HTML report
```

## Wiring up real selectors

1. Run codegen against the live app to discover real selectors:
   ```bash
   npm run codegen
   ```
   Click around; Playwright prints the locators it would use.

2. In each page object, replace the `// TODO: replace...` locators. Prefer robust, user-facing locators in this order:
   - `getByRole`, `getByLabel`, `getByText`, `getByPlaceholder`
   - `getByTestId` (ask devs to add `data-testid` attributes if missing)
   - CSS/id selectors only as a last resort

3. Update product names in `test-data/checkout.data.ts` to real catalog items.

4. Confirm the route paths in each page object's `path` field (e.g. the cart might live at `#/cart` for a hash-router SPA).

## Design notes

- **BasePage** centralizes navigation, waiting, and thin action wrappers so page objects describe *behavior*, not mechanics.
- **Components** (like `Header`) are composed into pages rather than duplicated.
- **Fixtures** inject ready-to-use page objects, so tests read declaratively.
- **Web-first assertions** (`expect(locator).toBeVisible()`, `expect.poll`) are used instead of hard waits.
- **Tags** (`@smoke`, `@regression`) let you slice the suite in CI.
