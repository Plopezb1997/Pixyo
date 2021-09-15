package com.app.pixett.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.pixett.core.UserDetailsImpl;
import com.app.pixett.entities.User;
import com.app.pixett.repository.UserRepository;
import com.app.pixett.service.UserService;
import com.app.pixett.specification.UserSpecification;

@Service
public class UserServiceImpl implements UserService{
	/*@Autowired
	PasswordEncoder passwordEncoder;*/
	
	@Autowired
	private UserRepository userRepository;
	
	public User findUser(User user){
		//User userFound = userRepository.findByPhoneNumberAndPassword(user.getPhoneNumber(), passwordEncoder.encode(user.getPassword()));
		Optional<User> userFound = userRepository.findById(user.getUserId());
		return userFound.isPresent()?userFound.get():null;
	}
	
	public User findPhone(String phone) {
		User userFound = userRepository.findByPhoneNumber(phone);
		return userFound;
	}
	
	public User register(User user){
		//user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setPassword("");
		return this.userRepository.save(user);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByPhoneNumber(username);

		return build(user);
	}
	
	public static UserDetailsImpl build(User user) {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority("USER"));
		return new UserDetailsImpl(
				user.getUserId(), 
				user.getPhoneNumber(), 
				user.getEmail(),
				user.getPassword(), 
				authorities);
	}
	
	public List<User> findUsers(UserSpecification spec){
		return this.userRepository.findAll(spec);
	}

}
