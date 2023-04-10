import { findAllByTestId, render, screen } from '@testing-library/react';
import FirstReleaseDate from './FirstReleaseDate2';

test('show placeholder', () => {
  var recording = {};

  render(<FirstReleaseDate />);
  expect(screen.getByTestId('releaseDate')).toHaveTextContent('TODO');
});
