package com.app.pixett.Dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.app.pixett.entities.User;
import com.fasterxml.jackson.annotation.JsonFormat;

public class EventDto implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 3826810036104393277L;
	private String eventId;
	private String name;
	private String status;
	private String location;
	private String eventCode;
	private Date startDate;
	private Date endDate;
	private List<UserDto> assistants;
	private String title;
	private UserDto creator;
	public String getEventId() {
		return eventId;
	}
	public void setEventId(String eventId) {
		this.eventId = eventId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getEventCode() {
		return eventCode;
	}
	public void setEventCode(String eventCode) {
		this.eventCode = eventCode;
	}
	public Date getStartDate() {
		return startDate;
	}
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, locale = "es_ES", pattern="yyyy-MM-dd'T'HH:mm:ss.SSS", timezone="Europe/Madrid")
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, locale = "es_ES", pattern="yyyy-MM-dd'T'HH:mm:ss.SSS", timezone="Europe/Madrid")
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public List<UserDto> getAssistants() {
		return assistants;
	}
	public void setAssistants(List<UserDto> assistants) {
		this.assistants = assistants;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public UserDto getCreator() {
		return creator;
	}
	public void setCreator(UserDto creator) {
		this.creator = creator;
	}
	
	
}
