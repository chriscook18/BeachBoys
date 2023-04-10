import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Tab from 'react-bootstrap/Tab';

import * as constants from './constants.js';
import PropTypes from 'prop-types';
// import { getArtistName, createDate } from './utilities';
// import { FormatCredit } from './reactutilities.js';
import HeaderRow from './headerRow.js';
// import FooterRow from './footerrow.js';
// import './index.css';
import { Helmet } from 'react-helmet-async';
import { getArtistName } from './recordingUtilities';
import FirstReleaseDate from './FirstReleaseDate2.js';
import WriterRow from './writerRow.js';
import ProducerRow from './ProducerRow.js';
import CoversRow from './CoverRow.js';

class RecordingDetails extends React.Component {
  render() {
    const { recording, credits, isRecordingLoaded, isCreditsLoaded } =
      this.props;

    if (isRecordingLoaded) {
      var sTitle = [recording.title ? recording.title : recording.song.title];
    }

    return (
      <React.Fragment key={recording.id}>
        {isRecordingLoaded ? (
          <>
            <Card style={{ width: '75%' }}>
              <Card.Body>
                <Card.Title data-testid="cardTitle">{sTitle}</Card.Title>

                <Container>
                  <Row>
                    <Col>Artist:</Col>
                    <Col data-testid="artistCol">
                      {getArtistName(recording.artist)}
                    </Col>
                  </Row>
                  <FirstReleaseDate />
                  <WriterRow song={recording.song.id} credits={credits} />
                  <ProducerRow credits={credits} isLoaded={isCreditsLoaded} />
                  <CoversRow
                    isLoaded={isRecordingLoaded}
                    title={recording.title}
                    coverID={recording.song.coversid}
                  />
                </Container>
              </Card.Body>
            </Card>
            <Card style={{ width: '25%' }}>
              <div className="d-flex align-items-center justify-content-center">
                <Image
                  src={constants.IMAGE_REF + recording.image.filename}
                  height="90%"
                  width="90%"
                  alt={recording.image.hovertext}
                />
              </div>
            </Card>
          </>
        ) : (
          <h3 data-testid="loadingMsg">Loading...</h3>
        )}
      </React.Fragment>
    );
  }
}

RecordingDetails.propTypes = {
  recording: PropTypes.object,
  credits: PropTypes.array,
  isRecordingLoaded: PropTypes.bool,
  isCreditsLoaded: PropTypes.bool,
};

export default RecordingDetails;
