package com.app.pixett.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.app.pixett.entities.User;
import com.app.pixett.filter.UserFilter;
import com.nimbusds.oauth2.sdk.util.StringUtils;

public class UserSpecification implements Specification<User>{

	private final String USER_ID = "userid";
	
	private final String EMAIL = "email";
	
	private final String PHONE_NUMBER = "phoneNumber";
	
	private final String NAME = "name";
	
	private final String SHARED_PICS = "sharedPics";
	
	private final String PAYMENT_METHOD = "paymentMethod";
	
	private final String PAYMENT_PLAN = "paymentPlan";
	
	private final String EVENTS = "events";
	
	protected UserFilter  filter;


	public UserSpecification(UserFilter filter) {
		super();
		this.filter = filter;
	}	
	
	public UserFilter getFilter() {
		return this.filter;
		
	}
	
	public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		Predicate predicate = criteriaBuilder.and();
		addUserIdExpression(root, criteriaBuilder, predicate);
		addEmailExpression(root, criteriaBuilder, predicate);
		addPhoneNumberExpression(root, criteriaBuilder, predicate);
		addNameExpression(root, criteriaBuilder, predicate);
		addSharedPicsExpression(root, criteriaBuilder, predicate);
		addPaymentMethodExpression(root, criteriaBuilder, predicate);
		addPaymentPlanExpression(root, criteriaBuilder, predicate);
		return predicate;
	}
	
	protected void addUserIdExpression(Root<User> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		if (StringUtils.isNotBlank(filter.getUserId())){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.equal(root.get(USER_ID), filter.getUserId())));
        }
	}
	
	protected void addEmailExpression(Root<User> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		if (StringUtils.isNotBlank(filter.getEmail())){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.equal(root.get(EMAIL), filter.getEmail())));
        }
	}
	
	protected void addPhoneNumberExpression(Root<User> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		if (StringUtils.isNotBlank(filter.getPhoneNumber())){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.equal(root.get(PHONE_NUMBER), filter.getPhoneNumber())));
        }
	}
	
	protected void addNameExpression(Root<User> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		if (StringUtils.isNotBlank(filter.getName())){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.equal(root.get(NAME), filter.getName())));
        }
	}
	
	protected void addSharedPicsExpression(Root<User> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		if (filter.getSharedPicseq()!=null){
			if (filter.getSharedPicsle()!=null||filter.getSharedPicsle()!=null){
				predicate.getExpressions().add(criteriaBuilder.or(criteriaBuilder.equal(root.get(SHARED_PICS), filter.getUserId())));
			}else {
				predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.equal(root.get(SHARED_PICS), filter.getUserId())));
			}
			
        }
		if (filter.getSharedPicsle()!=null){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.lessThanOrEqualTo(root.get(SHARED_PICS), filter.getUserId())));
        }
		if (filter.getSharedPicsge()!=null){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.greaterThanOrEqualTo(root.get(SHARED_PICS), filter.getUserId())));
        }
	}
	
	protected void addPaymentMethodExpression(Root<User> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		if (StringUtils.isNotBlank(filter.getPaymentMethod())){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.equal(root.get(PAYMENT_METHOD), filter.getPaymentMethod())));
        }
	}
	
	protected void addPaymentPlanExpression(Root<User> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		if (StringUtils.isNotBlank(filter.getPaymentPlan())){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.equal(root.get(PAYMENT_PLAN), filter.getPaymentPlan())));
        }
	}
	
	protected void addEventsExpression(Root<User> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		//TODO implement
		/*if (StringUtils.isNotBlank(filter.get())){
		 * 
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.equal(root.get(EVENTS), filter.getUserId())));
        }*/
	}

}
