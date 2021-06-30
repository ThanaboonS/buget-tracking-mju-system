package explorer.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.model.TypeProject;
import explorer.application.service.TypeProjectService;

@RestController
@RequestMapping(value = "/viewTypeProject")
public class ViewTypeProjectController {
	
	@Autowired
	private TypeProjectService typeProjectService;
	
	@PostMapping("/queryTypeProject")
	@CrossOrigin(origins = "http://localhost:3000")
	public TypeProject viewTypeProject(@RequestBody TypeProject tp) {
		return typeProjectService.viewTypeProject(tp);
	}
}
