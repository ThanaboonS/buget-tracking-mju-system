package explorer.application.model;


import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;



@Entity
@Table(name="researcher_project")

public class ResearcherProject {
	
	
	private ResearcherProjectPK researcherProjectPK;
	@Column(name="statusResearch")
	@Length(max = 20)
	@NotNull
	private String statusResearch;
	
	public ResearcherProject() {
		
	}

	@EmbeddedId
	public ResearcherProjectPK getResearcherProjectPK() {
		return researcherProjectPK;
	}

	public void setResearcherProjectPK(ResearcherProjectPK researcherProjectPK) {
		this.researcherProjectPK = researcherProjectPK;
	}

	public String getStatusResearch() {
		return statusResearch;
	}

	public void setStatusResearch(String statusResearch) {
		this.statusResearch = statusResearch;
	}
	
	
	

}
