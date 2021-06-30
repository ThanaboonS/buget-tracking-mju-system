package explorer.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import explorer.application.bean.ViewItemBean;
import explorer.application.model.Item;
import explorer.application.service.ItemService;

@RestController
@RequestMapping(value = "/viewItemDetail")
public class ViewItemDetailController {

	@Autowired
	private ItemService itemService;
	
	@PostMapping("/getItemDetail")
	@CrossOrigin(origins = "http://localhost:3000")
	public Item getItemDetail(@RequestBody ViewItemBean v) {
		return itemService.viewItem(v.getIdItem());
	}
}
