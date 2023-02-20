package uk.me.christophercook.beachboys.bbm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import uk.me.christophercook.beachboys.bbm.entites.Role;
import uk.me.christophercook.beachboys.bbm.entites.RoleType;
import uk.me.christophercook.beachboys.bbm.entites.Song;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
