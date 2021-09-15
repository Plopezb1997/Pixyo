package com.app.pixett.entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name ="event_pics")
public class Pic {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private String picid;
	
	@ManyToOne
	@JoinColumn(name = "eventid")
	private Event eventid;
	
	@Lob
    @Column
	private byte[] pic;
	
	@Column
	private boolean scanned;
	
	@OneToMany(
	        mappedBy = "pic",
	        cascade = CascadeType.ALL,
	        orphanRemoval = true
	    )
	private List<PicManagement> picManagement;

	public String getPicid() {
		return picid;
	}

	public void setPicid(String picid) {
		this.picid = picid;
	}

	public Event getEventid() {
		return eventid;
	}

	public void setEventid(Event eventid) {
		this.eventid = eventid;
	}

	public byte[] getPic() {
		return pic;
	}

	public void setPic(byte[] pic) {
		this.pic = pic;
	}

	public boolean isScanned() {
		return scanned;
	}

	public void setScanned(boolean scanned) {
		this.scanned = scanned;
	}

	public List<PicManagement> getPicManagement() {
		return picManagement;
	}

	public void setPicManagement(List<PicManagement> picManagement) {
		this.picManagement = picManagement;
	}

}
