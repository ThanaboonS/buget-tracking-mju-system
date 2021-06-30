package explorer.application.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import explorer.application.model.Item;
import explorer.application.repository.ItemRepository;

@Service
public class ItemService {
	@Autowired
	private ItemRepository itemRepository;
	
	public ItemService() {}
	
	public Item saveItem(Item i) {
		return itemRepository.save(i);
	}
	public List<Item> findAll(){
		return itemRepository.findAll(sortByIdAsc());
	}
	private Sort sortByIdAsc() {
        return new Sort(Sort.Direction.DESC, "dateBook");
    }
	public Item viewItem(String idItem) {
		return itemRepository.queryItem(idItem);
	}
	public void deleteItem(String idItem) {
		itemRepository.deleteItem(idItem);
		System.out.println("delete succ");
	}
}
