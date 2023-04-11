import { render, screen } from '@testing-library/react';
import HeaderRow from './headerRow';

test('header row contains image and link', () => {
  render(<HeaderRow />);
  expect(screen.getByRole('link')).toHaveAttribute('href', '/beachboys/list');
  expect(screen.getByRole('img')).toBeEnabled();
});
