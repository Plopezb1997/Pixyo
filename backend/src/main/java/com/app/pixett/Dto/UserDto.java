package com.app.pixett.Dto;

import java.io.Serializable;

public class UserDto implements Serializable{
	private String userId;
	private String email;
	private String password;
	private String phoneNumber;
	private String name;
	private int sharedPics;
	private String paymentMethod;
	private String paymentPlan;
	private String face;
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
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
	public String getFace() {
		return face;
	}
	public void setFace(String face) {
		this.face = face;
	}
}
