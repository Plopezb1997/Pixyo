package com.app.pixett.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name ="assistants")
public class Assistant{
	
	@EmbeddedId
	private AssistantsID id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("eventid")
	@JoinColumn(name = "eventid")
	/*@JoinColumn(name = "eventid", 
	referencedColumnName = "eventid", nullable = false, insertable = false, updatable = false)*/
	private Event eventAssistantRef;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userid")
	@JoinColumn(name = "userid")
    private User userRef;
	
	@Column
	private Date lastScan;

	public AssistantsID getId() {
		return id;
	}

	public void setId(AssistantsID id) {
		this.id = id;
	}

	public Event getEvent() {
		return eventAssistantRef;
	}

	public void setEvent(Event event) {
		this.eventAssistantRef = event;
	}

	public User getUser() {
		return userRef;
	}

	public void setUser(User user) {
		this.userRef = user;
	}

	public Date getLastScan() {
		return lastScan;
	}

	public void setLastScan(Date lastScan) {
		this.lastScan = lastScan;
	}


	
	
}
