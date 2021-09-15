package com.app.pixett.controller;

import java.util.List;
import java.util.stream.Collectors;

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
import com.app.pixett.filter.UserFilter;
import com.app.pixett.service.UserService;
import com.app.pixett.specification.UserSpecification;

@RestController
@RequestMapping(value = "/user")
@CrossOrigin
public class UserController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	ModelMapper modelMapper;
	
	@PostMapping("/find")
	public ResponseEntity<List<UserDto>> findUser(@RequestBody UserFilter filter){
		List<User> users = userService.findUsers(new UserSpecification(filter));
		if(users!=null && !users.isEmpty() ) {
			return new ResponseEntity<>(users.stream().map(event->modelMapper.map(event, UserDto.class)).collect(Collectors.toList()), HttpStatus.OK);
		}else{
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
	}
	
	@PostMapping("/update")
	public ResponseEntity<UserDto> update(@RequestBody UserDto user){
		User userFound = userService.update(modelMapper.map(user, User.class));
		if(userFound!=null) {
			return new ResponseEntity<>(modelMapper.map(userFound, UserDto.class), HttpStatus.OK);
		}
		return new ResponseEntity<>(
				HttpStatus.NOT_FOUND);
	}
	

}
