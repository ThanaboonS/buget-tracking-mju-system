package explorer.application.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import explorer.application.model.FileProject;


@Transactional(readOnly = true)
@Repository
public interface FileProjectRepository extends JpaRepository<FileProject,Long>{
	
	

	@Modifying
	@Transactional
	@Query("delete from FileProject i where i.nameFile = ?1")
    void deleteFileProject(String nameFileProject);
}
