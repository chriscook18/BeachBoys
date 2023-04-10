import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

class CoversRow extends React.Component {
  render() {
    const { isLoaded, coverID, title } = this.props;
    return (
      <React.Fragment>
        <div data-testid="coversRow">
          {!isLoaded ? (
            <Row>
              <Col>
                <p>Loading...</p>
              </Col>
            </Row>
          ) : (
            [
              coverID !== null && coverID !== undefined && coverID !== 0 ? (
                <Row className="coverRow">
                  <Col>
                    <a href={'/beachboys/covers/song.php?' + coverID}>
                      View covers of "{title}"
                    </a>
                  </Col>
                </Row>
              ) : (
                ''
              ),
            ]
          )}
        </div>
      </React.Fragment>
    );
  }
}

CoversRow.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  coverID: PropTypes.number,
  title: PropTypes.string,
};

export default CoversRow;
