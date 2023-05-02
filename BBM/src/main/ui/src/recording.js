import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Image from 'react-bootstrap/Image';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Tab from 'react-bootstrap/Tab';

import * as constants from './Constants.js';
//import PropTypes from 'prop-types';
// import { getArtistName, createDate } from './utilities';
// import { FormatCredit } from './reactutilities.js';
import HeaderRow from './HeaderRow.js';
// import FooterRow from './footerrow.js';
// import './index.css';
import { Helmet } from 'react-helmet-async';
import { getRecordingPageTitle } from './recordingUtilities';
import RecordingDetails from './recordingDetails.js';
import PersonnelBox from './PersonnelBox.js';
import NotesBox from './NotesBox.js';
import VersionsBox from './VersionsBox.js';

class RecordingDisplay extends React.Component {
  state = {
    isRecordingLoaded: false,
    isCreditsLoaded: false,
    recording: {},
    credits: [],
    creditsError: false,
    recordingsError: false,
  };

  componentDidMount() {
    //     //TODO
    //     //const { recordingID } = this.props.match.params;
    //const { recordingID } = 1;
    this.fetchRecording(1);
    this.fetchCredits(1);
  }

  render() {
    const {
      isRecordingLoaded,
      isCreditsLoaded,
      recording,
      credits,
      recordingsError,
      creditsError,
    } = this.state;

    if (isCreditsLoaded) {
      credits &&
        credits.sort(function (a, b) {
          var keyA;
          var keyB;

          if (a.role.roletype.sortpriorty === 0) {
            keyA = 100 + a.role.roletype.id;
          } else {
            keyA = a.role.roletype.sortpriority;
          }

          if (b.role.roletype.sortpriorty === 0) {
            keyB = 100 + b.role.roletype.id;
          } else {
            keyB = b.role.roletype.sortpriority;
          }

          if (keyA === keyB) {
            //Same type, sort by description
            var keyC = a.role.description;
            var keyD = b.role.description;
            if (keyC < keyD) return -1;
            if (keyC > keyD) return 1;
          }
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
    }

    // TODO seems bad to do so much in this class?
    //TODO refactor to test the recordingsError case
    //TODO eww nested ternaries
    return (
      <>
        <Container>
          <Row>
            <HeaderRow />

            {recordingsError ? (
              <p key={2}>
                Failed to load recording: {recordingsError.message}. Return{' '}
                <a href="/">home</a>
              </p>
            ) : (
              [
                recording && isRecordingLoaded ? (
                  <>
                    <Helmet key={4}>{getRecordingPageTitle(recording)}</Helmet>
                    <RecordingDetails
                      recording={recording}
                      credits={credits}
                      isRecordingLoaded={isRecordingLoaded}
                      isCreditsLoaded={isCreditsLoaded}
                    />
                    <PersonnelBox
                      credits={credits}
                      isLoaded={isCreditsLoaded}
                      error={creditsError}
                    />
                    {recording.notes ? (
                      <NotesBox
                        notes={recording.notes}
                        isLoaded={isRecordingLoaded}
                        error={recordingsError}
                      />
                    ) : (
                      ''
                    )}
                    <VersionsBox
                      recordingID={1}
                      songperformer={recording.artist}
                    />
                  </>
                ) : (
                  <p key={3}>
                    Failed to load recording. Return <a href="/">home</a>
                  </p>
                ),
              ]
            )}
          </Row>
        </Container>
      </>
      //             {recording.notes ? <NotesBox notes={recording.notes} isLoaded={isRecordingLoaded} error={recordingsError} /> : ""}
      //             <VersionsBox recordingID={recordingID} songperformer={recording.artist} />
      //             <OtherRecordingsBox recordingID={recordingID} songID={recording.song.id}/>
      //           </>
      //             : <p>Failed to load recording. Return <a href="/">home</a></p>]}
      //         <FooterRow/></Row></Container>
      //   </>
    );
  }

  //TODO test
  //TODO generalise the fetchs?
  fetchRecording(recordingID) {
    fetch(constants.BASE_URL + `/recordings/` + recordingID)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data)
        this.setState({
          recording: data,
          isRecordingLoaded: true,
        });
      })
      .catch((recordingsError) =>
        this.setState({
          recordingsError,
          isRecordingLoaded: false,
          recording: {},
        })
      );
  }

  fetchCredits(iRecordingID) {
    // eslint-disable-next-line no-undef
    fetch(constants.BASE_URL + `/recordings/` + iRecordingID + `/credits`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          credits: data,
          isCreditsLoaded: true,
        })
      )
      .catch((creditsError) =>
        this.setState({ creditsError, isCreditsLoaded: true, credits: [] })
      );
  }
}

