import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
 import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
 import Col from 'react-bootstrap/Col';
// import Image from 'react-bootstrap/Image';
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
import { getRecordingPageTitle } from './recordingUtilities';
import RecordingDetails from './recordingDetails.js';
import { capitaliseFirstLetter } from './utilities.js';
import { FormatCredit } from './reactutilities.js';
import { getArtistName } from './recordingUtilities';


class PersonnelBox extends React.Component {

  render() {
    const { error, isLoaded, credits } = this.props;
    var sLastRole = "";
    var iCount = 0;

    return (
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>Personnel</Card.Title>
          <Container key={10222}>
            {error ?
              <Row key={444}><Col><p>Failed to load credits: {error.message}</p></Col></Row>
              : [!isLoaded ? <Row key={1}><Col><p>Loading...</p></Col></Row>
                : credits && credits.map(credit => {
                  var sValue = "";
                  var sValue2 = "";

                  if (credit.role.roletype.writer == 0 & credit.role.roletype.producer == 0) {
                    if (sLastRole !== credit.role.roletype.description){
                      sLastRole = credit.role.roletype.description;
                      sValue2 = <Row key={"roleCount" + ++iCount}><Col style={{ fontWeight: "bold" }}>{capitaliseFirstLetter(sLastRole)}</Col></Row>
                    }

                    sValue = <FormatCredit key={"credit"+credit.id} id={credit.id} role={credit.role.description} performer={getArtistName(credit.performer)} notes={credit.notes} />
                  }

                  return <>{sValue2}{sValue}</>;
                })
              ]}

          </Container>
        </Card.Body>
      </Card>
    )
  }

}

PersonnelBox.propTypes = {
  credits: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  error: PropTypes.object
} 

export default PersonnelBox;
