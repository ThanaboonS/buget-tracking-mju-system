package explorer.application.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import explorer.application.model.Project;
import explorer.application.model.Researcher;
import explorer.application.model.ResearcherProject;
import explorer.application.repository.ResearcherProjectRepository;

@Service
public class ResearcherProjectService {
	@Autowired
	private ResearcherProjectRepository researcherProjectRepository;
	
	
	public ResearcherProjectService() {}
	
	@Transactional
	public ResearcherProject saveResearcherProject (ResearcherProject rp) {		
		return researcherProjectRepository.save(rp);
	}
	
	
	public List<ResearcherProject> queryResearcherInProject(Project p){		
		
		return researcherProjectRepository.findByProject(p);
	}
	
	public List<ResearcherProject> queryProjectInResearcher(Researcher r){		
		
		return researcherProjectRepository.findByResearcher(r);
	}
	
	public void deleteResearcherProject(int idProject,String username) {
		researcherProjectRepository.deleteResearcherInProject(idProject, username);
	}
}