// /* class RecordingDates extends React.Component {

//   render() {
//     const { recordingDates, isLoaded } = this.props;
//     return (
//       <>
//         <Row>
//           <Col className="justify-content-center text-center" style={{ fontWeight: "bold" }}>Session dates</Col>
//         </Row>
//         {!isLoaded ? <Row><Col><p>Loading...</p></Col></Row>
//           : recordingDates.map(date => {
//             return (
//               <FormatRecordingDate key={date.id} date={date}/>
//             );
//           })}
//       </>
//     )
//   }

// }

// RecordingDates.propTypes = {
//   recordingDates: PropTypes.array.isRequired,
//   isLoaded: PropTypes.bool.isRequired
// } */

//

// class OtherRecordingsBox extends React.Component {

//   state = {
//     isRecordingLoaded: false,
//     recordings: [],
//     recordingsError: null,
//   }

//   componentDidMount() {
//     this.fetchOtherRecordings();
//   }

//   render() {
//     const {recordingsError, recordings, isRecordingLoaded} = this.state;

//     return(
// [isRecordingLoaded && recordings.length > 1 ?
//     <Card style={{ width: '100%'}}>
//       <Card.Body>
//       <Card.Title>Other recordings</Card.Title>
//       {recordingsError ?
//         <Card.Text key={47}>Failed to load recording details: {recordingsError.message}</Card.Text>
//         : [!isRecordingLoaded? <Card.Text key={48}>Loading...</Card.Text>
//           : <ListGroup key={878678} variant="flush">{recordings && recordings.map(recording => {
//             return ([recording.id !== this.props.recordingID && !recording.hide ?
//               <ListGroup.Item key={"otherrecording" + recording.id}><a href={'/beachboys/recording/' + recording.id}>{recording.title} (from the <i>{recording.session.name}</i> sessions)</a></ListGroup.Item> : "" ]);
//           })}</ListGroup>]}
//       </Card.Body>
//     </Card> : ""]

//   )
// }

//   fetchOtherRecordings() {
//     // eslint-disable-next-line no-undef
//     fetch(constants.BASE_URL + `song/` + this.props.songID + `/recordings`)
//       .then(response => response.json())
//       .then(data =>
//         this.setState({
//           recordings: data.data,
//           isRecordingLoaded: true,
//         })
//       )
//       .catch(recordingsError => this.setState({
//         recordingsError,
//         isRecordingLoaded: true,
//         recordings: []
//       }));
//   }

// }

// OtherRecordingsBox.propTypes = {
//   recordingID: PropTypes.string.isRequired,
//   songID: PropTypes.string.isRequired

// }

// /* class QuotesBox extends React.Component {
//   state = {
//     isQuotesLoaded: false,
//     quotes: [],
//     quotesError: null,
//   }

//   componentDidMount() {
//     this.fetchQuotes();
//   }
//   render() {
//       const {quotesError, quotes, isQuotesLoaded} = this.state;
//     return(

//       <Card style={{ width: '100%'}}>
//         <Card.Body>
//         <Card.Title>Quotes</Card.Title>
//         {quotesError ?
//           <Card.Text key={47}>Failed to load version details: {quotesError.message}</Card.Text>
//           : [!isQuotesLoaded ? <Card.Text key={48}>Loading...</Card.Text>
//             : <ListGroup key={878678} variant="flush">{quotes && quotes.map(quote => {
//               return (
//                 <ListGroup.Item key={"quote" + quote.id}>&quot;{quote.quote}&quot; - {quote.quoteby}, {createDate(quote.year, quote.month, quote.day)}, {quote.source}</ListGroup.Item>
//               );
//             })}</ListGroup>]}
//         </Card.Body>
//       </Card>

//     )
//   }

//   fetchQuotes() {
//     // eslint-disable-next-line no-undef
//     fetch(constants.BASE_URL + `recording/` + this.props.recordingID + `/quotes`)
//       .then(response => response.json())
//       .then(data =>
//         this.setState({
//           quotes: data.data,
//           isQuotesLoaded: true,
//         })
//       )
//       .catch(quotesError => this.setState({
//         quotesError,
//         isQuotesLoaded: true,
//         quotes: []
//       }));
//   }

// }

// QuotesBox.propTypes = {
//   recordingID: PropTypes.string.isRequired

// } */

export default RecordingDisplay;
