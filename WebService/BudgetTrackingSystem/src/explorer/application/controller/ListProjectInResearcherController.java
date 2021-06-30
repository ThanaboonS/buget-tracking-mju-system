package explorer.application.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.bean.QueryProfileBean;
import explorer.application.model.Project;
import explorer.application.model.Researcher;
import explorer.application.model.ResearcherProject;
import explorer.application.service.ResearcherProjectService;
import explorer.application.service.ResearcherService;

@RestController
@RequestMapping(value = "/vlistProjectInResearcher")
public class ListProjectInResearcherController {

	@Autowired
	private ResearcherProjectService researcherProjectService;
	@Autowired
	private ResearcherService researcherService;
	@PostMapping("/listProject")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Project> listProjectInResearcher(@RequestBody QueryProfileBean q) {
		Researcher r = researcherService.queryResearcher(q.getUsername());
		ArrayList<Project> projectx = new ArrayList<Project>();
		for(ResearcherProject p:researcherProjectService.queryProjectInResearcher(r)) {
			projectx.add(p.getResearcherProjectPK().getProject());
		}
		return projectx;
	}
}
