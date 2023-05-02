import React from 'react';
import PropTypes from 'prop-types';
import * as constants from './Constants.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getArtistName, createDate } from './utilities.js';
import { FormatCredit } from './CreditUtilities.js';

class WriterRow extends React.Component {
  state = {
    isLoaded: false,
    songCredits: [],
    error: null,
  };

  componentDidMount() {
    this.fetchWriters();
  }

  render() {
    const { error, isLoaded, songCredits } = this.state;
    const { credits } = this.props;

    // TODO clean up the lambdas / test them
    //TODO key = 43???? seems a silly attempt to fix a warning
    return (
      <>
        {' '}
        <Row>
          <Col
            className="justify-content-center text-center"
            style={{ fontWeight: 'bold' }}>
            Writing
          </Col>
        </Row>
        {error ? (
          <Row key={43}>
            <Col>
              <p>Failed to load writers: {error.message}</p>
            </Col>
          </Row>
        ) : (
          [
            !isLoaded ? (
              <Row key={44}>
                <Col>
                  <p>Loading...</p>
                </Col>
              </Row>
            ) : (
              songCredits &&
              songCredits.map((writer) => {
                return (
                  <FormatCredit
                    key={writer.id}
                    id={writer.id}
                    role={writer.role.description}
                    performer={getArtistName(writer.performer)}
                    notes={writer.notes}
                  />
                );
              })
            ),
          ]
        )}
        {credits &&
          credits.map((person) => {
            var sReturn = '';

            if (person.role.roletype.writer) {
              sReturn = (
                <FormatCredit
                  key={person.id}
                  id={person.id}
                  role={person.role.description}
                  performer={getArtistName(person.performer)}
                  notes={person.notes}
                />
              );
            }

            return sReturn;
          })}
      </>
    );
  }

  //TODO test / generics etc
  fetchWriters() {
    // eslint-disable-next-line no-undef
    fetch(constants.BASE_URL + `/songcredits/writers/` + this.props.song)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          songCredits: data,
          isLoaded: true,
        })
      )
      .catch((error) => this.setState({ error, isLoaded: true }));
  }
}

WriterRow.propTypes = {
  credits: PropTypes.array.isRequired,
  song: PropTypes.number.isRequired,
};

export default WriterRow;
