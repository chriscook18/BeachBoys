package uk.me.christophercook.beachboys.bbm.controllers;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import uk.me.christophercook.beachboys.bbm.entites.*;
import uk.me.christophercook.beachboys.bbm.repositories.*;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment =  SpringBootTest.WebEnvironment.RANDOM_PORT)
class CreditControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private CreditRepository creditRepository;
    @Autowired
    private SongRepository songRepository;
    @Autowired
    private PeopleRepository peopleRepository;
    @Autowired
    private RoleTypeRepository roleTypeRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private RecordingRepository recordingRepository;

    @Autowired
    private CreditController creditController;

    private long id;

    @BeforeEach
    void beforeEach(){
        creditRepository.deleteAll();

        id = creditRepository.save(new Credit(new Recording(new Song("Good Vibrations"), "Good Vibes"),
                new People("Bruce", "Johnston"),
                new Role("Guitar",new RoleType("Instrument",false)))).getId();

        creditRepository.save(new Credit(new Recording(new Song("Good Vibrations"), "Good Vibes"),
                new People("Brian", "Wilson"),
                new Role("Drums", new RoleType("Instrument",false))));

    }

    @Test
    void should_find_all_when_called_from_rest() {

        //TODO why behave differently when /credits vs /credits/ ??
        String response = testRestTemplate.getForObject("http://localhost:" + port + "/credits/", String.class);

        assertTrue(response.contains("Guitar"));
        assertTrue(response.contains("Drums"));

    }

    @Test
    void should_find_all() {

        List<Credit> response = creditRepository.findAll();

    //    assertEquals(2, response.size());
       // assertEquals("Good Vibrations", response.get(0).get());
      //  assertEquals("Don't Run Away", response.get(1).getTitle());

    }
    @Test
    void show() {
     //   Song response = songController.show(String.valueOf(goodVibrationsID));

      //  assertEquals("Good Vibrations", response.getTitle());
      //  assertEquals(goodVibrationsID, response.getId());
    }

    @Test
    void show_from_rest() {
       // String response = testRestTemplate.getForObject("http://localhost:" + port + "/songs/" + goodVibrationsID, String.class);

       // assertTrue(response.contains("Good Vibrations"));

    }
}