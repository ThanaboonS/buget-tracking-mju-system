package explorer.application.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.service.ResearcherService;
import explorer.application.model.Researcher;;

@RestController
@RequestMapping(value = "/vlistresearcher")
public class ListResearcherController {
	@Autowired
	private ResearcherService researcherService;
	
	@GetMapping("/listResearch")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Researcher> listResearcher(){
		return researcherService.findAll();
	}
}
