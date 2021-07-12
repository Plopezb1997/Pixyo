package com.app.pixett.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.app.pixett.entities.Event;

@org.springframework.stereotype.Repository
public interface EventRepository extends JpaRepository<Event, String>, JpaSpecificationExecutor<Event>{

}
