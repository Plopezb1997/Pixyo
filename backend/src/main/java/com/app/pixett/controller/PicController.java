package com.app.pixett.controller;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import org.apache.tomcat.util.codec.binary.Base64;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pixett.Dto.EventDto;
import com.app.pixett.Dto.PicDto;
import com.app.pixett.entities.Event;
import com.app.pixett.entities.Pic;
import com.app.pixett.entities.PicManagement;
import com.app.pixett.entities.PicManagementID;
import com.app.pixett.service.PicMgmtService;
import com.app.pixett.service.PicService;

@RestController
@CrossOrigin
@RequestMapping(value = "/pic")
public class PicController {
	
	@Autowired
	PicService picService;
	
	@Autowired
	PicMgmtService picMgmtService;
	
	@Autowired
    ModelMapper modelMapper;
	
	@GetMapping("/findPicsByEventId/{eventid}")
	public ResponseEntity<List<PicDto>> findPicsByEventId(@PathVariable String eventid){
		List<Pic> picsDb = picService.findPicsByEventId(eventid);
		List<PicDto> picsParsed = new ArrayList<PicDto>();
		for (Pic pic : picsDb) {
			PicDto picdto = new PicDto();
			picdto.setEventid(modelMapper.map(pic, EventDto.class));
			picdto.setPic(new String(Base64.encodeBase64(pic.getPic())));
			picdto.setPicid(pic.getPicid());
			picdto.setScanned(pic.isScanned());
			picsParsed.add(picdto);
		}
		return new ResponseEntity<List<PicDto>>(picsParsed, HttpStatus.OK);
	}
	
	@PostMapping("/save")
	public ResponseEntity<Pic> savePic(@RequestBody PicDto pic){
		Pic resultPic  = new Pic();
		resultPic.setEventid(modelMapper.map(pic.getEventid(), Event.class));
		try {
			resultPic.setPic(Base64.decodeBase64(pic.getPic().getBytes("UTF-8")));
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		resultPic.setScanned(pic.isScanned());
		resultPic.setCreationDate(pic.getCreationDate());
		resultPic = picService.savePic(modelMapper.map(resultPic, Pic.class));
		PicManagement manage = new PicManagement();
		manage.setId(new PicManagementID(resultPic.getPicid(), pic.getUserid()));
		manage.setAppears(false);
		manage.setDownloaded(true);
		picMgmtService.savePic(manage);
		return new ResponseEntity<>(resultPic, HttpStatus.OK);
	}

}
