package explorer.application.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import explorer.application.model.Period;
import explorer.application.repository.PeriodRepository;

@Service
public class PeriodService {
	
	@Autowired
	private PeriodRepository periodRepository;
	
	public PeriodService() {}
	
	public Period savePeriod(Period p) {
		return periodRepository.save(p);
	}
	public List<Period> findAll(){
		return periodRepository.findAll();
	}
	public Period viewPeriod(int id) {
		return periodRepository.queryPeriod(id);
	}
	
}
