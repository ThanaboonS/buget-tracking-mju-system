package explorer.application.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import explorer.application.model.TypeProject;
import explorer.application.repository.TypeProjectRepository;

@Service
public class TypeProjectService {
	@Autowired
	private TypeProjectRepository typeProjectRepository;
	
	public TypeProjectService() {}
	
	public TypeProject saveTypeProject(TypeProject tp) {
		return typeProjectRepository.save(tp);
	}
	public List<TypeProject> findAll(){
		return typeProjectRepository.findAll();
	}
	public TypeProject viewTypeProject(TypeProject id) {
		return typeProjectRepository.queryTypeProject(id.getNameTypeProject());
	}
}
