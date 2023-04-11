import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Image from 'react-bootstrap/Image';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Tab from 'react-bootstrap/Tab';

import * as constants from './Constants.js';
import PropTypes from 'prop-types';
// import { getArtistName, createDate } from './utilities';
// import { FormatCredit } from './reactutilities.js';
import HeaderRow from './headerRow.js';
// import FooterRow from './footerrow.js';
// import './index.css';
import { Helmet } from 'react-helmet-async';
import { getRecordingPageTitle } from './recordingUtilities';
import RecordingDetails from './recordingDetails.js';
import { capitaliseFirstLetter } from './utilities.js';
import { FormatCredit } from './reactutilities.js';
import { getArtistName } from './recordingUtilities';

class NotesBox extends React.Component {
  render() {
    const { notes, error, isLoaded } = this.props;

    return (
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>Notes</Card.Title>
          <Card.Text>
            {error
              ? 'Failed to load notes: ' && error.message
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
