package uk.me.christophercook.beachboys.bbm.entites;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "songcredits")
@Data
@NoArgsConstructor
public class SongCredit {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "song")
    private Song song;

    @ManyToOne( fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "performer")
    private People performer;

    @ManyToOne( fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "role")
    private Role role;

    private String notes;

    public SongCredit(Song song, People performer, Role role) {
        this.song = song;
        this.performer = performer;
        this.role = role;
    }
}
