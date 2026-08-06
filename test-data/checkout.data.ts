import { CheckoutDetails } from '../pages/CheckoutPage';

export const validCheckout: CheckoutDetails = {
  fullName: 'Test User',
  email: 'test.user@example.com',
  address: '123 Nova Street',
  city: 'Hyderabad',
  zip: '500001',
  cardNumber: '4111111111111111',
  cardExpiry: '12/29',
  cardCvv: '123',
};

export const invalidCheckout: Partial<CheckoutDetails> = {
  fullName: '',
  email: 'not-an-email',
  zip: 'abc',
};

/** Product names used in tests — update to match real Nova Store catalog. */
export const products = {
  first: 'PLACEHOLDER_PRODUCT_NAME_1',
  second: 'PLACEHOLDER_PRODUCT_NAME_2',
};
