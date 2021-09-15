package com.app.pixett.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.pixett.entities.User;
import com.app.pixett.specification.UserSpecification;

@Service
@Transactional
public interface UserService extends UserDetailsService{
	
	public User findUser(User user);

	public User findPhone(String phone);

	public User register(User user);
	
	public List<User> findUsers(UserSpecification spec);

	public User update(User map);
}
