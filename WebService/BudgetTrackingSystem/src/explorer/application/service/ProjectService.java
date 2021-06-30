package explorer.application.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import explorer.application.model.Project;
import explorer.application.repository.ProjectRepository;


@Service
public class ProjectService {
	
	@Autowired
	private ProjectRepository projectRepository;
	
	
	public ProjectService() {}
	
	public Project saveProject(Project p) {
		return projectRepository.save(p);
	}
	
	public List<Project> findAll(){
		return projectRepository.findAll(sortByIdAsc());
	}
	private Sort sortByIdAsc() {
        return new Sort(Sort.Direction.ASC, "durationYear");
    }
	
	public Project viewProject(int id) {
		return projectRepository.queryProject(id);
	}	
	public Project viewNameProject(String nameProject) {
		return projectRepository.queryNameProject(nameProject);
	}	
	
	public List<Project> queryProjectSearch(String nameProject){
		return projectRepository.findByNameProject(nameProject);
	}
	
	public List<Integer> queryDerationYear(){
		return projectRepository.queryDuration();
	}
	
}
