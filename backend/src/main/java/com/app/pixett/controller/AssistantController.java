package com.app.pixett.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pixett.Dto.AssistantDto;
import com.app.pixett.entities.Assistant;
import com.app.pixett.service.AssistantService;

@RestController
@RequestMapping(value = "/assistant")
@CrossOrigin
public class AssistantController {
	
	@Autowired
	AssistantService assistantService;
	
	@Autowired
	ModelMapper modelMapper;
	
	@PostMapping("/save")
	public ResponseEntity<Assistant> saveEvent(@RequestBody AssistantDto event){
		Assistant resultEvent = assistantService.saveAssistant(modelMapper.map(event, Assistant.class));
		return new ResponseEntity<>(resultEvent, HttpStatus.OK);
	}
}
