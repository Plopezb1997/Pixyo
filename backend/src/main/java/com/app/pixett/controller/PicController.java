package com.app.pixett.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pixett.entities.Pic;
import com.app.pixett.service.PicService;

@RestController
@CrossOrigin
@RequestMapping(value = "/pic")
public class PicController {
	
	@Autowired
	PicService picService;
	
	@GetMapping("/findPicsByEventId/{eventid}")
	public ResponseEntity<List<Pic>> findPicsByEventId(@PathVariable String eventid){
		return new ResponseEntity<List<Pic>>(picService.findPicsByEventId(eventid), HttpStatus.OK);
	}

}
