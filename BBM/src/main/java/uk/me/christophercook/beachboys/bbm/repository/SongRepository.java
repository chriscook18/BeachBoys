package uk.me.christophercook.beachboys.bbm.repository;

import org.springframework.data.repository.CrudRepository;
import uk.me.christophercook.beachboys.bbm.entities.Song;

public interface SongRepository extends CrudRepository<Song, Long> {

}
