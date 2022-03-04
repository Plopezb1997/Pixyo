package com.app.pixett.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.pixett.entities.Assistant;
import com.app.pixett.filter.AssistantFilter;
import com.app.pixett.repository.AssistantRepository;
import com.app.pixett.service.AssistantService;
import com.app.pixett.specification.AssistantSpecification;

@Service
public class AssistantServiceImpl implements AssistantService{

	@Autowired
	AssistantRepository assistantRepository;
	
	@Override
	public Assistant saveAssistant(Assistant assistant) {
		if(assistant.getId()!=null) {
			AssistantFilter filter = new AssistantFilter();
			filter.setEventId(assistant.getId().getEventId());
			filter.setUserId(assistant.getId().getUserid());
			List<Assistant> assistants = assistantRepository.findAll(new AssistantSpecification(filter));
			if(assistants!=null) {
				assistants.get(0).setLastScan(assistant.getLastScan());
				return assistantRepository.save(assistants.get(0));
			}
		}
		return assistantRepository.save(assistant);
	}

}
