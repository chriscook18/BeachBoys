import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { capitaliseFirstLetter, createDate } from './U2tilities';
import PropTypes from 'prop-types';

class FormatCredit extends React.Component {
  render() {
    const { id, notes, performer, role } = this.props;
    return (
      <Row key={id} data-testid="formatCredit">
        <Col>
          {capitaliseFirstLetter(role)}
          {notes === '' ? '' : <> ({notes})</>}:
        </Col>
        <Col>{performer}</Col>
      </Row>
    );
  }
}

FormatCredit.propTypes = {
  id: PropTypes.number.isRequired,
  notes: PropTypes.string.isRequired,
  performer: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

// class FormatRecordingDate extends React.Component{
//     render() {
//         const { date } = this.props;
//         return (
//         <Row key={date.id}><Col >{createDate(date.year, date.month, date.day)}{date.location === "" ? "" : " at " + date.location}{date.notes === "" ? "" : " (" + date.notes + ")"} </Col></Row>
//         )}
// }
// FormatRecordingDate.propTypes = {
//     date: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     notes: PropTypes.string.isRequired,
//     year: PropTypes.number.isRequired,
//     month: PropTypes.number.isRequired,
//     day: PropTypes.number.isRequired,
//     location: PropTypes.string.isRequired
//     })
//   }

//export { FormatCredit, FormatRecordingDate };
export { FormatCredit };
