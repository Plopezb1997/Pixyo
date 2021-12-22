package com.app.pixett.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.pixett.entities.Assistant;

@Service
@Transactional
public interface AssistantService {
	public Assistant saveAssistant(Assistant assistant);
	
	
}
