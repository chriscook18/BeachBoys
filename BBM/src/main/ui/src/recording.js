import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Image from 'react-bootstrap/Image';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Tab from 'react-bootstrap/Tab';

 import * as constants from './constants.js';
 //import PropTypes from 'prop-types';
// import { getArtistName, createDate } from './utilities';
// import { FormatCredit } from './reactutilities.js';
import HeaderRow from './headerRow.js';
// import FooterRow from './footerrow.js';
// import './index.css';
 import { Helmet } from 'react-helmet-async';
import { getRecordingPageTitle } from './recordingUtilities';
import RecordingDetails from './recordingDetails.js';

 class RecordingDisplay extends React.Component {
 
   state = {
     isRecordingLoaded: false,
     isCreditsLoaded: false,
     recording: {},
     credits: [],
//     creditsError: null,
     recordingsError: false,
   }

   componentDidMount() {
//     //TODO 
//     //const { recordingID } = this.props.match.params;
     //const { recordingID } = 1;
     this.fetchRecording(1);
//     this.fetchCredits(recordingID);
   }


   render() {
     const { isRecordingLoaded, isCreditsLoaded, recording, credits, recordingsError } = this.state;
//     //TODO
//     //const { recordingID } = this.props.match.params;
//     const { recordingID } = 1;
//     if (isCreditsLoaded) {
//       credits && credits.sort(function (a, b) {
//         var keyA;
//         var keyB;

//         if (a.role.roletype.sortpriorty === 0) {
//           keyA = 100 + a.role.roletype.id;
//         } else {
//           keyA = a.role.roletype.sortpriority;
//         }

//         if (b.role.roletype.sortpriorty === 0) {
//           keyB = 100 + b.role.roletype.id;
//         } else {
//           keyB = b.role.roletype.sortpriority;
//         }

//         if (keyA === keyB) {
//           //Same type, sort by description
//           var keyC = a.role.description;
//           var keyD = b.role.description;
//           if (keyC < keyD) return -1;
//           if (keyC > keyD) return 1;

//         }
//         if (keyA < keyB) return -1;
//         if (keyA > keyB) return 1;
//         return 0;
//       });
//     }

     console.log(isRecordingLoaded)
     console.log(recording)


      // TODO seems bad to do so much in this class?
       //TODO refactor to test the recordingsError case
       //TODO eww nested ternaries
    return (
       <>
       <Container><Row><HeaderRow />
       
       {recordingsError ? <p key={2}>Failed to load recording: {recordingsError.message}. Return <a href="/">home</a></p> :
       
       [recording && isRecordingLoaded ? 
        <>
       <Helmet key={4}>
             {getRecordingPageTitle(recording)}
         </Helmet>
          <RecordingDetails recording={recording} credits={credits} isRecordingLoaded={isRecordingLoaded} isCreditsLoaded={isCreditsLoaded} />

</>
         :  <p key={3}>Failed to load recording. Return <a href="/">home</a></p> ]

}
       
       
       </Row>
       
       
       
         </Container>
       </>
//         <Container><Row><HeaderRow />
//           {recordingsError ? <p>Failed to load recording: {recordingsError.message}. Return <a href="/">home</a></p> : [recording && isRecordingLoaded ? <><Helmet>
//             <title>{recording.title ? recording.title : ""} | The Beach Boys Mixography</title>
//           </Helmet>
//             <RecordingDetails recording={recording} credits={credits} isRecordingLoaded={isRecordingLoaded} isCreditsLoaded={isCreditsLoaded} />
//             {/* <PersonnelBox credits={credits} isLoaded={isCreditsLoaded} error={creditsError} /> */}
//             {recording.notes ? <NotesBox notes={recording.notes} isLoaded={isRecordingLoaded} error={recordingsError} /> : ""}
//             <VersionsBox recordingID={recordingID} songperformer={recording.artist} />
//             <OtherRecordingsBox recordingID={recordingID} songID={recording.song.id}/>
//           </>
//             : <p>Failed to load recording. Return <a href="/">home</a></p>]}
//         <FooterRow/></Row></Container>
    //   </>
     )
   }
	
	   //TODO test
      //TODO generalise the fetchs?
	   fetchRecording(recordingID) {

	
	     fetch(constants.BASE_URL + `/recordings/` + recordingID)
	       .then(response => response.json())
	       .then(data =>{
	                  //console.log(data)
	                  this.setState({
	                    recording: data,
	                   isRecordingLoaded: true,
	                  })})
	      .catch(recordingsError => this.setState({ recordingsError, isRecordingLoaded: false, recording: {} }));
	   }
	

//   fetchCredits(iRecordingID) {
//     // eslint-disable-next-line no-undef
//     fetch(constants.BASE_URL + `/recording/` + iRecordingID + `/credits/`)
//       .then(response => response.json())
//       .then(data =>
//         this.setState({
//           credits: data.data,
//           isCreditsLoaded: true,
//         })
//       )
//       .catch(creditsError => this.setState({ creditsError, isCreditsLoaded: true, credits: [] }));
//   }

}
// RecordingDisplay.propTypes = {
//   //TODO
//   //match: PropTypes.shape({
//     //params: PropTypes.shape({
//     //  recordingID: PropTypes.string.isRequired
//    // })
//  // })
// }



