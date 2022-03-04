package com.app.pixett.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class AssistantsID implements Serializable {
	
	@Column
	private String eventid;
	
	@Column
	private String userid;
	
	private AssistantsID() {}
	
	public AssistantsID(String eventid, String userid) {
		super();
		this.eventid = eventid;
		this.userid = userid;
	}
	
	public boolean equals(Object o) {
		if (this == o) return true;
		 
        if (o == null || getClass() != o.getClass())
            return false;
 
        AssistantsID that = (AssistantsID) o;
        return Objects.equals(eventid, that.eventid) &&
                Objects.equals(userid, that.userid);
	}
	
	@Override
    public int hashCode() {
        return Objects.hash(eventid, eventid);
    }

	public String getEventId() {
		return eventid;
	}

	public void setEventId(String picid) {
		this.eventid = picid;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}
}
