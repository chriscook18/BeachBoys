package uk.me.christophercook.beachboys.bbm.entites;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "credits")
@Data
@NoArgsConstructor
public class Credit {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "song", nullable = false)
    private Song song;

    @ManyToOne( fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "performer", nullable = false)
    private People performer;

    @ManyToOne( fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "role", nullable = false)
    private Role role;

    private String notes;


}
