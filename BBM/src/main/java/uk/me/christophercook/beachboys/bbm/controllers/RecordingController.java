package uk.me.christophercook.beachboys.bbm.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import uk.me.christophercook.beachboys.bbm.entites.Credit;
import uk.me.christophercook.beachboys.bbm.entites.Recording;
import uk.me.christophercook.beachboys.bbm.entites.Song;
import uk.me.christophercook.beachboys.bbm.repositories.RecordingRepository;
import org.springframework.web.bind.annotation.RequestMapping;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@RequestMapping("/recordings")
public class RecordingController {

    @Autowired
    private RecordingRepository recordingRepository;

    Logger logger = LoggerFactory.getLogger(RecordingController.class);

    @GetMapping("/")
    public List<Recording> index(){

        return recordingRepository.findAll();
    }

    @GetMapping("/{id}")
    public Recording show(@PathVariable String id){
        Optional<Recording> wrapper = recordingRepository.findById(Long.valueOf(Integer.parseInt(id)));

        if (wrapper.isPresent()) {
            return wrapper.get();
        } else {
            throw new ResourceNotFoundException("Recording id=" + id + " not found");
        }
    }

    @GetMapping(value = "/{id}/credits")
    //TODO validation on path varaible?
    //TODO why are they strings not int??
    public List<Credit> getRecordingsCreditsById(@PathVariable(value = "id") String id )
    {
        Optional<Recording> recordingOptional = recordingRepository.findById(Long.valueOf(Integer.parseInt(id)));
        if (recordingOptional.isPresent()){
            return recordingOptional.get().getCreditsList();
        } else {
            return new ArrayList<>();
        }
    }

}