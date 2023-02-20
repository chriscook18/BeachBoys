package uk.me.christophercook.beachboys.bbm.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import uk.me.christophercook.beachboys.bbm.entites.People;
import uk.me.christophercook.beachboys.bbm.entites.Recording;
import uk.me.christophercook.beachboys.bbm.entites.Song;
import uk.me.christophercook.beachboys.bbm.repositories.PeopleRepository;
import uk.me.christophercook.beachboys.bbm.repositories.RecordingRepository;
import org.springframework.web.bind.annotation.RequestMapping;


import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@RequestMapping("/people")
public class PeopleController {

    @Autowired
    private PeopleRepository peopleRepository;

    Logger logger = LoggerFactory.getLogger(PeopleRepository.class);

    @GetMapping("/")
    public List<People> index(){

        return peopleRepository.findAll();
    }

    @GetMapping("/{id}")
    public People show(@PathVariable String id){
        Optional<People> wrapper = peopleRepository.findById(Long.valueOf(Integer.parseInt(id)));

        if (wrapper.isPresent()) {
            return wrapper.get();
        } else {
            throw new ResourceNotFoundException("People id=" + id + " not found");
        }
    }

}