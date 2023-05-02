import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

class NotesBox extends React.Component {
  render() {
    const { notes, error, isLoaded } = this.props;

    return (
      <Card style={{ width: '100%' }} data-testid="notesBox">
        <Card.Body>
          <Card.Title>Notes</Card.Title>
          <Card.Text>
            {error
              ? 'Failed to load: ' + error.message
              : [!isLoaded ? 'Loading...' : notes]}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

NotesBox.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  notes: PropTypes.string,
  isLoaded: PropTypes.bool.isRequired,
};

export default NotesBox;
