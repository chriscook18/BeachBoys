import { render, screen } from '@testing-library/react';
import PersonnelBox from './PersonnelBox';

test('show loading text if not loaded', () => {
  render(<PersonnelBox isLoaded={false} error={null} credits={[]} />);
  expect(screen.getByTestId('personnelBox')).toHaveTextContent('Loading...');
});

test('show error if one supplied', () => {
  render(
    <PersonnelBox
      isLoaded={true}
      error={{ message: 'Oh dear oh dear' }}
      credits={[]}
    />
  );
  expect(screen.getByTestId('personnelBox')).toHaveTextContent(
    'Failed to load credits: Oh dear oh dear'
  );
});

test('show all credits except producers and writers', () => {
  render(<PersonnelBox isLoaded={true} error={null} credits={testCredits()} />);
  expect(screen.getByTestId('personnelBox')).toHaveTextContent('Lead vocals');
  expect(screen.getByTestId('personnelBox')).toHaveTextContent(
    'The Beach Boys'
  );
  expect(screen.getByTestId('personnelBox')).toHaveTextContent('Instruments');
  expect(screen.getByTestId('personnelBox')).toHaveTextContent('Guitar');
  expect(screen.getByTestId('personnelBox')).toHaveTextContent('Carl Wilson');
  expect(screen.getByTestId('personnelBox')).not.toHaveTextContent('Producer');
  expect(screen.getByTestId('personnelBox')).not.toHaveTextContent(
    'Bruce & Terry'
  );
  expect(screen.getByTestId('personnelBox')).not.toHaveTextContent('Van Dyke');

  //Ensure writer not shown

  //Ensure producer not shown
});

function testCredits() {
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
    },
    {
      id: 1,
      role: {
        description: 'Guitar',
        roletype: {
          writer: false,
          producer: false,
          description: 'Instruments',
        },
      },
      performer: {
        group: false,
        groupName: '',
        firstName: 'Carl',
        surname: 'Wilson',
      },
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
    },
  ];
}
