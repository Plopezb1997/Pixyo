package com.app.pixett.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.pixett.entities.Pic;


@Service
@Transactional
public interface PicService {
	
	public List<Pic> findPicsByEventId(String eventId);
	
	public Pic savePic(Pic pic);

}
