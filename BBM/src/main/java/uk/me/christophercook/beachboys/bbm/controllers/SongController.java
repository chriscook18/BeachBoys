package uk.me.christophercook.beachboys.bbm.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import uk.me.christophercook.beachboys.bbm.entites.Song;
import uk.me.christophercook.beachboys.bbm.repositories.RecordingRepository;
import org.springframework.web.bind.annotation.RequestMapping;


import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uk.me.christophercook.beachboys.bbm.repositories.SongRepository;


@RestController
@RequestMapping("/songs")
public class SongController {

    @Autowired
    private SongRepository songRepository;

    Logger logger = LoggerFactory.getLogger(RecordingController.class);

    @GetMapping("/")
    public List<Song> index(){

        return songRepository.findAll();
    }

    @GetMapping("/{id}")
    public Song show(@PathVariable String id){
        Optional<Song> wrapper = songRepository.findById(Long.valueOf(Integer.parseInt(id)));

        if (wrapper.isPresent()) {
            return wrapper.get();
        } else {
            throw new ResourceNotFoundException("Song id=" + id + " not found");
        }
    }

}