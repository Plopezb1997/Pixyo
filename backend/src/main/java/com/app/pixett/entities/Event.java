package com.app.pixett.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.Id;


@Entity
@Table
public class Event {
	@Id
	@Column
	private String eventId;
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
	private List<User> assistant;
	@Column
	private String title;
	@ManyToOne
	@JoinColumn(name = "UserId")
	private User CreatorId;
}
