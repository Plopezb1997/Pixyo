package com.app.pixett.service;

import org.springframework.data.repository.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.pixett.entities.User;

@Service
@Transactional
public interface UserService extends Repository<User, String>{
	
	public User findUser(User user);

}
