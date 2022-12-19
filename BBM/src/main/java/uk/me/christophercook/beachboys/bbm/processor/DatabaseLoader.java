package uk.me.christophercook.beachboys.bbm.processor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import uk.me.christophercook.beachboys.bbm.entities.Song;
import uk.me.christophercook.beachboys.bbm.repository.SongRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final SongRepository repository;

    @Autowired
    public DatabaseLoader(SongRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new Song("Good Vibrations"));
    }
}
