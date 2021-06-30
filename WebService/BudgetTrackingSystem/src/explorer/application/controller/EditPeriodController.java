package explorer.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.bean.EditPeriodBean;
import explorer.application.model.Period;
import explorer.application.service.PeriodService;

@RestController
@RequestMapping(value = "/editPeriod")
public class EditPeriodController {
	
	@Autowired
	private PeriodService periodService;

	@PostMapping("/updatePeriod")
	@CrossOrigin(origins = "http://localhost:3000")
	public Period editPeriod(@RequestBody EditPeriodBean e) {
		Period p = periodService.viewPeriod(e.getIdPeriod());
		p.setBudgetPeriod(e.getBudgetPeriod());
		String[] startPeriod = e.getStartPeriod().split("-");
		int yearS = Integer.parseInt(startPeriod[0]);
		int monthS = Integer.parseInt(startPeriod[1])-1;
		int dateS = Integer.parseInt(startPeriod[2])+1;
		p.getStartPeriod().set(yearS, monthS, dateS);
		
		String[] endPeriod = e.getEndPeriod().split("-");
		int yearE = Integer.parseInt(endPeriod[0]);
		int monthE = Integer.parseInt(endPeriod[1])-1;
		int dateE = Integer.parseInt(endPeriod[2])+1;
		p.getEndPeriod().set(yearE, monthE, dateE);
		return periodService.savePeriod(p);
	}
}
