package com.app.pixett.entities;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name ="pic_management")
public class PicManagement {
	
	@EmbeddedId
	private PicManagementID id;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @MapsId("picid")
    private Pic pic;

	@ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userid")
    private User userPicMgmt;
	
	@Column
	private boolean appears;
	
	@Column
	private boolean downloaded;

	public PicManagementID getId() {
		return id;
	}

	public void setId(PicManagementID id) {
		this.id = id;
	}

	public Pic getPicid() {
		return pic;
	}

	public void setPicid(Pic picid) {
		this.pic = picid;
	}

	public User getUserid() {
		return userPicMgmt;
	}

	public void setUserid(User userid) {
		this.userPicMgmt = userid;
	}

	public boolean isAppears() {
		return appears;
	}

	public void setAppears(boolean appears) {
		this.appears = appears;
	}

	public boolean isDownloaded() {
		return downloaded;
	}

	public void setDownloaded(boolean downloaded) {
		this.downloaded = downloaded;
	}
	
}
