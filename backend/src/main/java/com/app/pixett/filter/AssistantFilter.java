package com.app.pixett.filter;

import java.io.Serializable;
import java.util.Date;

public class AssistantFilter implements Serializable{
	private String eventId;
	private String userId;
	private Date lastScan;
	public String getEventId() {
		return eventId;
	}
	public void setEventId(String eventId) {
		this.eventId = eventId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public Date getLastScan() {
		return lastScan;
	}
	public void setLastScan(Date lastScan) {
		this.lastScan = lastScan;
	}
	
}
