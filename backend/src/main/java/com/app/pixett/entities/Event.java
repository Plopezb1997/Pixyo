package com.app.pixett.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
	/*@Column
	private String creator;*/
	
	
	@OneToMany(mappedBy = "eventAssistantRef")
	List<Assistant> assistants;
	
	
	@ManyToOne
	@JoinColumn(name = "creatorid", insertable = true, updatable = false)
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

	
	public User getCreator() {
		return creator;
	}
	public void setCreator(User creatorId) {
		creator = creatorId;
	}
	public List<Assistant> getAssistants() {
		return assistants;
	}
	public void setAssistants(List<Assistant> assistants) {
		this.assistants = assistants;
	}
	
	
}
