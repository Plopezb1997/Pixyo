package com.app.pixett.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.pixett.entities.Event;
import com.app.pixett.entities.Pic;
import com.app.pixett.repository.PicRepository;
import com.app.pixett.service.PicService;


@Service
public class PicServiceImpl implements PicService{

	@Autowired
	PicRepository picRepository;
	
	@Override
	public List<Pic> findPicsByEventId(String eventId) {
		Event event = new Event();
		event.setEventId(eventId);
		return picRepository.findByEventid(event);
	}

	@Override
	public Pic savePic(Pic pic) {
		return picRepository.save(pic);
	}

	
}
