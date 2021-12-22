package com.app.pixett.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;




@Entity
@Table
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private String userid;
	@Column
	private String email;
	@Column
	private String password;
	@Column(name="phone_number")
	private String phoneNumber;
	@Column
	private String name;
	@Column(name="shared_pics")
	private int sharedPics;
	@Column(name="payment_method")
	private String paymentMethod;
	@Column(name="payment_plan")
	private String paymentPlan;
	@Lob
    @Column
	private byte[] face;
	
	@OneToMany(
	        mappedBy = "userPicMgmt",
	        cascade = CascadeType.ALL,
	        orphanRemoval = true,
	        fetch = FetchType.LAZY
	    )
	private Set<PicManagement> picManagement;
	
	@OneToMany(mappedBy = "eventAssistantRef")
	private Set<Assistant> assistants;
	
	
	public String getUserId() {
		return userid;
	}
	public void setUserId(String userId) {
		this.userid = userId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}	
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getSharedPics() {
		return sharedPics;
	}
	public void setSharedPics(int sharedPics) {
		this.sharedPics = sharedPics;
	}
	public String getPaymentMethod() {
		return paymentMethod;
	}
	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}
	public String getPaymentPlan() {
		return paymentPlan;
	}
	public void setPaymentPlan(String paymentPlan) {
		this.paymentPlan = paymentPlan;
	}
	public byte[] getFace() {
		return face;
	}
	public void setFace(byte[] face) {
		this.face = face;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public Set<PicManagement> getPicManagement() {
		return picManagement;
	}
	public void setPicManagement(Set<PicManagement> picManagement) {
		this.picManagement = picManagement;
	}
	public Set<Assistant> getAssistants() {
		return assistants;
	}
	public void setAssistants(Set<Assistant> assistants) {
		this.assistants = assistants;
	}

	
	
}
