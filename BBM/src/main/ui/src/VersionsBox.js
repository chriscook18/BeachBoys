import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';

import * as constants from './constants.js';
import PropTypes from 'prop-types';
import { createDate } from './utilities';
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

class VersionsBox extends React.Component {

  state = {
    isVersionsLoaded: false,
    versions: [],
    versionsError: null,
  }

  componentDidMount() {
    this.fetchVersions()
  }

  render() {
    const { versions, versionsError, isVersionsLoaded } = this.state;
    var { songperformer } = this.props;
    var iCountList = 0;
    var iCountTab = 0;

    if (versions) { versions.sort((a, b) => this.sortVersion(a, b)) }

    return (
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>Versions</Card.Title>

          {versionsError ?
            <Row><Col><p>Failed to load versions: {versionsError.message}</p></Col></Row>
            : [!isVersionsLoaded ? <Row key={1}><Col><p>Loading...</p></Col></Row>
              :
              <Tab.Container key={1} id="list-group-tabs-example" defaultActiveKey="#link1">
                <Row>
                  <Col sm={4}>
                    <ListGroup>

                      {versions && versions.map(version => {
                        return (
                          <ListGroup.Item action href={"#link" + ++iCountList} key={version.id}>{version.description}</ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                  </Col>
                  <Col sm={8}>
                    <Tab.Content>
                      {versions && versions.map(version => {
                        return (
                          <VersionDetails key={version.id} tab={++iCountTab} versionID={version.id} 
                          notes={version.notes} duration={version.length} youtube={version.youtube} 
                          songperformer={songperformer} appearsOn={version.appearsOn} />
                        );
                      })}


                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            ]}
        </Card.Body>
      </Card>

    )
  }

  sortVersion(a, b) {
    var iReturn;
    switch (true) {
      case a.sortpriority == null:
        iReturn = 1;
        break;

      case b.sortpriority == null:
        iReturn = -1;
        break;

      case a.sortpriority > b.sortpriority:
        iReturn = 1;
        break;

      case a.sortpriority < b.sortpriority:
        iReturn = -1;
        break;

      case a.description > b.description:
        iReturn = 1;
        break;

      case a.description < b.description:
        iReturn = -1;
        break;

      case a.master:
        iReturn = 1
        break;

      case b.master:
        iReturn = -1
        break;

      default:
        iReturn = 0;
        break;

    }

    return iReturn;
  }

  fetchVersions() {
    // eslint-disable-next-line no-undef
    fetch(constants.BASE_URL + `/recordings/` + this.props.recordingID + `/versions`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          versions: data,
          isVersionsLoaded: true,
        })
      )
      .catch(versionsError => this.setState({
        versionsError,
        isVersionsLoaded: true,
        //Reset this to stop invalid map errors
        versions: []
        //TODO actually handle errors
      }))

      ;
  }

}

VersionsBox.propTypes = {
  recordingID: PropTypes.string.isRequired,
  songperformer: PropTypes.object
}

class VersionDetails extends React.Component {
  state = {
    isAppearancesLoaded: false,
    appearances: [],
    appearancesError: null,
  }

  componentDidMount() {
    //this.fetchAppearances();
  }

  render() {
    const { versionID, tab, notes, duration, youtube, songperformer, appearsOn } = this.props;
    const { appearances, isAppearancesLoaded, appearancesError } = this.state;

   // return (
   //   <Tab.Pane eventKey={"#link" + tab} id={versionID}>
   //     {appearancesError ? <Row><Col><p>Failed to load version details: {appearancesError.message}</p></Col></Row> :
//
     //     [!isAppearancesLoaded ? <Row key={46}><Col><p>Loading...</p></Col></Row> :
     //       <>
      //        {Number(duration) === 0 ? "" : "Duration: " + duration} <p>{notes}</p>
      //        {!youtube ? "" : <p><a href={'https://www.youtube.com/watch?v=' + youtube}>Listen on YouTube</a></p>}
//
       //       {appearances !== undefined ? <><b>Found on...</b>
      //          <ul key={47}> {appearances.sort((a, b) => this.sortAppearances(a, b)).map(appearance => {
       //           return (
       //             <li key={appearance.id}>
       //               <AppearanceDisplay songperformer={songperformer} appearance={appearance} />
      //              </li>
      //            );
      //          })}
     //           </ul>
     //         </> : ""}
//
    //        </>
//
    //      ]

   //     }


   //   </Tab.Pane>)

   
   return (
    <Tab.Pane eventKey={"#link" + tab} id={versionID}>
      {appearancesError ? <Row><Col><p>Failed to load version details: {appearancesError.message}</p></Col></Row> :
          <>
            {Number(duration) === 0 ? "" : "Duration: " + duration} <p>{notes}</p>
            {!youtube ? "" : <p><a href={'https://www.youtube.com/watch?v=' + youtube}>Listen on YouTube</a></p>}

        <><b>Found on...</b><br /><p>{appearsOn}</p>
              
            </>

          </>


      }


    </Tab.Pane>)
  }

  fetchAppearances() {
    // eslint-disable-next-line no-undef
    fetch(constants.BASE_URL + `/version/` + this.props.versionID + `/appearson`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          appearances: data.data,
          isAppearancesLoaded: true,
        })
      )
      .catch(appearancesError => this.setState({
        appearancesError,
        isAppearancesLoaded: true,
        //Reset this to stop invalid 
        appearances: []
      }));
  }

