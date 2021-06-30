package explorer.application.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import explorer.application.model.FileItem;

@Transactional(readOnly = true)
@Repository
public interface FileItemRepository extends JpaRepository<FileItem,Long>{
	
	@Modifying
	@Transactional
	@Query("delete from FileItem i where i.fileName = ?1")
    void deleteFileItem(String fileName);
}
