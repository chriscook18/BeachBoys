import { render, screen } from '@testing-library/react';
import {getArtistName, getRecordingPageTitle} from './recordingUtilities.js';

test('shows empty title if no recording supplied', () => {
  
  const expected = ['', ' | The Beach Boys Mixography' ]
  
  var recording = {
    "title": ""
  }

  var titleObject = getRecordingPageTitle(recording)

  expect(titleObject.type).toBe('title')
  expect(titleObject.props.children).toEqual(expect.arrayContaining(expected))
});

test('shows recording title if no recording supplied', () => {
  
  const expected = ['Dierdre', ' | The Beach Boys Mixography' ]
  
  var recording = {
    "title": "Dierdre"
  }

  var titleObject = getRecordingPageTitle(recording)

  expect(titleObject.type).toBe('title')
  expect(titleObject.props.children).toEqual(expect.arrayContaining(expected))
});


test('artist groupname returned if group', () => {

  var artist = {
    "group": true,
    "groupName": "The Rip Chords"
  }

  expect(getArtistName(artist)).toBe('The Rip Chords')

});

test('artist full name returned if not group', () => {

  var artist = {
    "goup": false,
    "groupName": "The Rip Chords",
    "firstName": "Terry",
    "surname": "Melcher"
  }

  expect(getArtistName(artist)).toBe('Terry Melcher')

});