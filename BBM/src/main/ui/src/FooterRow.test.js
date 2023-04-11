import { render, screen } from '@testing-library/react';
import FooterRow from './FooterRow';

test('show copyright notice', () => {
  render(<FooterRow />);
  expect(screen.getByTestId('footerRow')).toHaveTextContent('©');
});
