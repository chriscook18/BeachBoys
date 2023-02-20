package uk.me.christophercook.beachboys.bbm.repositories;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import uk.me.christophercook.beachboys.bbm.entites.People;
import uk.me.christophercook.beachboys.bbm.entites.Song;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class PeopleRepositoryTest {

    @Autowired
    private PeopleRepository peopleRepository;

    @Test
    void should_return_people(){

        peopleRepository.save(new People("Bruce", "Johnston"));
        peopleRepository.save(new People("The Beach Boys", true));

        List<People> results = new ArrayList<>();
        results.addAll(peopleRepository.findAll());

        assertEquals(2,results.size());
    }

}