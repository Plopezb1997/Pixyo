package com.app.pixett.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.app.pixett.entities.Pic;

public interface PicRepository extends MongoRepository<Pic, String>{
}
