package explorer.application.controller;

import java.util.Calendar;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.bean.AddPeriodBean;
import explorer.application.model.Period;
import explorer.application.model.Project;
import explorer.application.service.PeriodService;
import explorer.application.service.ProjectService;

@RestController
@RequestMapping(value = "/vperiod")
public class AddPeriodController {
	
	
	@Autowired
	private ProjectService projectService;
	@Autowired
	private PeriodService periodService;
	Period per;
	
	@PostMapping("/addPeriod")
	@CrossOrigin(origins = "http://localhost:3000")
	public String AddPeriod(@RequestBody AddPeriodBean m) {
		Project p = projectService.viewProject(m.getIdProject());
		per = new Period();
		per.setNoPeriod(m.getNoPeriod());
		per.setBudgetPeriod(m.getBudgetPeriod());
		String[] startPeriod=m.getStartPeriod().split("-");
		int yearS = Integer.parseInt(startPeriod[0])+543;
		int monthS = Integer.parseInt(startPeriod[1])-1;
		int dateS = Integer.parseInt(startPeriod[2]);
		Calendar calS = Calendar.getInstance();
		calS.set(yearS, monthS, dateS);
		String[] endPeriod = m.getEndPeriod().split("-");
		int yearE = Integer.parseInt(endPeriod[0])+543;
		int monthE = Integer.parseInt(endPeriod[1])-1;
		int dateE = Integer.parseInt(endPeriod[2]);
		Calendar calE = Calendar.getInstance();
		calE.set(yearE, monthE, dateE);
		per.setStartPeriod(calS);
		per.setEndPeriod(calE);
		per.setProject(p);
		
		periodService.savePeriod(per);
		p.getPeriods().add(per);		
		projectService.saveProject(p);
		return "succ";
	}
	public String AddPeriodc(int idProject,int noPeriod,String startPeriod,String endPeriod,double budgetPeriod) {
		Project p = projectService.viewProject(idProject);
		per = new Period();
		per.setNoPeriod(noPeriod);
		per.setBudgetPeriod(budgetPeriod);
		String[] startPeriodTemp=startPeriod.split("-");
		int yearS = Integer.parseInt(startPeriodTemp[0])+543;
		int monthS = Integer.parseInt(startPeriodTemp[1])-1;
		int dateS = Integer.parseInt(startPeriodTemp[2]);
		System.out.println("PeriodStart:"+yearS+"-"+monthS+"-"+dateS);
		Calendar calS = Calendar.getInstance();
		calS.set(yearS, monthS, dateS);
		System.out.println(calS.getTime());
		String[] endPeriodTemp = endPeriod.split("-");
		int yearE = Integer.parseInt(endPeriodTemp[0])+543;
		int monthE = Integer.parseInt(endPeriodTemp[1])-1;
		int dateE = Integer.parseInt(endPeriodTemp[2]);
		System.out.println("PeriodEnd:"+yearE+"-"+monthE+"-"+dateE);
		Calendar calE = Calendar.getInstance();
		calE.set(yearE, monthE, dateE);
		per.setStartPeriod(calS);
		per.setEndPeriod(calE);
		per.setProject(p);
	
		periodService.savePeriod(per);
		p.getPeriods().add(per);		
		projectService.saveProject(p);
		return "succ";
	}
	
	public Period addPeriodModel(Period p) {
		p.getStartPeriod().setTimeZone(TimeZone.getTimeZone("UTC"));
		p.getEndPeriod().setTimeZone(TimeZone.getTimeZone("UTC"));
		return periodService.savePeriod(p);
	}

}
