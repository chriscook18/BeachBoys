import { render, screen } from '@testing-library/react';
import { FormatCredit } from './CreditUtilities';

test('format credit with notes', () => {
  render(
    <FormatCredit
      id={0}
      notes={'Acoustic mix only'}
      performer={'The Beach Boys'}
      role={'Backing vocals'}
    />
  );

  expect(screen.getByTestId('formatCredit')).toHaveTextContent(
    'Backing vocals (Acoustic mix only)'
  );
  expect(screen.getByTestId('formatCredit')).toHaveTextContent(
    'The Beach Boys'
  );
});

test('format credit without notes', () => {
  render(
    <FormatCredit
      id={0}
      notes={''}
      performer={'The Beach Boys'}
      role={'Backing vocals'}
    />
  );

  expect(screen.getByTestId('formatCredit')).toHaveTextContent(
    'Backing vocals'
  );
  expect(screen.getByTestId('formatCredit')).toHaveTextContent(
    'The Beach Boys'
  );
});

test('format credit with lowercase role', () => {
  render(
    <FormatCredit
      id={0}
      notes={'Acoustic mix only'}
      performer={'The Beach Boys'}
      role={'backing vocals'}
    />
  );

  expect(screen.getByTestId('formatCredit')).toHaveTextContent(
    'Backing vocals (Acoustic mix only)'
  );
  expect(screen.getByTestId('formatCredit')).toHaveTextContent(
    'The Beach Boys'
  );
});
