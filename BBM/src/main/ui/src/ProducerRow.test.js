import { render, screen } from '@testing-library/react';
import ProducerRow from './ProducerRow';

test('show loading text if not loaded', () => {
  render(<ProducerRow isLoaded={false} credits={[]} />);
  expect(screen.getByTestId('notesBox')).toHaveTextContent('Loading...');
});

test('show producers if one included', () => {
  render(<ProducerRow isLoaded={true} credits={testCreditsWithProducer()} />);
  expect(screen.getByTestId('notesBox')).toHaveTextContent('Bruce & Terry');
  expect(screen.getByTestId('notesBox')).toHaveTextContent('Carl Wilson');

  expect(screen.getByTestId('notesBox')).not.toHaveTextContent(
    'The Beach Boys'
  );
  expect(screen.getByTestId('notesBox')).not.toHaveTextContent('Van Dyke');
});

test('show no producers if none supplied', () => {
  render(
    <ProducerRow isLoaded={true} credits={testCreditsWithoutProducer()} />
  );

  expect(screen.getByTestId('notesBox')).toBeEmptyDOMElement;
});

function testCreditsWithProducer() {
  return [
    {
      id: 0,
      role: {
        description: 'Lead vocals',
        roletype: {
          writer: false,
          producer: false,
          description: 'Vocals',
        },
      },
      performer: {
        group: true,
        groupName: 'The Beach Boys',
      },
      notes: '',
    },
    {
      id: 2,
      role: {
        description: 'Producer',
        roletype: {
          writer: false,
          producer: true,
          description: 'Production',
        },
      },
      performer: {
        group: true,
        groupName: 'Bruce & Terry',
      },
      notes: '',
    },
    {
      id: 1,
      role: {
        description: 'Additional production by',
        roletype: {
          writer: false,
          producer: true,
          description: 'Production',
        },
      },
      performer: {
        group: false,
        groupName: '',
        firstName: 'Carl',
        surname: 'Wilson',
      },
      notes: '',
    },
    {
      id: 4,
      role: {
        description: 'Additional lyrics by',
        roletype: {
          writer: true,
          producer: false,
          description: 'Writer',
        },
      },
      performer: {
        group: false,
        groupName: '',
        firstName: 'Van Dyke',
        surname: 'Parks',
      },
      notes: '',
    },
  ];
}

function testCreditsWithoutProducer() {
  return [
    {
      id: 0,
      role: {
        description: 'Lead vocals',
        roletype: {
          writer: false,
          producer: false,
          description: 'Vocals',
        },
      },
      performer: {
        group: true,
        groupName: 'The Beach Boys',
      },
      notes: '',
    },
    {
      id: 4,
      role: {
        description: 'Additional lyrics by',
        roletype: {
          writer: true,
          producer: false,
          description: 'Writer',
        },
      },
      performer: {
        group: false,
        groupName: '',
        firstName: 'Van Dyke',
        surname: 'Parks',
      },
      notes: '',
    },
  ];
}
