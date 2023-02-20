package uk.me.christophercook.beachboys.bbm.entites;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "songs")
@Data
@NoArgsConstructor
public class Song {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    @JsonIgnore
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(mappedBy = "song", cascade = CascadeType.ALL)
    private List<Recording> recordings;

    @OneToMany(mappedBy = "song", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<SongCredit> songCreditsList = new ArrayList<>();

    public Song(String title) {
        this.title = title;
    }

}
