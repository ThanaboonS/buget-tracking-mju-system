package explorer.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.bean.EditProjectBean;
import explorer.application.model.Project;
import explorer.application.model.TypeProject;
import explorer.application.service.ProjectService;

@RestController
@RequestMapping(value = "/editProject")
public class EditProjectController {
	
	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private ViewTypeProjectController viewTypeProjectController;
	

	@PostMapping("/updateProject")
	@CrossOrigin(origins = "http://localhost:3000")
	public Project editProject(@RequestBody EditProjectBean p) {
		Project pr = projectService.viewProject(p.getIdProject());
		pr.setIdProject(p.getIdProject());
		pr.setDurationYear(p.getDurationYear());
		pr.setBudget(p.getBudget());
		pr.setNameProject(p.getNameProject());
		String[] startProject = p.getDateStartProject().split("-");
		int year = Integer.parseInt(startProject[0]);
		int month = Integer.parseInt(startProject[1])-1;
		int date = Integer.parseInt(startProject[2])+1;
		pr.getDateStartProject().set(year, month,date);		
		TypeProject modelTypeProject = new TypeProject();
		modelTypeProject.setNameTypeProject(p.getTypeProject());
		TypeProject typeProject = viewTypeProjectController.viewTypeProject(modelTypeProject);		
		pr.setTypeProject(typeProject);
		return projectService.saveProject(pr);
		
	}
}
