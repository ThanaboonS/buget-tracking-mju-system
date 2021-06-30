package explorer.application.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;


import explorer.application.model.FileProject;

import explorer.application.repository.FileProjectRepository;


@Service
public class FileProjectService {
	
	
	
	@Autowired
	private FileProjectRepository fileProjectRepository;
	
	
	
	public FileProject saveFileProject(FileProject fp) {
		return fileProjectRepository.save(fp);
	}
	
	
	
	public List<FileProject> findAll(){
		return fileProjectRepository.findAll();
	}
	
	public void deleteFileProject(String nameFile) {
		fileProjectRepository.deleteFileProject(nameFile);
	}
	
}
