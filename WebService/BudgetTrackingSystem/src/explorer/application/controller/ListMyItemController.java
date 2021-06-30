package explorer.application.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.model.Item;
import explorer.application.model.Period;
import explorer.application.service.ItemService;

@RestController
@RequestMapping(value = "/vlistItem")
public class ListMyItemController {
	ArrayList<Item> myItem;
	
	@Autowired
	private ItemService itemService;
	
	public List<Item> ListAllItem(){
		return itemService.findAll();
	}
	@PostMapping("/listMyItem")
	@CrossOrigin(origins = "http://localhost:3000")
	public List<Item> ListMyItem(@RequestBody Period p){
		myItem = new ArrayList<Item>();
		for(Item items : ListAllItem()) {
			if(items.getPeriod().getIdPeriod()==p.getIdPeriod()) {
				myItem.add(items);
				System.out.println("item value date "+items.getDateBook().get(Calendar.DAY_OF_MONTH));			
				System.out.println("-----d---"+items.getDateBook().getTime());
			}
		}
		return myItem;
	}
	@PostMapping("/sumMyItem")
	@CrossOrigin(origins = "http://localhost:3000")
	public double sumMyItem(@RequestBody Period p){
		double total = 0;
		for(Item items : ListAllItem()) {
			if(items.getPeriod().getIdPeriod()==p.getIdPeriod()) {
				total+=items.getBudgetItem();
			}
		}
		return total;
	}
	
	
	
}