// class ProducerRow extends React.Component {

//   render() {
//     const { isLoaded, credits } = this.props;
//     var rProducerEntries = [];

//     if (isLoaded) {
//       //See if there are any producers
//       credits && credits.map(rCredit => {
//         if (rCredit.role.roletype.producer) {
//           rProducerEntries.push(rCredit);
//         }

//         return true;
//       })
//     }

//     return (
//       <>
//         {rProducerEntries.length > 0 ? <Row>
//           <Col className="justify-content-center text-center" style={{ fontWeight: "bold" }}>Production</Col>
//         </Row>
//           : ""}

//         {!isLoaded ? <Row><Col><p>Loading...</p></Col></Row>
//           :
//           rProducerEntries && rProducerEntries.map(producer => {
//             var sReturn = ""

//             if (producer.role.roletype.producer) {
//               sReturn = <FormatCredit key={producer.id} id={producer.id} role={producer.role.description} performer={getArtistName(producer.performer)} notes={producer.notes} />
//             }

//             return sReturn;
//           })
//         }
//       </>
//     )
//   }

// }

// ProducerRow.propTypes = {
//   credits: PropTypes.array.isRequired,
//   isLoaded: PropTypes.bool.isRequired
// }

// class CoversRow extends React.Component {

//   render() {
//     const { isLoaded, coverID, title } = this.props;
//     console.log(coverID);
//     return (
//       <>
//         {!isLoaded ? <Row><Col><p>Loading...</p></Col></Row>
//           :
//          [coverID !== null ? <Row className="coverRow"><Col><a href={'/beachboys/covers/song.php?' + coverID}>View covers of {title}</a></Col></Row>
//         : ""]}
//       </>
//     )
//   }

// }

// CoversRow.propTypes = {
//   isLoaded: PropTypes.bool.isRequired,
//   coverID: PropTypes.number,
//   title: PropTypes.string
// }

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

// /* class PersonnelBox extends React.Component {

//   render() {
//     const { error, isLoaded, credits } = this.props;
//     var sLastRole = "";
//     var iCount = 0;

//     return (
//       <Card style={{ width: '100%' }}>
//         <Card.Body>
//           <Card.Title>Personnel</Card.Title>
//           <Container key={10222}>
//             {error ?
//               <Row key={444}><Col><p>Failed to load credits: {error.message}</p></Col></Row>
//               : [!isLoaded ? <Row key={1}><Col><p>Loading...</p></Col></Row>
//                 : credits && credits.map(credit => {
//                   var sValue = "";
//                   var sValue2 = "";

//                   if (credit.role.roletype.writer === 0 & credit.role.roletype.producer === 0) {
//                     if (sLastRole !== credit.role.roletype.description){
//                       sLastRole = credit.role.roletype.description;
//                       sValue2 = <Row key={"roleCount" + ++iCount}><Col style={{ fontWeight: "bold" }}>{capitaliseFirstLetter(sLastRole)}</Col></Row>
//                     }

//                     sValue = <FormatCredit key={"credit"+credit.id} id={credit.id} role={credit.role.description} performer={getArtistName(credit.performer)} notes={credit.notes} />
//                   }

//                   return <>{sValue2}{sValue}</>;
//                 })
//               ]}

//           </Container>
//         </Card.Body>
//       </Card>
//     )
//   }

// }

// PersonnelBox.propTypes = {
//   credits: PropTypes.array.isRequired,
//   isLoaded: PropTypes.bool.isRequired,
//   error: PropTypes.object
// } */

// class VersionsBox extends React.Component {

