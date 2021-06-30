package explorer.application.controller;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.service.ProjectService;
import explorer.application.bean.QueryProjectSearchBean;
import explorer.application.model.Officer;
import explorer.application.model.Project;;

@RestController
@RequestMapping(value = "/vlistProject")
public class ListProjectController {
	ArrayList<Project> myProject;
	@Autowired 
	private ProjectService projectService;	
	@GetMapping("/listAllProject")
	@CrossOrigin(origins = "http://localhost:3000")
	public  List<Project> listAllProject(){
		return projectService.findAll();
	}
	@PostMapping("/listMyProject")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Project> listMyProject(@RequestBody Officer o) {
		myProject = new ArrayList<Project>();
		for(Project p:listAllProject()) {
			if(p.getOfficer().getUsername().equals(o.getUsername())) {
				myProject.add(p);
			}
		}		
		return myProject;
	}
	
	@PostMapping("/searcherProject")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Project> listProjectSearch(@RequestBody QueryProjectSearchBean q){
		myProject = new ArrayList<Project>();		
		for(Project p:projectService.queryProjectSearch(q.getNameProject())) {
			if(p.getOfficer().getUsername().equals(q.getUsername())) {
				myProject.add(p);
			}
		}
		return myProject;
	}
	
}
