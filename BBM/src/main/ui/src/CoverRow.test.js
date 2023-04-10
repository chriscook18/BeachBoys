import { render, screen } from '@testing-library/react';
import CoversRow from './CoverRow';

test('show loading text if not loaded', () => {
  render(<CoversRow isLoaded={false} coverID={1} title={'Good Vibrations'} />);
  expect(screen.getByTestId('coversRow')).toHaveTextContent('Loading');
});

test('show nothing if null id supplied', () => {
  render(
    <CoversRow isLoaded={true} coverID={null} title={'Good Vibrations'} />
  );
  expect(screen.getByTestId('coversRow')).toHaveTextContent('');
});

test('show nothing if no id supplied', () => {
  render(<CoversRow isLoaded={true} title={'Good Vibrations'} />);
  expect(screen.getByTestId('coversRow')).toHaveTextContent('');
});

test('show nothing if zero id supplied', () => {
  render(<CoversRow isLoaded={true} coverID={0} title={'Good Vibrations'} />);
  expect(screen.getByTestId('coversRow')).toHaveTextContent('');
});

test('show text if id supplied', () => {
  render(<CoversRow isLoaded={true} coverID={1} title={'Good Vibrations'} />);

  expect(screen.getByTestId('coversRow')).toHaveTextContent(
    'View covers of "Good Vibrations"'
  );

  expect(screen.getByRole('link')).toHaveAttribute(
    'href',
    '/beachboys/covers/song.php?1'
  );
});
