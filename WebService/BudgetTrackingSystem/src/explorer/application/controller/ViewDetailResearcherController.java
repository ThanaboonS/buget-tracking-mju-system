package explorer.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.bean.ViewDetailResearcherNameBean;
import explorer.application.model.Researcher;
import explorer.application.service.ResearcherService;


@RestController
@RequestMapping(value = "/researcherDetail")
public class ViewDetailResearcherController {
	
	@Autowired
	private ResearcherService researcherService;
	
	@PostMapping("/queryProfile")
	@CrossOrigin(origins = "http://localhost:3000")
	public Researcher getResearcherName(@RequestBody ViewDetailResearcherNameBean v) {
		return researcherService.queryResearcherName(v.getName());
	}
}
