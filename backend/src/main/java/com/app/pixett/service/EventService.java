package com.app.pixett.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.pixett.entities.Assistant;
import com.app.pixett.entities.Event;
import com.app.pixett.specification.EventSpecification;

@Service
@Transactional
public interface EventService {
	
	public List<Event> listEvents();
	
	public List<Event> findEvents(EventSpecification spec);
	
	public Event saveEvent(Event event);

	public List<Event> findJoinedEvents(EventSpecification eventSpecification);
	
	public List<Assistant> findAssistantsByEventId(String eventId);

	public Assistant saveAssistants(Assistant assistant);
}
