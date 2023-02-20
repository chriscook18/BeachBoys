package uk.me.christophercook.beachboys.bbm.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import uk.me.christophercook.beachboys.bbm.entites.People;
import uk.me.christophercook.beachboys.bbm.entites.Recording;
import uk.me.christophercook.beachboys.bbm.entites.Song;
import uk.me.christophercook.beachboys.bbm.repositories.PeopleRepository;
import uk.me.christophercook.beachboys.bbm.repositories.RecordingRepository;
import uk.me.christophercook.beachboys.bbm.repositories.SongRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

//TODO test / do something with fact that "people/" and "people" urls do different things

@SpringBootTest(webEnvironment =  SpringBootTest.WebEnvironment.RANDOM_PORT)
class PeopleControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private PeopleRepository peopleRepository;

    @Autowired
    private PeopleController peopleController;

    private Long bruceId;

    @BeforeEach
    void beforeEach(){
        peopleRepository.deleteAll();

        bruceId = peopleRepository.save(new People("Bruce", "Johnston")).getId();
        peopleRepository.save(new People("The Beach Boys", true));

    }

    @Test
    void should_find_all_when_called_from_rest() {
        //TODO why doesn't this work (shrug)

        String response = testRestTemplate.getForObject("http://localhost:" + port + "/people", String.class);

        assertTrue(response.contains("Bruce"));
        assertTrue(response.contains("Johnston"));
        assertTrue(response.contains("The Beach Boys"));

    }

    @Test
    void should_find_all() {

        List<People> response = peopleController.index();

        assertEquals(2, response.size());
        assertEquals("Bruce", response.get(0).getFirstName());
        assertEquals("Johnston", response.get(0).getSurname());
        assertFalse(response.get(0).isGroup());

        assertEquals("The Beach Boys", response.get(1).getGroupName());
        assertTrue(response.get(1).isGroup());

    }
    @Test
    void show() {
        People response = peopleController.show(String.valueOf(bruceId));

        assertEquals("Bruce", response.getFirstName());
    }

    @Test
    void show_from_rest() {
        //TODO why doesn't this work (shrug)
        String response = testRestTemplate.getForObject("http://localhost:" + port + "/people/" + bruceId, String.class);

        assertTrue(response.contains("Bruce"));

    }
}