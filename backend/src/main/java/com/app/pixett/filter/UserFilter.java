package com.app.pixett.filter;

import java.io.Serializable;

public class UserFilter implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 5085859201555671211L;
	private String userId;
	private String email;
	private String phoneNumber;
	private String name;
	private Integer sharedPicseq;
	private Integer sharedPicsge;
	private Integer sharedPicsle;
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
	public Integer getSharedPicseq() {
		return sharedPicseq;
	}
	public void setSharedPicseq(int sharedPicseq) {
		this.sharedPicseq = sharedPicseq;
	}
	public Integer getSharedPicsge() {
		return sharedPicsge;
	}
	public void setSharedPicsge(int sharedPicsge) {
		this.sharedPicsge = sharedPicsge;
	}
	public Integer getSharedPicsle() {
		return sharedPicsle;
	}
	public void setSharedPicsle(int sharedPicsle) {
		this.sharedPicsle = sharedPicsle;
	}
	public void setSharedPicseq(Integer sharedPicseq) {
		this.sharedPicseq = sharedPicseq;
	}
	public void setSharedPicsge(Integer sharedPicsge) {
		this.sharedPicsge = sharedPicsge;
	}
	public void setSharedPicsle(Integer sharedPicsle) {
		this.sharedPicsle = sharedPicsle;
	}
}
