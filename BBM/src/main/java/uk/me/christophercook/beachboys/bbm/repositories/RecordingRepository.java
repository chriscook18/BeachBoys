package uk.me.christophercook.beachboys.bbm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uk.me.christophercook.beachboys.bbm.entites.Recording;

public interface RecordingRepository extends JpaRepository<Recording, Long> {

}
