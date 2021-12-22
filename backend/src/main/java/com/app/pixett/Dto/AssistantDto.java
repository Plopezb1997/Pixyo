package com.app.pixett.Dto;

import java.util.Date;

public class AssistantDto {
	//public class AssistantDtoPK{
		private String eventid;
		private String userid;
		public String getEventid() {
			return eventid;
		}
		public void setEventid(String eventid) {
			this.eventid = eventid;
		}
		public String getUserid() {
			return userid;
		}
		public void setUserid(String userid) {
			this.userid = userid;
		}
	//}
	//private AssistantDtoPK id; 
	private Date lastScan;
	/*public AssistantDtoPK getId() {
		return id;
	}
	public void setId(AssistantDtoPK id) {
		this.id = id;
	}*/
	public Date getLastScan() {
		return lastScan;
	}
	public void setLastScan(Date lastScan) {
		this.lastScan = lastScan;
	}
	

}
