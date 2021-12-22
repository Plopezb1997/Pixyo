package com.app.pixett.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.app.pixett.entities.PicManagement;

@org.springframework.stereotype.Repository
public interface PicManagementRepository extends JpaRepository<PicManagement, String>, JpaSpecificationExecutor<PicManagement>{

}
