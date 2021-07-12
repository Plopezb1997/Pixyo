package com.app.pixett.filter;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.app.pixett.entities.User;
import com.fasterxml.jackson.annotation.JsonFormat;

public class EventFilter implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -4221221712267912928L;
	private String eventId;
	private String name;
	private String status;
	private String location;
	private String eventCode;
	private Date startDateeq;
	private Date startDatege;
	private Date startDatele;
	private Date endDateeq;
	private Date endDatege;
	private Date endDatele;
	private List<User> assistantsInEvents;
	private String title;
	private User CreatorId;
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
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public User getCreatorId() {
		return CreatorId;
	}
	public void setCreatorId(User creatorId) {
		CreatorId = creatorId;
	}
	public Date getStartDateeq() {
		return startDateeq;
	}
	@JsonFormat(shape = JsonFormat.Shape.STRING, locale = "es_ES", pattern="yyyy-MM-dd'T'HH:mm:ss.SSS", timezone="Europe/Madrid")
	public void setStartDateeq(Date startDateeq) {
		this.startDateeq = startDateeq;
	}
	public Date getStartDatege() {
		return startDatege;
	}
	@JsonFormat(shape = JsonFormat.Shape.STRING, locale = "es_ES", pattern="yyyy-MM-dd'T'HH:mm:ss.SSS", timezone="Europe/Madrid")
	public void setStartDatege(Date startDatege) {
		this.startDatege = startDatege;
	}
	public Date getStartDatele() {
		return startDatele;
	}
	@JsonFormat(shape = JsonFormat.Shape.STRING, locale = "es_ES", pattern="yyyy-MM-dd'T'HH:mm:ss.SSS", timezone="Europe/Madrid")
	public void setStartDatele(Date startDatele) {
		this.startDatele = startDatele;
	}
	public Date getEndDateeq() {
		return endDateeq;
	}
	@JsonFormat(shape = JsonFormat.Shape.STRING, locale = "es_ES", pattern="yyyy-MM-dd'T'HH:mm:ss.SSS", timezone="Europe/Madrid")
	public void setEndDateeq(Date endDateeq) {
		this.endDateeq = endDateeq;
	}
	public Date getEndDatege() {
		return endDatege;
	}
	@JsonFormat(shape = JsonFormat.Shape.STRING, locale = "es_ES", pattern="yyyy-MM-dd'T'HH:mm:ss.SSS", timezone="Europe/Madrid")
	public void setEndDatege(Date endDatege) {
		this.endDatege = endDatege;
	}
	public Date getEndDatele() {
		return endDatele;
	}
	@JsonFormat(shape = JsonFormat.Shape.STRING, locale = "es_ES", pattern="yyyy-MM-dd'T'HH:mm:ss.SSS", timezone="Europe/Madrid")
	public void setEndDatele(Date endDatele) {
		this.endDatele = endDatele;
	}
	public List<User> getAssistantsInEvents() {
		return assistantsInEvents;
	}
	public void setAssistantsInEvents(List<User> assistantsInEvents) {
		this.assistantsInEvents = assistantsInEvents;
	}


}
