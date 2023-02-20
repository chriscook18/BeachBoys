package uk.me.christophercook.beachboys.bbm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import uk.me.christophercook.beachboys.bbm.entites.Song;
import uk.me.christophercook.beachboys.bbm.entites.SongCredit;

import java.util.List;

public interface SongCreditRepository extends JpaRepository<SongCredit, Long> {

    //TODO tests
    @Query("select c from SongCredit c where c.song.id = ?1 and c.role.roletype.writer = true")
    List<SongCredit> findWriters(int song);
}
