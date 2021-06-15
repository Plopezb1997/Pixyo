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

import com.app.pixett.Dto.UserDto;
import com.app.pixett.entities.User;
import com.app.pixett.service.UserService;

@RestController
@CrossOrigin
@RequestMapping(value = "/user")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	ModelMapper modelMapper;
	
	@PostMapping("/findUser")
	public ResponseEntity<UserDto> findUser(@RequestBody UserDto user){
		User userFound = userService.findUser(modelMapper.map(user, User.class));
		if(userFound!=null) {
			return new ResponseEntity<>(modelMapper.map(userFound, UserDto.class), HttpStatus.OK);
		}
		return new ResponseEntity<>(
				HttpStatus.NOT_FOUND);
	}

}