//   state = {
//     isVersionsLoaded: false,
//     versions: [],
//     versionsError: null,
//   }

//   componentDidMount() {
//     this.fetchVersions();
//   }

//   render() {
//     const { versions, versionsError, isVersionsLoaded } = this.state;
//     var { songperformer } = this.props;
//     var iCountList = 0;
//     var iCountTab = 0;

//     if (versions) { versions.sort((a, b) => this.sortVersion(a, b)) }

//     return (
//       <Card style={{ width: '100%' }}>
//         <Card.Body>
//           <Card.Title>Versions</Card.Title>

//           {versionsError ?
//             <Row><Col><p>Failed to load versions: {versionsError.message}</p></Col></Row>
//             : [!isVersionsLoaded ? <Row key={1}><Col><p>Loading...</p></Col></Row>
//               :
//               <Tab.Container key={1} id="list-group-tabs-example" defaultActiveKey="#link1">
//                 <Row>
//                   <Col sm={4}>
//                     <ListGroup>

//                       {versions && versions.map(version => {
//                         return (
//                           <ListGroup.Item action href={"#link" + ++iCountList} key={version.id}>{version.description}</ListGroup.Item>
//                         );
//                       })}
//                     </ListGroup>
//                   </Col>
//                   <Col sm={8}>
//                     <Tab.Content>
//                       {versions && versions.map(version => {
//                         return (
//                           <VersionDetails key={version.id} tab={++iCountTab} versionID={version.id} notes={version.notes} duration={version.length} youtube={version.youtube} songperformer={songperformer} />
//                         );
//                       })}


//                     </Tab.Content>
//                   </Col>
//                 </Row>
//               </Tab.Container>
//             ]}
//         </Card.Body>
//       </Card>

//     )
//   }

//   sortVersion(a, b) {
//     var iReturn;
//     switch (true) {
//       case a.sortpriority == null:
//         iReturn = 1;
//         break;

//       case b.sortpriority == null:
//         iReturn = -1;
//         break;

//       case a.sortpriority > b.sortpriority:
//         iReturn = 1;
//         break;

//       case a.sortpriority < b.sortpriority:
//         iReturn = -1;
//         break;

//       case a.description > b.description:
//         iReturn = 1;
//         break;

//       case a.description < b.description:
//         iReturn = -1;
//         break;

//       case a.master:
//         iReturn = 1
//         break;

//       case b.master:
//         iReturn = -1
//         break;

//       default:
//         iReturn = 0;
//         break;

//     }

//     return iReturn;
//   }

//   fetchVersions() {
//     // eslint-disable-next-line no-undef
//     fetch(constants.BASE_URL + `recording/` + this.props.recordingID + `/versions`)
//       .then(response => response.json())
//       .then(data =>
//         this.setState({
//           versions: data.data,
//           isVersionsLoaded: true,
//         })
//       )
//       .catch(versionsError => this.setState({
//         versionsError,
//         isVersionsLoaded: true,
//         //Reset this to stop invalid map errors
//         versions: []
//       }));
//   }

// }

// VersionsBox.propTypes = {
//   recordingID: PropTypes.string.isRequired,
//   songperformer: PropTypes.object
// }

// class VersionDetails extends React.Component {
//   state = {
//     isAppearancesLoaded: false,
//     appearances: [],
//     appearancesError: null,
//   }

//   componentDidMount() {
//     this.fetchAppearances();
//   }

//   render() {
//     const { versionID, tab, notes, duration, youtube, songperformer } = this.props;
//     const { appearances, isAppearancesLoaded, appearancesError } = this.state;

//     return (
//       <Tab.Pane eventKey={"#link" + tab} id={versionID}>
//         {appearancesError ? <Row><Col><p>Failed to load version details: {appearancesError.message}</p></Col></Row> :

//           [!isAppearancesLoaded ? <Row key={46}><Col><p>Loading...</p></Col></Row> :
//             <>
//               {Number(duration) === 0 ? "" : "Duration: " + duration} <p>{notes}</p>
//               {!youtube ? "" : <p><a href={'https://www.youtube.com/watch?v=' + youtube}>Listen on YouTube</a></p>}

//               { appearances !== undefined ? <><b>Found on...</b>
//                 <ul key={47}> {appearances.sort((a, b) => this.sortAppearances(a, b)).map(appearance => {
//                   return (
//                     <li key={appearance.id}>
//                       <AppearanceDisplay songperformer={songperformer} appearance={appearance} />
//                     </li>
//                   );
//                 })}
//                 </ul>
//               </> : ""}

