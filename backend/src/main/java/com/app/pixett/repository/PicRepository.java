package com.app.pixett.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.app.pixett.entities.Event;
import com.app.pixett.entities.Pic;

@org.springframework.stereotype.Repository
public interface PicRepository extends JpaRepository<Pic, String>, JpaSpecificationExecutor<Pic>{

	List<Pic> findByEventid(Event eventId);
}
