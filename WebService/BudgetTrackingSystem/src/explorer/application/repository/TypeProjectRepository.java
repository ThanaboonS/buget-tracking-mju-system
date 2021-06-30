package explorer.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import explorer.application.model.TypeProject;

@Repository
public interface TypeProjectRepository extends JpaRepository<TypeProject ,Long>{
	@Query("SELECT l FROM TypeProject l WHERE l.nameTypeProject = ?1")
	TypeProject queryTypeProject(String nameTypeProject);
}
