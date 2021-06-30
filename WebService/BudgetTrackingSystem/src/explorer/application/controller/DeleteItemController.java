package explorer.application.controller;
import explorer.application.bean.DeleteItemBean;
import explorer.application.model.FileItem;
import explorer.application.service.FileItemService;
import explorer.application.service.ItemService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/vDeleteItem")
public class DeleteItemController {
	@Autowired 
	private ItemService itemService;
	@Autowired
	private FileItemService fileItemService;
	@PostMapping("/deleteITem")
	@CrossOrigin(origins = "http://localhost:3000")
	public void deleteItem(@RequestBody DeleteItemBean deleteItemBean) {
		
		for(FileItem l:fileItemService.findFileItem(deleteItemBean.getIdItem())) {
			fileItemService.deleteFileItem(l.getFileName());
		}
		itemService.deleteItem(deleteItemBean.getIdItem());
	}
}
