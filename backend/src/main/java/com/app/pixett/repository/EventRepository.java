package com.app.pixett.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.app.pixett.entities.Event;

public interface EventRepository extends MongoRepository<Event, String>{

}
