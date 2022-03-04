package com.app.pixett.Dto;

import java.io.Serializable;
import java.util.Date;

public class PicDto implements Serializable{
	private String picid;
	private EventDto eventid;
	private String pic;
	private boolean scanned;
	private Date creationDate;
	private String userid;
	public Date getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}
	
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getPicid() {
		return picid;
	}
	public void setPicid(String picid) {
		this.picid = picid;
	}
	public EventDto getEventid() {
		return eventid;
	}
	public void setEventid(EventDto eventid) {
		this.eventid = eventid;
	}
	public String getPic() {
		return pic;
	}
	public void setPic(String pic) {
		this.pic = pic;
	}
	public boolean isScanned() {
		return scanned;
	}
	public void setScanned(boolean scanned) {
		this.scanned = scanned;
	}

}
