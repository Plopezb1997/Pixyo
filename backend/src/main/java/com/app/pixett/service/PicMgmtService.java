package com.app.pixett.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.pixett.entities.PicManagement;

@Service
@Transactional
public interface PicMgmtService {

	public PicManagement savePic(PicManagement pic);
}
