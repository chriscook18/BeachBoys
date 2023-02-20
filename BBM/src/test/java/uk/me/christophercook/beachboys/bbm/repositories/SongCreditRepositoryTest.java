package uk.me.christophercook.beachboys.bbm.repositories;

        import org.junit.jupiter.api.BeforeEach;
        import org.junit.jupiter.api.Test;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
        import uk.me.christophercook.beachboys.bbm.entites.*;

        import java.util.ArrayList;
        import java.util.List;

        import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class SongCreditRepositoryTest {

    @Autowired
    private SongCreditRepository songCreditRepository;

    @Autowired
    private RoleTypeRepository roleTypeRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private PeopleRepository peopleRepository;

    @BeforeEach
    void beforeEach(){
        songRepository.deleteAll();
        roleTypeRepository.deleteAll();
        roleRepository.deleteAll();
        peopleRepository.deleteAll();
        songCreditRepository.deleteAll();

        Song song = songRepository.save(new Song("Good Vibrations"));
        RoleType roleTypeWriter = roleTypeRepository.save(new RoleType("Writer", true));
        RoleType roleTypeGuitar = roleTypeRepository.save(new RoleType("Instrument", false));
        Role roleMusicBy = roleRepository.save(new Role("Music by",roleTypeWriter));
        Role roleElectricGuitar =roleRepository.save(new Role("Electric guitar", roleTypeGuitar));
        People personGlen = peopleRepository.save(new People("Glen", "Campbell"));
        People personBrian = peopleRepository.save(new People("Brian", "Wilson"));

        //Technically bad test data as this is a recording-level credit not song-level credit
        songCreditRepository.save(new SongCredit(song,personGlen,roleElectricGuitar));
        songCreditRepository.save(new SongCredit(song,personBrian,roleMusicBy));

    }

    @Test
    void should_return_songs(){

        List<SongCredit> results = new ArrayList<>();
        results.addAll(songCreditRepository.findAll());

        assertEquals(2,results.size());
    }

    @Test
    void should_return_writer_credits_only(){

        List<SongCredit> results = new ArrayList<>();
        results.addAll(songCreditRepository.findWriters(1));

        assertEquals(1,results.size());
        assertEquals("Music by", results.get(0).getRole().getDescription());
    }

}