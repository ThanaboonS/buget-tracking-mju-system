package explorer.application.controller;


import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.bean.AddItemBean;
import explorer.application.model.Item;
import explorer.application.model.Period;
import explorer.application.service.ItemService;
import explorer.application.service.PeriodService;


@RestController
@RequestMapping(value = "/vaddItem")
public class AddItemController {
	@Autowired
	private PeriodService periodService;
	@Autowired
	private ItemService itemService;
	
	private Item item;
	@PostMapping("/additem")
	@CrossOrigin(origins = "http://localhost:3000")
	public String addItem(@RequestBody AddItemBean i) {
		
		Period p = periodService.viewPeriod(i.getIdPeriod());
		
		String[] dateBookItem = i.getDateBook().split("-");
		int yearBookd = Integer.parseInt(dateBookItem[0])+543;
		int monthBookd = Integer.parseInt(dateBookItem[1])-1;
		int dateBookdd = Integer.parseInt(dateBookItem[2]);
		Calendar dateBook = Calendar.getInstance();
		dateBook.set(yearBookd, monthBookd, dateBookdd);
		System.out.println(dateBookdd+"-----date");

		String[] dateStartItemd = i.getStartItem().split("-");
		int yearStart = Integer.parseInt(dateStartItemd[0])+543;
		int monthStart = Integer.parseInt(dateStartItemd[1])-1;
		int dateStart = Integer.parseInt(dateStartItemd[2]);
		Calendar startItem = Calendar.getInstance();
		startItem.set(yearStart, monthStart, dateStart);
		
		
		String[] endItemd = i.getEndItem().split("-");
		int yearEnd = Integer.parseInt(endItemd[0])+543;
		int monthEnd = Integer.parseInt(endItemd[1])-1;
		int dateEnd = Integer.parseInt(endItemd[2]);
		Calendar endItem = Calendar.getInstance();
		endItem.set(yearEnd, monthEnd, dateEnd);
		
		
		item = new Item();
		item.setIdItem(i.getIdItem());
		item.setPeriod(p);
		item.setDateBook(dateBook);
		item.setTitleItem(i.getTitleItem());
		item.setBudgetItem(i.getBudgetItem());
		item.setStartItem(startItem);
		item.setEndItem(endItem);		
		item.setDetail(i.getDetail());
		
		itemService.saveItem(item);
		p.getItem().add(item);
		periodService.savePeriod(p);
		
		
		return "succ item";
	}
	
}