//             </>

//           ]

//         }


//       </Tab.Pane>)
//   }

//   fetchAppearances() {
//     // eslint-disable-next-line no-undef
//     fetch(constants.BASE_URL + `version/` + this.props.versionID + `/appearson`)
//       .then(response => response.json())
//       .then(data =>
//         this.setState({
//           appearances: data.data,
//           isAppearancesLoaded: true,
//         })
//       )
//       .catch(appearancesError => this.setState({
//         appearancesError,
//         isAppearancesLoaded: true,
//         //Reset this to stop invalid 
//         appearances: []
//       }));
//   }

//   sortAppearances(a, b) {
//     var iReturn;

//     switch (true) {

//       case a.releaseid.year === 0:
//         iReturn = 1;
//         break;

//       case b.releaseid.year === 0:
//         iReturn = -1;
//         break;


//       case a.releaseid.year > b.releaseid.year:
//         iReturn = 1;
//         break;

//       case a.releaseid.year < b.releaseid.year:
//         iReturn = -1;
//         break;

//       case a.releaseid.month > b.releaseid.month:
//         iReturn = -1;
//         break;

//       case a.releaseid.month < b.releaseid.month:
//         iReturn = 1;
//         break;

//       case a.releaseid.day < b.releaseid.day:
//         if (b.releaseid.day === 0) {
//           iReturn = 1;
//         } else {
//           iReturn = -1;
//         }
//         break;

//       case a.releaseid.day > b.releaseid.day:
//         iReturn = -1
//         break;

//       case a.firstappearance:
//         iReturn = 1
//         break;

//       case b.firstappearance:
//         iReturn = -1
//         break;

//       default:
//         iReturn = 0;
//         break;

//     }
//     // console.log(iReturn);
//     return iReturn;


//   }

// }

// VersionDetails.propTypes = {
//   versionID: PropTypes.number.isRequired,
//   tab: PropTypes.number.isRequired,
//   notes: PropTypes.string,
//   duration: PropTypes.string,
//   youtube: PropTypes.string,
//   songperformer: PropTypes.object
// }

// class AppearanceDisplay extends React.Component {

//   render() {
//     const { appearance, songperformer } = this.props;
//     const release = appearance.releaseid;

//     return (
//       <>
//         {release.artist ? this.getArtistNameAppearanceFormat(songperformer, release.artist) : ""} {release.releasetype.italics ? <i>{release.title}</i> : [release.releasetype.quotes ? '"' + release.title + '"' : release.title]} {release.unreleased ? (<b>unreleased</b>) : ""}  {release.releasetype.description} {release.description === "" ? "" : " (" + release.description + ")"} ({createDate(release.year, release.month, release.day)}, {release.country}, {release.label}, {release.catalogNo}) {appearance.firstappearance ? <b>First appearance</b> : ""}
//       </>
//     )
//   }


//   getArtistNameAppearanceFormat(rRecordingArtist, rPerformer) {
//     var sArtistName = "";

//     console.log(rRecordingArtist === rPerformer);
//     console.log(rPerformer);

//     switch (true) {
//       case rRecordingArtist.id === rPerformer.id:
//         //Don't show name
//         break;

//       case rPerformer.id !== 0:
//         sArtistName = getArtistName(rPerformer) + " - ";
//         break;

//       default:
//         sArtistName = "Various - ";
//         break;

//     }


//     return sArtistName;

//   }

// }

// AppearanceDisplay.propTypes = {
//   appearance: PropTypes.shape({
//     releaseid: PropTypes.object,
//     firstappearance: PropTypes.bool
//   }),
//   songperformer: PropTypes.object
// }

// class NotesBox extends React.Component {

//   render() {

//     const { notes, error, isLoaded } = this.props;

//     return (

//       <Card style={{ width: '100%' }}>
//         <Card.Body>
//           <Card.Title>Notes</Card.Title>
//           <Card.Text>
//             {error ?
//               "Failed to load notes: " && error.message
//               : [!isLoaded ? "Loading..."
//                 : notes]}
//           </Card.Text>

//         </Card.Body>
//       </Card>
//     )
//   }
// }

// NotesBox.propTypes = {
//   error: PropTypes.shape({
//     message: PropTypes.string
//   }),
//   notes: PropTypes.string,
//   isLoaded: PropTypes.bool.isRequired

// }

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


