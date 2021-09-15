package com.app.pixett.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaBuilder.In;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.app.pixett.entities.Event;
import com.app.pixett.entities.Event_;
import com.app.pixett.entities.User;
import com.app.pixett.entities.User_;
import com.app.pixett.filter.EventFilter;
import com.nimbusds.oauth2.sdk.util.StringUtils;

public class EventSpecification implements Specification<Event>{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = -4476454980793519973L;
	private final String EVENT_ID = "eventId";
	private final String NAME = "name";
	private final String STATUS = "status";
	private final String LOCATION = "location";
	private final String EVENT_CODE = "eventCode";
	private final String START_DATE = "startDate";
	private final String END_DATE = "endDate";
	private final String ASSISTANTS = "assistants";
	private final String TITLE = "title";
	private final String CREATOR = "creator";
	protected EventFilter  filter;


	public EventSpecification(EventFilter filter) {
		super();
		this.filter = filter;
	}	
	
	public EventFilter getFilter() {
		return this.filter;
		
	}
	
	@Override
	public Predicate toPredicate(Root<Event> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		Predicate predicate = criteriaBuilder.and();
		addEventIdExpression(root, criteriaBuilder, predicate);
		addNameExpression(root, criteriaBuilder, predicate);
		addStatusExpression(root, criteriaBuilder, predicate);
		addLocationExpression(root, criteriaBuilder, predicate);
		addEventCodeExpression(root, criteriaBuilder, predicate);
		addStartDateExpression(root, criteriaBuilder, predicate);
		addEndDateExpression(root, criteriaBuilder, predicate);
		addAssistantsExpression(root, criteriaBuilder, predicate);
		addTitleExpression(root, criteriaBuilder, predicate);
		addCreatorIdExpression(root, criteriaBuilder, predicate);
		return predicate;
	}
	
	protected void addEventIdExpression(Root<Event> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		if (StringUtils.isNotBlank(filter.getEventId())){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.equal(root.get(EVENT_ID), filter.getEventId())));
        }
	}
	
	protected void addNameExpression(Root<Event> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		if (StringUtils.isNotBlank(filter.getName())){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.equal(root.get(NAME), filter.getName())));
        }
	}
	
	protected void addStatusExpression(Root<Event> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		if (StringUtils.isNotBlank(filter.getStatus())){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.equal(root.get(STATUS), filter.getStatus())));
        }else if(filter.getStatusIn()!=null&&!filter.getStatusIn().isEmpty()) {
        	predicate.getExpressions().add(criteriaBuilder.and(root.get(STATUS).in(filter.getStatusIn())));
        }
	}
	
	protected void addLocationExpression(Root<Event> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		if (StringUtils.isNotBlank(filter.getLocation())){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.equal(root.get(LOCATION), filter.getLocation())));
        }
	}
	
	protected void addEventCodeExpression(Root<Event> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		if (StringUtils.isNotBlank(filter.getEventCode())){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.equal(root.get(EVENT_CODE), filter.getEventCode())));
        }
	}
	
	protected void addStartDateExpression(Root<Event> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		if (filter.getStartDateeq()!=null){
			if (filter.getStartDatele()!=null||filter.getStartDatege()!=null){
				predicate.getExpressions().add(criteriaBuilder.or(criteriaBuilder.equal(root.get(START_DATE), filter.getStartDateeq())));
			}else {
				predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.equal(root.get(START_DATE), filter.getStartDateeq())));
			}
			
        }
		if (filter.getStartDatele()!=null){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.lessThanOrEqualTo(root.get(START_DATE), filter.getStartDatele())));
        }
		if (filter.getStartDatege()!=null){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.greaterThanOrEqualTo(root.get(START_DATE), filter.getStartDatege())));
        }
	}
	
	protected void addEndDateExpression(Root<Event> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		if (filter.getEndDateeq()!=null){
			if (filter.getEndDatele()!=null||filter.getEndDatege()!=null){
				predicate.getExpressions().add(criteriaBuilder.or(criteriaBuilder.equal(root.get(END_DATE), filter.getEndDateeq())));
			}else {
				predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.equal(root.get(END_DATE), filter.getEndDateeq())));
			}
			
        }
		if (filter.getEndDatele()!=null){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.lessThanOrEqualTo(root.get(END_DATE), filter.getEndDatele())));
        }
		if (filter.getEndDatege()!=null){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.greaterThanOrEqualTo(root.get(END_DATE), filter.getEndDatege())));
        }
	}
	
	protected void addAssistantsExpression(Root<Event> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		if (filter.getAssistantsInEvents()!=null&&!filter.getAssistantsInEvents().isEmpty()){
			//Root<User> userRoot = predicate.f
			//predicate.getExpressions().add(criteriaBuilder.and(root.get(Event_.ASSISTANTS).in(filter.getAssistantsInEvents())));
        }
	}
	
	protected void addTitleExpression(Root<Event> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		//TODO
		/*if (StringUtils.isNotBlank(filter.getTitle())){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.equal(root.get(TITLE), filter.getTitle())));
        }*/
	}
	
	protected void addCreatorIdExpression(Root<Event> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		if (filter.getCreator()!=null){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.equal(root.get(CREATOR), filter.getCreator())));
        }
	}

}
