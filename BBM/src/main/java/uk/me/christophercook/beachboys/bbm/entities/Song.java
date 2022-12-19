package uk.me.christophercook.beachboys.bbm.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Song {

    public Song(String title) {
        this.title = title;
    }

    @Id
    @GeneratedValue
    private Long id;

    private String title;

}
