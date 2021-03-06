package com.app.pixett.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.pixett.entities.Assistant;
import com.app.pixett.entities.Assistant_;
import com.app.pixett.entities.AssistantsID;
import com.app.pixett.entities.Event;
import com.app.pixett.entities.User;
import com.app.pixett.entities.User_;
import com.app.pixett.filter.EventFilter;
import com.app.pixett.repository.AssistantRepository;
import com.app.pixett.repository.EventRepository;
import com.app.pixett.service.EventService;
import com.app.pixett.specification.EventSpecification;

@Service
public class EventServiceImpl implements EventService {
	@Autowired
	EventRepository eventRepository;
	
	@Autowired
	AssistantRepository assistantRepository;

	@PersistenceContext
	EntityManager entityManager;

	public List<Event> listEvents() {
		return this.eventRepository.findAll();
	}

	public List<Event> findEvents(EventSpecification spec) {
		return this.eventRepository.findAll(spec);
	}

	public Event saveEvent(Event event) {
		if (event.getEventCode() == null) {
			newEvent(event);
		}
		
		if (this.eventRepository.save(event) != null) {
			/*if(event.getAssistants()!=null) {
				for (Assistant assistant : event.getAssistants()) {
					assistant.setId(new AssistantsID(event.getEventId(), assistant.getId().getUserid()));
				}
				assistantRepository.saveAll(event.getAssistants());
			}*/
			return event;
		}
		
		return null;

	}

	private Event newEvent(Event event) {
		String generatedString;
		EventSpecification spec;
		do {
			generatedString = generateEventCode();
			spec = new EventSpecification(new EventFilter());
			spec.getFilter().setEventCode(generatedString);
		} while (findEvents(spec).size() > 0);
		event.setEventCode(generatedString);
		return event;
	}

	private String generateEventCode() {
		int leftLimit = 48; // numeral '0'
		int rightLimit = 122; // letter 'z'
		int targetStringLength = 10;
		Random random = new Random();

		String generatedString = random.ints(leftLimit, rightLimit + 1)
				.filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97)).limit(targetStringLength)
				.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append).toString();
		return generatedString.toUpperCase();
	}

	@Override
	public List<Event> findJoinedEvents(EventSpecification eventSpecification) {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Event> criteriaQuery = criteriaBuilder.createQuery(Event.class);
		Root<Event> rootEvent = criteriaQuery.from(Event.class);
		Root<Assistant> rootUser = criteriaQuery.from(Assistant.class);
		Expression<Collection<Event>> userEvents = rootUser.get(Assistant_.EVENT_ASSISTANT_REF);
		List<String> userIds = new ArrayList<>();
		for (User user : eventSpecification.getFilter().getAssistantsInEvents()) {
			userIds.add(user.getUserId());
		}
		// criteriaBuilder.and(rootUser.get(User_.userid).in( userIds),
		// criteriaBuilder.isMember(rootEvent, userEvents));
		criteriaQuery.distinct(true);
		criteriaQuery.where(criteriaBuilder.or(rootUser.get(Assistant_.USER_REF).in(eventSpecification.getFilter().getAssistantsInEvents())));
		eventSpecification.toPredicate(rootEvent, criteriaQuery, criteriaBuilder);
		List<Event> events = this.eventRepository.findAll(eventSpecification);
		/*
		 * if(events!=null) {
		 * events.addAll(this.eventRepository.findAll(eventSpecification)); }else {
		 * events = this.eventRepository.findAll(eventSpecification); }
		 */

		return events;
	}

	@Override
	public List<Assistant> findAssistantsByEventId(String eventId) {
		Optional<Event> result = eventRepository.findById(eventId);
		if(result.isPresent()) {
			return result.get().getAssistants();
		}
		return null;
	}

	@Override
	public Assistant saveAssistants(Assistant assistant) {
		return this.assistantRepository.save(assistant);
	}
}
