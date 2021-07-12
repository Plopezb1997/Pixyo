package com.app.pixett.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pixett.Dto.EventDto;
import com.app.pixett.entities.Event;
import com.app.pixett.service.EventService;
import com.app.pixett.specification.EventSpecification;



@RestController
@CrossOrigin
@RequestMapping(value = "/event")
public class EventController {
	
	@Autowired
	EventService eventService;
	
	@Autowired
    ModelMapper modelMapper;
	
	@PostMapping("/find")
	public ResponseEntity<List<EventDto>> findEvent(@RequestBody EventSpecification spec){
		List<Event> events = eventService.findEvents(spec);
		if(events!=null && !events.isEmpty() ) {
			return new ResponseEntity<>(events.stream().map(event->modelMapper.map(event, EventDto.class)).collect(Collectors.toList()), HttpStatus.OK);
		}else{
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
	}
	
	@GetMapping("/list")
	public ResponseEntity<List<EventDto>> listEvents(@PathVariable String userId){
		List<Event> events = eventService.listEvents();
		if(events!=null && !events.isEmpty() ) {
			return new ResponseEntity<>(events.stream().map(event->modelMapper.map(event, EventDto.class)).collect(Collectors.toList()), HttpStatus.OK);
		}else{
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
	}
	
	

}
