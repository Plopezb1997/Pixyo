package com.app.pixett.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;



@Entity
@Table
public class Event {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private String eventid;
	@Column
	private String name;
	@Column
	private String status;
	@Column
	private String location;
	@Column
	private String eventCode;
	@Column
	private Date startDate;
	@Column
	private Date endDate;
	@ManyToMany
	@JoinTable(
			  name = "assistants", 
			  joinColumns = @JoinColumn(name = "Eventid"),
			  inverseJoinColumns = @JoinColumn(name="userid", nullable = false))
	private List<User> assistants;
	@ManyToOne
	@JoinColumn(name = "creatorid")
	private User creator;
	public String getEventId() {
		return eventid;
	}
	public void setEventId(String eventId) {
		this.eventid = eventId;
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
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public List<User> getAssistants() {
		return assistants;
	}
	public void setAssistants(List<User> assistant) {
		this.assistants = assistant;
	}
	
	public User getCreatorId() {
		return creator;
	}
	public void setCreatorId(User creatorId) {
		creator = creatorId;
	}
	
	
}
