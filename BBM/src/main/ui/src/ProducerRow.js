import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import { FormatCredit } from './CreditUtilities';
import { getArtistName } from './recordingUtilities';

class ProducerRow extends React.Component {
  render() {
    const { isLoaded, credits } = this.props;
    var producerEntries = [];

    if (isLoaded) {
      //See if there are any producers
      credits &&
        credits.map((credit) => {
          if (credit.role.roletype.producer) {
            producerEntries.push(credit);
          }

          return true;
        });
    }

    return (
      <>
        <div data-testid="notesBox">
          {producerEntries.length > 0 ? (
            <Row>
              <Col
                className="justify-content-center text-center"
                style={{ fontWeight: 'bold' }}>
                Production
              </Col>
            </Row>
          ) : (
            ''
          )}

          {!isLoaded ? (
            <Row>
              <Col>
                <p>Loading...</p>
              </Col>
            </Row>
          ) : (
            producerEntries &&
            producerEntries.map((producer) => {
              var sReturn = '';

              if (producer.role.roletype.producer) {
                sReturn = (
                  <FormatCredit
                    key={producer.id}
                    id={producer.id}
                    role={producer.role.description}
                    performer={getArtistName(producer.performer)}
                    notes={producer.notes}
                  />
                );
              }

              return sReturn;
            })
          )}
        </div>
      </>
    );
  }
}

ProducerRow.propTypes = {
  credits: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default ProducerRow;
