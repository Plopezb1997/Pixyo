package com.app.pixett.repository;





import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.app.pixett.entities.User;

@org.springframework.stereotype.Repository
public interface UserRepository extends JpaRepository<User, String>, JpaSpecificationExecutor<User>{
	
	public User findByPhoneNumberAndPassword(String phoneNumber, String password);

	public User findByPhoneNumber(String phone);

}
