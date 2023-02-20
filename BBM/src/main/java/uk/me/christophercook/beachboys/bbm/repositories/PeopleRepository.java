package uk.me.christophercook.beachboys.bbm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import uk.me.christophercook.beachboys.bbm.entites.People;

public interface PeopleRepository extends JpaRepository<People, Long> {

}
