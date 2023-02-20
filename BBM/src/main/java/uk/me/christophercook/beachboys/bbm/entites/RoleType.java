package uk.me.christophercook.beachboys.bbm.entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "roletypes")
@Data
@NoArgsConstructor
public class RoleType {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String description;

    private boolean writer = false;

    private boolean producer = false;

    @Column(name="SORTPRIORITY")
    private int sortPriority = 0;

    @OneToMany(mappedBy = "roletype", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Role> roleList = new ArrayList<>();

    public RoleType(String description, boolean writer) {
        this.description = description;
        this.writer = writer;
        this.producer = false;
    }
}
