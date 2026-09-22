import { render, screen } from '@testing-library/react';
import App from './App';

test('renders primary navigation and supporting links', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  expect(screen.getByText('Our Product')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Invoice Discounting' })).toHaveAttribute(
    'href',
    '/products/supply-chain/invoice-discounting'
  );
  expect(screen.getByRole('link', { name: 'EMI Calculator' })).toHaveAttribute(
    'href',
    '/resources/emi-calculator'
  );
  expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute(
    'href',
    '/policies/privacy-policy'
  );
});

test('renders the supply-chain product detail page for nested URLs', () => {
  window.history.pushState({}, 'Purchase Finance', '/products/supply-chain/purchase-finance');

  render(<App />);

  expect(screen.getByRole('heading', { name: /purchase finance/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /what you’ll need to apply/i })).toBeInTheDocument();
});
