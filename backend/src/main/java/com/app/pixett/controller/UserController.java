package com.app.pixett.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pixett.Dto.UserDto;
import com.app.pixett.core.JwtResponse;
import com.app.pixett.core.JwtUtils;
import com.app.pixett.core.UserDetailsImpl;
import com.app.pixett.entities.User;
import com.app.pixett.service.UserService;

@RestController
@RequestMapping(value = "")
public class UserController {
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UserService userService;
	
	@Autowired
	ModelMapper modelMapper;
	
	@Autowired
	JwtUtils jwtUtils;
	
	@Autowired
	PasswordEncoder encoder;
	
	@CrossOrigin
	@PostMapping("/auth/user/login")
	public ResponseEntity<JwtResponse> findUser(@RequestBody UserDto user){
		Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getPhoneNumber(), user.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(auth);
		//String jwt = 
		String jwt = jwtUtils.generateJwtToken(auth);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(), 
												 roles));
		/*User userFound = userService.findUser(modelMapper.map(user, User.class));
		if(userFound!=null) {
			return new ResponseEntity<>(modelMapper.map(userFound, UserDto.class), HttpStatus.OK);
		}
		return new ResponseEntity<>(
				HttpStatus.NOT_FOUND);*/
	}
	
	@CrossOrigin
	@PostMapping("/auth/user/register")
	public ResponseEntity<UserDto> register(@RequestBody UserDto user){
		User userFound = userService.register(modelMapper.map(user, User.class));
		if(userFound!=null) {
			return new ResponseEntity<>(modelMapper.map(userFound, UserDto.class), HttpStatus.OK);
		}
		return new ResponseEntity<>(
				HttpStatus.NOT_FOUND);
	}
	
	@CrossOrigin
	@GetMapping("/auth/user/phoneNumberExists/{phone}")
	public ResponseEntity<Boolean> findPhone(@PathVariable String phone){
		User userFound = userService.findPhone(phone);
		if(userFound!=null) {
			return new ResponseEntity<>(true, HttpStatus.OK);
		}
		return new ResponseEntity<>(false, HttpStatus.OK);
	}

}
