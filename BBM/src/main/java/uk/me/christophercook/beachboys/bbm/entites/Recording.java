package uk.me.christophercook.beachboys.bbm.entites;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "recordings")
@Data
@NoArgsConstructor
public class Recording {

    public Recording(Song song, String title) {
        this.song = song;
        this.title = title;
    }

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch=FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name="song")
    private Song song;

    private String title;

    private Long session;

    private String notes;

    @ManyToOne(fetch=FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name="artist")
    private People artist;

    private Long image;

    //TODO?

}
