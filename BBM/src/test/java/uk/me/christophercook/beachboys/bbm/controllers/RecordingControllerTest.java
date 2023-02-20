package uk.me.christophercook.beachboys.bbm.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import uk.me.christophercook.beachboys.bbm.entites.Recording;
import uk.me.christophercook.beachboys.bbm.entites.Song;
import uk.me.christophercook.beachboys.bbm.repositories.RecordingRepository;
import uk.me.christophercook.beachboys.bbm.repositories.SongRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment =  SpringBootTest.WebEnvironment.RANDOM_PORT)
class RecordingControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private RecordingRepository recordingRepository;

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private RecordingController recordingController;

    private long goodVibrationsID;

    @BeforeEach
    void beforeEach(){
        recordingRepository.deleteAll();

        Song gv = songRepository.save(new Song("Good Vibrations"));
        Song dra = songRepository.save(new Song("Don't Run Away"));

        goodVibrationsID = recordingRepository.save(new Recording(gv, "Good Vibes")).getId();
        recordingRepository.save(new Recording(dra, "Don't Run Away"));

    }

    @Test
    void should_find_all_when_called_from_rest() {

        //TODO get song in json straightaway?
        String response = testRestTemplate.getForObject("http://localhost:" + port + "/recordings", String.class);

        assertTrue(response.contains("Good Vibes"));
        assertTrue(response.contains("Don't Run Away"));

    }

    @Test
    void should_find_all() {

        List<Recording> response = recordingController.index();

        assertEquals(2, response.size());
        assertEquals("Good Vibrations", response.get(0).getSong().getTitle());
        assertEquals("Don't Run Away", response.get(1).getSong().getTitle());

        assertEquals("Good Vibes", response.get(0).getTitle());
        assertEquals("Don't Run Away", response.get(1).getTitle());

    }
    @Test
    void show() {
        Recording response = recordingController.show(String.valueOf(goodVibrationsID));

        assertEquals("Good Vibes", response.getTitle());
        assertEquals(goodVibrationsID, response.getId());
        assertEquals("Good Vibrations", response.getSong().getTitle());
    }

    @Test
    void show_from_rest() {
        String response = testRestTemplate.getForObject("http://localhost:" + port + "/recordings/" + goodVibrationsID, String.class);

        assertTrue(response.contains("Good Vibes"));

    }
}