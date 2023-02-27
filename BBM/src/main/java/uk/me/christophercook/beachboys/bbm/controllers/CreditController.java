package uk.me.christophercook.beachboys.bbm.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import uk.me.christophercook.beachboys.bbm.entites.Credit;
import uk.me.christophercook.beachboys.bbm.entites.Song;
import uk.me.christophercook.beachboys.bbm.entites.SongCredit;
import uk.me.christophercook.beachboys.bbm.repositories.CreditRepository;
import uk.me.christophercook.beachboys.bbm.repositories.RecordingRepository;
import org.springframework.web.bind.annotation.RequestMapping;


import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uk.me.christophercook.beachboys.bbm.repositories.SongCreditRepository;
import uk.me.christophercook.beachboys.bbm.repositories.SongRepository;

//TODO used??
@RestController
@RequestMapping("/credits")
public class CreditController {

    @Autowired
    private CreditRepository creditRepository;

    Logger logger = LoggerFactory.getLogger(RecordingController.class);

    @GetMapping("/")
    public List<Credit> index(){

        return creditRepository.findAll();
    }

    @GetMapping("/{id}")
    public Credit show(@PathVariable String id){
        Optional<Credit> wrapper = creditRepository.findById(Long.valueOf(Integer.parseInt(id)));

        if (wrapper.isPresent()) {
            return wrapper.get();
        } else {
            throw new ResourceNotFoundException("Credit id=" + id + " not found");
        }
    }

}