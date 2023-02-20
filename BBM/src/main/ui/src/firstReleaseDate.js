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

 class FirstReleaseDate extends React.Component {

   state = {
     isLoaded: false,
     releases: [],
     error: null
   }

   componentDidMount() {
//     this.fetchFirstRelease();
   }

   render() {
     const { error, isLoaded, releases } = this.state;

     //TODO key => release.id
     return (
        <Row key={1}><Col>First release:</Col><Col data-testid = "releaseDate">TODO</Col></Row>)

//     return (
//       <>
//         {error ?
//           //<Row><Col><p>Failed to load release information: {error.message}</p></Col></Row>
//           ""
//           : [!isLoaded ? <Row key={45}><Col><p>Loading...</p></Col></Row>
//             : [!releases || releases.length > 0 ? ""//<Row key={45}><Col><p>No data2</p></Col></Row> 
//               : releases.map(release => {
//                 return (
//                   <Row key={release.id}><Col>First release:</Col><Col>{createDate(release.releaseid.year, release.releaseid.month, release.releaseid.day)}</Col></Row>
//                 );
//               })]
//           ]}
//       </>
//     )
   }

//   fetchFirstRelease() {
//     const { versions } = this.props;

//     var masterVersion = 0;

//     for (var i = 0; i < versions.length; i++) {
//       if (versions[i].master === 1) {
//         masterVersion = versions[i].id;
//         break;
//       }
//     }
//     if (masterVersion === 0) {
//       this.setState({ error: { error: "No master version defined" }, isLoaded: true });
//     } else {

//       // eslint-disable-next-line no-undef
//       fetch(constants.BASE_URL + `/appearsOn/firstrelease/` + masterVersion)
//         .then(response => response.json())
//         .then(data =>
//           this.setState({
//             releases: data.data,
//             isLoaded: true,
//           })
//         )
//         .catch(error => this.setState({ error, isLoaded: true, releases: [] }));
//     }
//   }

 }

FirstReleaseDate.propTypes = {
   versions: PropTypes.array.isRequired,
 }

 export default FirstReleaseDate;

