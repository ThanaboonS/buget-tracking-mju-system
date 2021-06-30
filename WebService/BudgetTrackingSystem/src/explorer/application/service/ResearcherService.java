package explorer.application.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import explorer.application.model.Researcher;
import explorer.application.repository.ResearcherRepository;

@Service
public class ResearcherService {
	
	@Autowired
	private ResearcherRepository researcherRepository;

	public ResearcherService() {}
	
	public Researcher queryResearcher(String username) {
		return researcherRepository.queryResearcher(username);
	}
	public Researcher queryResearcherName(String name) {
		return researcherRepository.queryNameResearcher(name);
	}
	
	public Researcher saveResearcher(Researcher re) {
		return researcherRepository.save(re);
	}
	
	public List<Researcher> findAll(){
		return researcherRepository.findAll();
	}
	
	

}
