package com.app.pixett.repository;

import org.springframework.data.repository.Repository;

import com.app.pixett.entities.Event;

@org.springframework.stereotype.Repository
public interface EventRepository extends Repository<Event, String>{

}
