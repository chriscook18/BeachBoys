package uk.me.christophercook.beachboys.bbm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uk.me.christophercook.beachboys.bbm.entites.People;

@Repository
public interface PeopleRepository extends JpaRepository<People, Long> {

}
