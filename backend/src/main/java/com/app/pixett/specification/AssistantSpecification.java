package com.app.pixett.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.app.pixett.entities.Assistant;
import com.app.pixett.entities.Event;
import com.app.pixett.filter.AssistantFilter;
import com.nimbusds.oauth2.sdk.util.StringUtils;

public class AssistantSpecification implements Specification<Assistant>{
	
	private static final long serialVersionUID = -4476454980793519973L;
	private final String EVENT_ID = "eventid";
	private final String USER_ID= "userid";
	private final String LAST_SCAN = "lastScan";
	protected AssistantFilter  filter;


	public AssistantSpecification(AssistantFilter filter) {
		super();
		this.filter = filter;
	}	
	
	public AssistantFilter getFilter() {
		return this.filter;
		
	}
	
	@Override
	public Predicate toPredicate(Root<Assistant> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		Predicate predicate = criteriaBuilder.and();
		addEventIdExpression(root, criteriaBuilder, predicate);
		addUserIdExpression(root, criteriaBuilder, predicate);
		/*addStatusExpression(root, criteriaBuilder, predicate);
		addLocationExpression(root, criteriaBuilder, predicate);
		addEventCodeExpression(root, criteriaBuilder, predicate);
		addStartDateExpression(root, criteriaBuilder, predicate);
		addEndDateExpression(root, criteriaBuilder, predicate);
		addAssistantsExpression(root, criteriaBuilder, predicate);
		addTitleExpression(root, criteriaBuilder, predicate);
		addCreatorIdExpression(root, criteriaBuilder, predicate);*/
		return predicate;
	}
	
	protected void addEventIdExpression(Root<Assistant> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		if (StringUtils.isNotBlank(filter.getEventId())){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.equal(root.get("id").get(EVENT_ID), filter.getEventId())));
        }
	}
	
	/*protected void addStartDateExpression(Root<Event> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
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
	}*/
	
	
	
	protected void addUserIdExpression(Root<Assistant> root, CriteriaBuilder criteriaBuilder, Predicate predicate) {
		if (filter.getUserId()!=null){
            predicate.getExpressions().add(criteriaBuilder.and(criteriaBuilder.equal(root.get("id").get(USER_ID), filter.getUserId())));
        }
	}

}
