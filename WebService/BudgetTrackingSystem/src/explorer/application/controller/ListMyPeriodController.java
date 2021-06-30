package explorer.application.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.model.Period;
import explorer.application.model.Project;
import explorer.application.service.PeriodService;

@RestController
@RequestMapping(value = "/vlistPeriod")
public class ListMyPeriodController {
	ArrayList<Period> myPeriod;
	@Autowired
	private PeriodService periodService;
	
	public List<Period> ListAllPeriod() {
		return periodService.findAll();
	}
	@PostMapping("/listMyPeriod")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Period> ListMyPeriod(@RequestBody Project pro){
		myPeriod = new ArrayList<Period>();
		for(Period p:ListAllPeriod()) {
			if(p.getProject().getIdProject()==pro.getIdProject()) {
				System.out.println(p.getProject().getIdProject()+"--"+p.getStartPeriod().getTime());
				p.getStartPeriod().add(Calendar.DATE, 1);
				p.getEndPeriod().add(Calendar.DATE, 1);
				myPeriod.add(p);
			}			
		}
		return myPeriod;
	}
}
