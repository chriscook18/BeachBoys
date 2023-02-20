package uk.me.christophercook.beachboys.bbm.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import uk.me.christophercook.beachboys.bbm.entites.Song;
import uk.me.christophercook.beachboys.bbm.entites.SongCredit;
import uk.me.christophercook.beachboys.bbm.repositories.RecordingRepository;
import org.springframework.web.bind.annotation.RequestMapping;


import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uk.me.christophercook.beachboys.bbm.repositories.SongCreditRepository;
import uk.me.christophercook.beachboys.bbm.repositories.SongRepository;


//TODO needed?

@RestController
@RequestMapping("/songcredits")
public class SongCreditController {

    @Autowired
    private SongCreditRepository songCreditRepository;

    Logger logger = LoggerFactory.getLogger(RecordingController.class);

    @GetMapping("/")
    public List<SongCredit> index(){

        return songCreditRepository.findAll();
    }

    @GetMapping("/{id}")
    public SongCredit show(@PathVariable String id){
        Optional<SongCredit> wrapper = songCreditRepository.findById(Long.valueOf(Integer.parseInt(id)));

        if (wrapper.isPresent()) {
            return wrapper.get();
        } else {
            throw new ResourceNotFoundException("Song credit id=" + id + " not found");
        }
    }

    @GetMapping("/writers/{song}")
    public List<SongCredit> getWriters(@PathVariable String song){

        return songCreditRepository.findWriters(Integer.parseInt(song));
    }

}