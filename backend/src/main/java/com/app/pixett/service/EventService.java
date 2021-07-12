package com.app.pixett.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.pixett.entities.Event;
import com.app.pixett.specification.EventSpecification;

@Service("eventService")
@Transactional
public interface EventService {
	
	public List<Event> listEvents();
	
	public List<Event> findEvents(EventSpecification spec);
	
	public boolean saveEvent(Event event);
}
