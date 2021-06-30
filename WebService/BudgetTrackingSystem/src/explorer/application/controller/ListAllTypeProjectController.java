package explorer.application.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.model.TypeProject;
import explorer.application.service.TypeProjectService;


@RestController
@RequestMapping(value = "/listTypeProject")
public class ListAllTypeProjectController {

	@Autowired
	private TypeProjectService typeProjectService;
	
	@PostMapping("/listTypeProject")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<TypeProject> listMyProject() {
		return typeProjectService.findAll();
	}
}
