package explorer.application.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.bean.AddResearcherInProjectBean;
import explorer.application.model.Project;
import explorer.application.model.Researcher;
import explorer.application.model.ResearcherProject;
import explorer.application.model.ResearcherProjectPK;
import explorer.application.service.ProjectService;
import explorer.application.service.ResearcherProjectService;
import explorer.application.service.ResearcherService;

@RestController
@RequestMapping(value = "/addResearcherInProject")
public class AddResearcherInProjectController {
	@Autowired 
	private ProjectService projectService;
	@Autowired 
	private ResearcherProjectService researcherProjectService;
	@Autowired
	private ResearcherService researcherService;
	
	@PostMapping("/addResearcher")
	@CrossOrigin(origins = "http://localhost:3000")
	public ArrayList<ResearcherProject> addResearcherProject(@RequestBody AddResearcherInProjectBean model){	
		Project p = projectService.viewProject(model.getIdProject());	
		ResearcherProjectPK researcherProjectPK;
		ArrayList<ResearcherProject> researcherProjects = new ArrayList<ResearcherProject>();
		for(int i=0; i<model.getUsername().length; i++) {
			Researcher r = researcherService.queryResearcher(model.getUsername()[i]);			
			researcherProjectPK = new ResearcherProjectPK();
			researcherProjectPK.setProject(p);
			researcherProjectPK.setResearcher(r);		
			ResearcherProject researcherProject = new ResearcherProject();
			researcherProject.setResearcherProjectPK(researcherProjectPK);
			researcherProject.setStatusResearch("ผู้ร่วมโครงการวิจัย");
			researcherProjects.add(researcherProjectService.saveResearcherProject(researcherProject));
		}	
		return researcherProjects;
	}

}
