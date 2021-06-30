package explorer.application.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.bean.ViewProjectBean;
import explorer.application.model.Project;

import explorer.application.model.ResearcherProject;
import explorer.application.service.ResearcherProjectService;

@RestController
@RequestMapping(value = "/vlistresearcherInProject")
public class ListResearcherInProjectController {

	@Autowired
	private ResearcherProjectService researcherProjectService;
	
	@Autowired
	private ViewProjectController viewProjectController;
	
	
	@PostMapping("/listResearcher")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<ResearcherProject> getResearcherInProject(@RequestBody ViewProjectBean v) {
		Project p = viewProjectController.viewProject(v);		
		return researcherProjectService.queryResearcherInProject(p);
	}
	
}
