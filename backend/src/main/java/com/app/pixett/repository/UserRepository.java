package com.app.pixett.repository;





import org.springframework.data.repository.Repository;

import com.app.pixett.entities.User;

@org.springframework.stereotype.Repository
public interface UserRepository extends Repository<User, String>{
	
	public User findByPhoneNumberAndPassword(String phoneNumber, String password);

}
