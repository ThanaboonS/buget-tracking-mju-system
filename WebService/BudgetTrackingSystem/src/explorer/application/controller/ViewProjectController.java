package explorer.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.bean.ViewNameProjectBean;
import explorer.application.bean.ViewProjectBean;
import explorer.application.model.Project;
import explorer.application.service.ProjectService;

@RestController
@RequestMapping(value = "/viewProject")
public class ViewProjectController {
	@Autowired
	private ProjectService projectService;
	
	@PostMapping("/queryProject")
	@CrossOrigin(origins = "http://localhost:3000")
	public Project viewProject(@RequestBody ViewProjectBean v) {
		return projectService.viewProject(v.getIdProject());
	}
	@PostMapping("/queryNameProject")
	@CrossOrigin(origins = "http://localhost:3000")
	public Project viewProjectName(@RequestBody ViewNameProjectBean v) {
		return projectService.viewNameProject(v.getNameProject());
	}
	
	public int getIdProjectFromNameProject(String nameProject) {
		return projectService.viewNameProject(nameProject).getIdProject();
	}
}
