import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PropTypes from 'prop-types';
import { capitaliseFirstLetter } from './utilities.js';
import { FormatCredit } from './CreditUtilities.js';
import { getArtistName } from './R2ecordingUtilities.js';

class PersonnelBox extends React.Component {
  render() {
    const { error, isLoaded, credits } = this.props;
    var sLastRole = '';
    var iCount = 0;

    return (
      <Card style={{ width: '100%' }} data-testid="personnelBox">
        <Card.Body>
          <Card.Title>Personnel</Card.Title>
          <Container key={10222}>
            {error ? (
              <Row key={444}>
                <Col>
                  <p>Failed to load credits: {error.message}</p>
                </Col>
              </Row>
            ) : (
              [
                !isLoaded ? (
                  <Row key={1}>
                    <Col>
                      <p>Loading...</p>
                    </Col>
                  </Row>
                ) : (
                  //TODO figure out what was happening here
                  credits &&
                  credits.map((credit) => {
                    var sValue = '';
                    var sValue2 = '';

                    if (
                      (credit.role.roletype.writer == 0) &
                      (credit.role.roletype.producer == 0)
                    ) {
                      if (sLastRole !== credit.role.roletype.description) {
                        sLastRole = credit.role.roletype.description;
                        sValue2 = (
                          <Row key={'roleCount' + ++iCount}>
                            <Col style={{ fontWeight: 'bold' }}>
                              {capitaliseFirstLetter(sLastRole)}
                            </Col>
                          </Row>
                        );
                      }

                      sValue = (
                        <FormatCredit
                          key={'credit' + credit.id}
                          id={credit.id}
                          role={credit.role.description}
                          performer={getArtistName(credit.performer)}
                          notes={credit.notes}
                        />
                      );
                    }

                    return (
                      <>
                        {sValue2}
                        {sValue}
                      </>
                    );
                  })
                ),
              ]
            )}
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

PersonnelBox.propTypes = {
  credits: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

export default PersonnelBox;
