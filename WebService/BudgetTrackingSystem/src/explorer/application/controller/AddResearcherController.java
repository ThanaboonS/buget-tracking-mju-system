package explorer.application.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import explorer.application.model.Researcher;
import explorer.application.service.ResearcherService;

@RestController
@RequestMapping(value = "/researcher")
public class AddResearcherController {
	
	@Autowired
	private ResearcherService researcherService;
	
	@PostMapping("/addResearcher")
	@CrossOrigin(origins = "http://localhost:3000")
	public Researcher createResearcher(@RequestBody Researcher re) {		
		return researcherService.saveResearcher(re);
	}	 
}
