import React from 'react';


export function getRecordingPageTitle(recording) {
   return <title>{recording.title ? recording.title : ""} | The Beach Boys Mixography</title>;
}

export function getArtistName(artist) {


       var sName;
   
        if (artist.group) {
            sName = artist.groupName;
        } else {
            sName = artist.firstName + " " + artist.surname;
        }
   
       return sName;
    }
   