package explorer.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.bean.DeleteResearcherProjectBean;
import explorer.application.service.ResearcherProjectService;

@RestController
@RequestMapping(value = "/vDeleteResearcherProject")
public class DeleteResearcherProjectController {

	@Autowired
	private ResearcherProjectService researcherProjectService;
	@PostMapping("/deleteResearcherProject")
	@CrossOrigin(origins = "http://localhost:3000")
	public void deleteResearcherProject(@RequestBody DeleteResearcherProjectBean d) {
		researcherProjectService.deleteResearcherProject(d.getIdProject(), d.getUsername());
	}
}
