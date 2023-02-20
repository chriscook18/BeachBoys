package uk.me.christophercook.beachboys.bbm.repositories;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import uk.me.christophercook.beachboys.bbm.entites.Song;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class SongRepositoryTest {

    @Autowired
    private SongRepository songRepository;

    @Test
    void should_return_songs(){

        songRepository.save(new Song("Good Vibrations"));
        songRepository.save(new Song("Don't Run Away"));

        List<Song> results = new ArrayList<Song>();
        results.addAll(songRepository.findAll());

        assertEquals(2,results.size());
    }

}