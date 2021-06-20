package com.app.pixett.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.pixett.entities.User;

@Service
@Transactional
public interface UserService{
	
	public User findUser(User user);

	public User findPhone(String phone);

	public User register(User user);

}
