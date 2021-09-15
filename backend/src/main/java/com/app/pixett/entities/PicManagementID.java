package com.app.pixett.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class PicManagementID implements Serializable {
	
	@Column
	private String picid;
	
	@Column
	private String userid;
	
	private PicManagementID() {}
	
	public PicManagementID(String picid, String userid) {
		super();
		this.picid = picid;
		this.userid = userid;
	}
	
	public boolean equals(Object o) {
		if (this == o) return true;
		 
        if (o == null || getClass() != o.getClass())
            return false;
 
        PicManagementID that = (PicManagementID) o;
        return Objects.equals(picid, that.picid) &&
                Objects.equals(userid, that.userid);
	}
	
	@Override
    public int hashCode() {
        return Objects.hash(picid, picid);
    }

	public String getPicid() {
		return picid;
	}

	public void setPicid(String picid) {
		this.picid = picid;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}
}
