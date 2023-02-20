package uk.me.christophercook.beachboys.bbm.repositories;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import uk.me.christophercook.beachboys.bbm.entites.Recording;
import uk.me.christophercook.beachboys.bbm.entites.Song;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class RecordingRepositoryTest {

    @Autowired
    private RecordingRepository recordingRepository;

    @Autowired
    private SongRepository songRepository;

    @Test
    void should_return_songs(){

        Song gv = songRepository.save(new Song("Good Vibrations"));
        Song dra = songRepository.save(new Song("Don't Run Away"));

        recordingRepository.save(new Recording(gv, "Good Vibrations"));
        recordingRepository.save(new Recording(dra, "Don't Run Away"));

        List<Recording> results = new ArrayList<>();
        results.addAll(recordingRepository.findAll());

        assertEquals(2,results.size());
    }

}