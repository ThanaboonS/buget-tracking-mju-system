package explorer.application.service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import explorer.application.model.FileItem;
import explorer.application.repository.FileItemRepository;


@Service
public class FileItemService {
	@Autowired
	private FileItemRepository fileItemRepository;
	private ArrayList<FileItem> arrayFileItem;
	public FileItemService() {}
	
	public FileItem saveFileItem(FileItem f) {
		return fileItemRepository.save(f);
	}
	
	public List<FileItem> findAll(){
		return fileItemRepository.findAll();
	}
	
	public List<FileItem> findFileItem(String idItem){
		arrayFileItem = new ArrayList<FileItem>();
		for(FileItem list:findAll()) {
			if(idItem.equals(list.getItem().getIdItem())) {
				arrayFileItem.add(list);
			}			
		}
		return arrayFileItem;
	}
	public void deleteFileItem(String fileName) {
		fileItemRepository.deleteFileItem(fileName);
		System.out.println("delete succ");
	}
}
