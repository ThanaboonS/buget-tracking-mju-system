package explorer.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.bean.DeleteFileProjectBean;
import explorer.application.service.FileProjectService;

@RestController
@RequestMapping(value = "/deleteFileProject")
public class DeleteFileProjectController {
	
	@Autowired
	private FileProjectService fileProjectService;
	
	@PostMapping("/deleteFile")
	@CrossOrigin(origins = "http://localhost:3000")
	public void deleteFileProject(@RequestBody DeleteFileProjectBean d) {fileProjectService.deleteFileProject(d.getNameFileProject());}
}
