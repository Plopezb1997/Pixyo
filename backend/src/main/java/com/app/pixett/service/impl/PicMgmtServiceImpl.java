package com.app.pixett.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.pixett.entities.PicManagement;
import com.app.pixett.repository.PicManagementRepository;

@Service
@Transactional
public class PicMgmtServiceImpl {

	public PicManagementRepository picMgmtRepository;
	
	public PicManagement savePic(PicManagement pic) {
		return picMgmtRepository.save(pic);
	}
}
