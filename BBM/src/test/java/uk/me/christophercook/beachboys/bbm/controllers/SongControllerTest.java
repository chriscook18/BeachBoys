package uk.me.christophercook.beachboys.bbm.controllers;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import uk.me.christophercook.beachboys.bbm.entites.Song;
import uk.me.christophercook.beachboys.bbm.repositories.RecordingRepository;
import uk.me.christophercook.beachboys.bbm.repositories.SongRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment =  SpringBootTest.WebEnvironment.RANDOM_PORT)
class SongControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private SongController songController;

    private long goodVibrationsID;

    @BeforeEach
    void beforeEach(){
        songRepository.deleteAll();

        goodVibrationsID = songRepository.save(new Song("Good Vibrations")).getId();
        songRepository.save(new Song("Don't Run Away"));

    }

    @Test
    void should_find_all_when_called_from_rest() {

        String response = testRestTemplate.getForObject("http://localhost:" + port + "/songs", String.class);

        assertTrue(response.contains("Good Vibrations"));
        assertTrue(response.contains("Don't Run Away"));

    }

    @Test
    void should_find_all() {

        List<Song> response = songController.index();

        assertEquals(2, response.size());
        assertEquals("Good Vibrations", response.get(0).getTitle());
        assertEquals("Don't Run Away", response.get(1).getTitle());

    }
    @Test
    void show() {
        Song response = songController.show(String.valueOf(goodVibrationsID));

        assertEquals("Good Vibrations", response.getTitle());
        assertEquals(goodVibrationsID, response.getId());
    }

    @Test
    void show_from_rest() {
        String response = testRestTemplate.getForObject("http://localhost:" + port + "/songs/" + goodVibrationsID, String.class);

        assertTrue(response.contains("Good Vibrations"));

    }
}