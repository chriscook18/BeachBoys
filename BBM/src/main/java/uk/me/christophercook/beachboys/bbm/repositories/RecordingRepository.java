package uk.me.christophercook.beachboys.bbm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uk.me.christophercook.beachboys.bbm.entites.Recording;

@Repository
public interface RecordingRepository extends JpaRepository<Recording, Long> {

}
