import { render, screen } from '@testing-library/react';
import NotesBox from './NotesBox';

test('show loading text if not loaded', () => {
  render(<NotesBox isLoaded={false} error={null} notes={''} />);
  expect(screen.getByTestId('notesBox')).toHaveTextContent('Loading...');
});

test('show error if one supplied', () => {
  render(
    <NotesBox
      isLoaded={true}
      error={{ message: 'Oh dear oh dear' }}
      notes={''}
    />
  );

  expect(screen.getByTestId('notesBox')).toHaveTextContent(
    'Failed to load: Oh dear oh dear'
  );
});

test('show notes', () => {
  render(
    <NotesBox isLoaded={true} error={null} notes={'Here are the notes!!!!'} />
  );

  expect(screen.getByTestId('notesBox')).toHaveTextContent(
    'Here are the notes!!!!'
  );
});
