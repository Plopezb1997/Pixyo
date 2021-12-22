package com.app.pixett.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.app.pixett.entities.Assistant;
import com.app.pixett.entities.AssistantsID;

@org.springframework.stereotype.Repository
public interface AssistantRepository extends JpaRepository<Assistant, AssistantsID>, JpaSpecificationExecutor<Assistant>{

}
