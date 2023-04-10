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
@Table(name = "versions")
@Data
@NoArgsConstructor
public class Version {

    @Id
    @GeneratedValue
    private Long id;


    @Column(name = "description")
    private String description;

    @Column(name = "length")
    private String length;

    @Column(name = "notes")
    private String notes;

    @Column(name = "appearson")
    private String appearsOn;

    @Column(name = "master")
    private Integer master;

    @Column(name = "sortpriority")
    private Integer sortpriority;

    @Column(name = "youtube")
    private String youtube;

    @ManyToOne( fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "recording", nullable = false)
    @JsonBackReference("recordingVersion")
    private Recording recording;

    //TODO: Change CascadeType?!
    //@OneToMany(mappedBy = "version", cascade = CascadeType.ALL)
    //@JsonManagedReference("publisher")
    //@JsonIgnore
    //private List<AppearsOn> appearsOnList = new ArrayList<>();

}
