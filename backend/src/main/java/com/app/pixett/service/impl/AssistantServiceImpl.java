package com.app.pixett.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.pixett.entities.Assistant;
import com.app.pixett.repository.AssistantRepository;
import com.app.pixett.service.AssistantService;

@Service
public class AssistantServiceImpl implements AssistantService{

	@Autowired
	AssistantRepository assistantRepository;
	
	@Override
	public Assistant saveAssistant(Assistant assistant) {
		return assistantRepository.save(assistant);
	}

}
