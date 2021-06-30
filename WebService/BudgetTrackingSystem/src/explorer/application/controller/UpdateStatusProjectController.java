package explorer.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.bean.UpdateStatusProjectBean;
import explorer.application.model.Project;
import explorer.application.service.ProjectService;

@RestController
@RequestMapping(value = "/updateStatusProject")
public class UpdateStatusProjectController {

	@Autowired 
	private ProjectService projectService;
	
	@PostMapping("/updateStatusProject")
	@CrossOrigin(origins = "http://localhost:3000")
	public Project updateProejct(@RequestBody UpdateStatusProjectBean p) {
		Project pr = projectService.viewProject(p.getIdProject());
		pr.setStatusProject(p.getStatusProject());
		return projectService.saveProject(pr);
	}
	
}
