package com.app.pixett.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.app.pixett.entities.Event;
import com.app.pixett.repository.EventRepository;
import com.app.pixett.service.EventService;
import com.app.pixett.specification.EventSpecification;

public class EventServiceImpl implements EventService{
	@Autowired
	EventRepository eventRepository;
	
	public List<Event> listEvents(){
		return this.eventRepository.findAll();
	}
	
	public List<Event> findEvents(EventSpecification spec){
		return this.eventRepository.findAll(spec);
	}
	
	public boolean saveEvent(Event event) {
		if(this.eventRepository.save(event)!=null){
			return true;
		}
		return false;
		
	}
}
