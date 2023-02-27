package uk.me.christophercook.beachboys.bbm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uk.me.christophercook.beachboys.bbm.entites.Credit;

@Repository
public interface CreditRepository extends JpaRepository<Credit, Long> {

}
