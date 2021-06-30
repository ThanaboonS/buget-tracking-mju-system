package explorer.application.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import explorer.application.model.Officer;
import explorer.application.service.OfficerService;



@RestController
@RequestMapping(value = "/officer")
public class AddOfficerController {
	
	@Autowired
	private OfficerService officerService;	
	@PostMapping("/addOfficer")
	@CrossOrigin(origins = "http://localhost:3000")
	public Officer createOfficer(@RequestBody Officer officer) {		
		return officerService.saveOfficer(officer);
	}
	
	
	
	
}
