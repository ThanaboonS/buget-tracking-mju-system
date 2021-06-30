package explorer.application.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.service.FileProjectService;
import explorer.application.bean.ListFileProjectBean;
import explorer.application.model.FileProject;

@RestController
@RequestMapping(value = "/vListFileProject")
public class ListFileProjectController {
	
	@Autowired
	private FileProjectService fileProjectService;
	@Autowired
	private ViewProjectController viewProjectController;
	ArrayList<FileProject> fileProject;
	
	
	@PostMapping("/listFile")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<FileProject> listFileProject(@RequestBody ListFileProjectBean lfp){
		int idProject = viewProjectController.getIdProjectFromNameProject(lfp.getNameProject());
		fileProject = new ArrayList<FileProject>();	
		for(FileProject f:fileAll()) {
			if(idProject == f.getProject().getIdProject()) {
				fileProject.add(f);
			}
		}
		return fileProject;
	}	
	
	public List<FileProject> fileAll(){
		return fileProjectService.findAll();
	}
	
	
	
}
