package explorer.application.controller;

import java.util.Calendar;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.bean.AddProjectBean;
import explorer.application.model.Officer;
import explorer.application.model.Project;
import explorer.application.model.Researcher;
import explorer.application.model.ResearcherProject;
import explorer.application.model.ResearcherProjectPK;
import explorer.application.model.TypeProject;
import explorer.application.service.ProjectService;
import explorer.application.service.ResearcherProjectService;
import explorer.application.service.TypeProjectService;

@RestController
@RequestMapping(value = "/vproject")
public class AddProjectController {
	@Autowired 
	private ProjectService projectService;
	@Autowired 
	private ResearcherProjectService researcherProjectService;
	@Autowired
	private AddPeriodController addPeriodController;
	@Autowired
	private ViewTypeProjectController viewTypeProjectController;
	@Autowired
	private TypeProjectService typeProjectService;
	private Calendar cal = Calendar.getInstance();
	
	@PostMapping("/addProject")
	@CrossOrigin(origins = "http://localhost:3000")
	public int createProject(@RequestBody AddProjectBean p){			
		
		Officer o = new Officer();
		o.setUsername(p.getUsername());		
		Project pr = new Project();		

		pr.setOfficer(o);
		String[] startProject = p.getStartProject().split("-");
		int year = Integer.parseInt(startProject[0]);
		int month = Integer.parseInt(startProject[1]);
		int date = Integer.parseInt(startProject[2])-1;
		
		cal.set(year, month, date);
		cal.setTimeZone(TimeZone.getTimeZone("UTC"));
		
		pr.setDateStartProject(cal);
		
		pr.setNameProject(p.getNameProject());
		
		pr.setBudget(p.getBudget());
		pr.setDurationYear(p.getDurationYear());
		pr.setStatusProject(p.getStatusProject());
		
		System.out.println("----------"+cal.getTime()+"-------------"+year+"-----"+month);
		
		TypeProject modelTypeProject = new TypeProject();
		modelTypeProject.setNameTypeProject(p.getNameTypeProject());
		TypeProject typeProject = viewTypeProjectController.viewTypeProject(modelTypeProject);		
		pr.setTypeProject(typeProject);
		Project project = projectService.saveProject(pr);
		
		//------------------------------------add period----------------------------------------------
		for(int i=0; i<p.getPeriodArray().size(); i++) {
			p.getPeriodArray().get(i).setProject(project);
			addPeriodController.addPeriodModel(p.getPeriodArray().get(i));
		}
		//--------------------------------------------------------------------------------------------
		typeProject.getProject().add(pr);		
		typeProjectService.saveTypeProject(typeProject);
		
		Researcher r = new Researcher();
		r.setUsername(p.getReader());
		
		addResearcherProject(pr,r);
		
		
		System.out.println("idProjecteee:"+pr.getIdProject());	
		
		
		return pr.getIdProject();
	}	
	
	public ResearcherProject addResearcherProject(Project pr,Researcher r){				
		ResearcherProjectPK researcherProjectPK = new ResearcherProjectPK();
		researcherProjectPK.setProject(pr);
		researcherProjectPK.setResearcher(r);		
		ResearcherProject researcherProject = new ResearcherProject();
		researcherProject.setResearcherProjectPK(researcherProjectPK);
		researcherProject.setStatusResearch("หัวหน้าโครงการวิจัย");
		
		return researcherProjectService.saveResearcherProject(researcherProject);
		
	}
	

}
