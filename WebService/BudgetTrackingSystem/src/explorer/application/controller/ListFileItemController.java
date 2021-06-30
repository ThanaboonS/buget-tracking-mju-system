package explorer.application.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.bean.ListFileItemBean;

import explorer.application.model.FileItem;

import explorer.application.service.FileItemService;

@RestController
@RequestMapping(value = "/vListFileItem")
public class ListFileItemController {
	@Autowired
	private FileItemService fileItemService;
	
	@PostMapping("/listFile")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<FileItem> listFileItem(@RequestBody ListFileItemBean lfi){
		return fileItemService.findFileItem(lfi.getIdItem());
	}

}
