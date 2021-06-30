package explorer.application.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import explorer.application.model.Officer;
import explorer.application.repository.OfficerRepository;

@Service
public class OfficerService {
	
	@Autowired
	private OfficerRepository officerRepository;
	
	public OfficerService() {}
	
	
	public Officer saveOfficer(Officer officer) {
		return officerRepository.save(officer);
	}
	
	
	

}
