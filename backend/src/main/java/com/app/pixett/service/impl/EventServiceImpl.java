package com.app.pixett.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.app.pixett.entities.Event;
import com.app.pixett.repository.EventRepository;
import com.app.pixett.service.EventService;

public class EventServiceImpl implements EventService{
	@Autowired
	EventRepository eventRepository;
	
	public List<Event> listEvents(){
		return this.eventRepository.findAll();
	}
	
	public boolean saveEvent(Event event) {
		if(this.eventRepository.save(event)!=null){
			return true;
		}
		return false;
		
	}
}
