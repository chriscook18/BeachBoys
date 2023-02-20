package uk.me.christophercook.beachboys.bbm.entites;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "people")
@Data
@NoArgsConstructor
public class People {

    @Id
    @GeneratedValue
    private Long id;

    @Transient
    private String Name;

    @Column(name="FIRSTNAME")
    private String firstName;

    @Column(name="SURNAME")
    private String surname;

    @Column(name="GROUPNAME")
    private String groupName;

    public People(String groupName, boolean isGroup) {
        this.groupName = groupName;
        this.isGroup = isGroup;
    }

    public People(String firstName, String surname) {
        this.firstName = firstName;
        this.surname = surname;
    }

    @Column(name="ISGROUP")
    private boolean isGroup;

    @JsonIgnore
    @OneToMany(mappedBy = "artist", cascade = CascadeType.ALL)
    private List<Recording> recordings;


}
