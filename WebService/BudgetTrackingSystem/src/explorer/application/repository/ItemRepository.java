package explorer.application.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import explorer.application.model.Item;

@Transactional(readOnly = true)
@Repository
public interface ItemRepository extends JpaRepository<Item,Long>{
	
	@Query("SELECT l FROM Item l WHERE l.idItem = ?1")
	Item queryItem(String idItem);
	
	@Modifying
	@Transactional
	@Query("delete from Item i where i.idItem = ?1")
    void deleteItem(String idItem);
}
