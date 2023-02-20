import { findAllByTestId, render, screen } from '@testing-library/react';
import FirstReleaseDate from './firstReleaseDate';

test('show placeholder', () => {
   var recording = {};

    render(<FirstReleaseDate/>);
    expect(screen.getByTestId('releaseDate')).toHaveTextContent("TODO");
  });