import { findAllByTestId, render, screen } from '@testing-library/react';
import RecordingDetails from './RecordingDetails';

test('show loading if recording loaded false', () => {
   var recording = {};

    render(<RecordingDetails recording={recording} isRecordingLoaded = {false}/>);
    expect(screen.getByTestId('loadingMsg')).toHaveTextContent("Loading...");
  });

  test('do not show loading if recording loaded true', () => {
    var recording = {
        "id": 1,
        "title": "Good Vibrations",
        "artist": "The Beach Boys"
    }
    render(<RecordingDetails recording = {recording} isRecordingLoaded = {true}/>);
    expect(screen.queryByTestId('loadingMsg')).toBeNull();
    expect(screen.getByTestId("cardTitle")).toHaveTextContent("Good Vibrations");
    expect(screen.getByTestId("artistCol")).toHaveTextContent("The Beach Boys");
  });
