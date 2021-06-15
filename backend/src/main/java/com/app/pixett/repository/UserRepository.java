package com.app.pixett.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.app.pixett.entities.User;

@Repository
public interface UserRepository extends MongoRepository<User, String>{
	
	public User findByPhoneNumberAndPassword(String phoneNumber, String password);

}
