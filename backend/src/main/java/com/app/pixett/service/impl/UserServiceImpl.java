package com.app.pixett.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.app.pixett.entities.User;
import com.app.pixett.repository.UserRepository;
import com.app.pixett.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	public User findUser(User user){
		User userFound = userRepository.findByPhoneNumberAndPassword(user.getPhoneNumber(), user.getPassword());
		return userFound;
	}
	
	public User findPhone(String phone) {
		User userFound = userRepository.findByPhoneNumber(phone);
		return userFound;
	}
	
	public User register(User user){
		return this.userRepository.save(user);
	}

//	@Override
	public <S extends User> List<S> saveAll(Iterable<S> entities) {
		// TODO Auto-generated method stub
		return null;
	}

//	@Override
	public List<User> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

//	@Override
	public List<User> findAll(Sort sort) {
		// TODO Auto-generated method stub
		return null;
	}

//	@Override
	public <S extends User> S insert(S entity) {
		// TODO Auto-generated method stub
		return null;
	}

//	@Override
	public <S extends User> List<S> insert(Iterable<S> entities) {
		// TODO Auto-generated method stub
		return null;
	}

//	@Override
	public <S extends User> List<S> findAll(Example<S> example) {
		// TODO Auto-generated method stub
		return null;
	}

//	@Override
	public <S extends User> List<S> findAll(Example<S> example, Sort sort) {
		// TODO Auto-generated method stub
		return null;
	}

//	@Override
	public Page<User> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

//	@Override
	public <S extends User> S save(S entity) {
		return null;
	}

//	@Override
	public Optional<User> findById(String id) {
		// TODO Auto-generated method stub
		return null;
	}

//	@Override
	public boolean existsById(String id) {
		// TODO Auto-generated method stub
		return false;
	}

//	@Override
	public Iterable<User> findAllById(Iterable<String> ids) {
		// TODO Auto-generated method stub
		return null;
	}

//	@Override
	public long count() {
		// TODO Auto-generated method stub
		return 0;
	}

//	@Override
	public void deleteById(String id) {
		// TODO Auto-generated method stub
		
	}

//	@Override
	public void delete(User entity) {
		// TODO Auto-generated method stub
		
	}

//	@Override
	public void deleteAll(Iterable<? extends User> entities) {
		// TODO Auto-generated method stub
		
	}

//	@Override
	public void deleteAll() {
		// TODO Auto-generated method stub
		
	}

//	@Override
	public <S extends User> Optional<S> findOne(Example<S> example) {
		// TODO Auto-generated method stub
		return null;
	}

//	@Override
	public <S extends User> Page<S> findAll(Example<S> example, Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

//	@Override
	public <S extends User> long count(Example<S> example) {
		// TODO Auto-generated method stub
		return 0;
	}

//	@Override
	public <S extends User> boolean exists(Example<S> example) {
		// TODO Auto-generated method stub
		return false;
	}

}
