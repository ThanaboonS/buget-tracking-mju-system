package explorer.application.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.service.ProjectService;

@RestController
@RequestMapping(value = "/listDuration")
public class ListDurationYearController {	
	@Autowired
	private ProjectService proejctService;	
	@PostMapping("/listDurationYear")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Integer> listDurationYear() {		
		return proejctService.queryDerationYear();
	}	
}
