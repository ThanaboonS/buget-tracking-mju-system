package explorer.application.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

@Embeddable
public class ResearcherProjectPK implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 527860208244734990L;
	private Project project;
	private Researcher researcher;
	
	public ResearcherProjectPK() {
		
	}

	@ManyToOne(fetch = FetchType.EAGER)
	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	public Researcher getResearcher() {
		return researcher;
	}

	public void setResearcher(Researcher researcher) {
		this.researcher = researcher;
	}
	
	
}
