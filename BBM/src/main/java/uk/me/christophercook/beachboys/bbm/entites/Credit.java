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

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "recording", nullable = false)
    private Recording recording;

    @ManyToOne( fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "performer", nullable = false)
    private People performer;

    @ManyToOne( fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "role", nullable = false)
    private Role role;

    private String notes;

    public Credit(Recording recording, People performer, Role role) {
        this.recording = recording;
        this.performer = performer;
        this.role = role;
    }
}