  sortAppearances(a, b) {
    var iReturn;

    switch (true) {

      case a.releaseid.year === 0:
        iReturn = 1;
        break;

      case b.releaseid.year === 0:
        iReturn = -1;
        break;


      case a.releaseid.year > b.releaseid.year:
        iReturn = 1;
        break;

      case a.releaseid.year < b.releaseid.year:
        iReturn = -1;
        break;

      case a.releaseid.month > b.releaseid.month:
        iReturn = -1;
        break;

      case a.releaseid.month < b.releaseid.month:
        iReturn = 1;
        break;

      case a.releaseid.day < b.releaseid.day:
        if (b.releaseid.day === 0) {
          iReturn = 1;
        } else {
          iReturn = -1;
        }
        break;

      case a.releaseid.day > b.releaseid.day:
        iReturn = -1
        break;

      case a.firstappearance:
        iReturn = 1
        break;

      case b.firstappearance:
        iReturn = -1
        break;

      default:
        iReturn = 0;
        break;

    }
    return iReturn;


  }

}

VersionDetails.propTypes = {
  versionID: PropTypes.number.isRequired,
  tab: PropTypes.number.isRequired,
  notes: PropTypes.string,
  duration: PropTypes.string,
  youtube: PropTypes.string,
  songperformer: PropTypes.object
}

class AppearanceDisplay extends React.Component {

  render() {
    const { appearance, songperformer } = this.props;
    const release = appearance.releaseid;

    return (
      <>
        {release.artist ? this.getArtistNameAppearanceFormat(songperformer, release.artist) : ""} {release.releasetype.italics ? <i>{release.title}</i> : [release.releasetype.quotes ? '"' + release.title + '"' : release.title]} {release.unreleased ? (<b>unreleased</b>) : ""}  {release.releasetype.description} {release.description === "" ? "" : " (" + release.description + ")"} ({createDate(release.year, release.month, release.day)}, {release.country}, {release.label}, {release.catalogNo}) {appearance.firstappearance ? <b>First appearance</b> : ""}
      </>
    )
  }


  getArtistNameAppearanceFormat(rRecordingArtist, rPerformer) {
    var sArtistName = "";

    switch (true) {
      case rRecordingArtist.id === rPerformer.id:
        //Don't show name
        break;

      case rPerformer.id !== 0:
        sArtistName = getArtistName(rPerformer) + " - ";
        break;

      default:
        sArtistName = "Various - ";
        break;

    }


    return sArtistName;

  }

}

AppearanceDisplay.propTypes = {
  appearance: PropTypes.shape({
    releaseid: PropTypes.object,
    firstappearance: PropTypes.bool
  }),
  songperformer: PropTypes.object
}



export default VersionsBox;