package explorer.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.bean.AddResearcherProjectBean;
import explorer.application.model.Project;
import explorer.application.model.Researcher;
import explorer.application.model.ResearcherProject;
import explorer.application.model.ResearcherProjectPK;
import explorer.application.service.ResearcherProjectService;
@RestController
@RequestMapping(value = "/vResearcherProject")
public class AddResearcherProject {
	
	@Autowired 
	private ResearcherProjectService researcherProjectService;
	
	
	
	@PostMapping("/addResearcherProject")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResearcherProject addResearcherProject(@RequestBody AddResearcherProjectBean model){		
		Project p = new Project();
		p.setIdProject(model.getIdProject());
		
		Researcher r = new Researcher();
		r.setUsername(model.getUsername());
		
		ResearcherProjectPK researcherProjectPK = new ResearcherProjectPK();
		researcherProjectPK.setProject(p);
		researcherProjectPK.setResearcher(r);		
		ResearcherProject researcherProject = new ResearcherProject();
		researcherProject.setResearcherProjectPK(researcherProjectPK);
		researcherProject.setStatusResearch("ผู้ร่วมวิจัย");
		
		return researcherProjectService.saveResearcherProject(researcherProject);
		
	}
}
