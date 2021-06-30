package explorer.application.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import explorer.application.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Long>{
	
	
	@Query("SELECT l FROM Project l WHERE l.idProject = ?1")
	Project queryProject(int idProject);
	
	@Query("SELECT l FROM Project l WHERE l.nameProject = ?1")
	Project queryNameProject(String nameProject);
	
	
	@Query(value ="SELECT p FROM Project p WHERE p.nameProject LIKE %:nameProject%")
	List<Project> findByNameProject(@Param("nameProject") String nameProject);
	
	@Query(value ="SELECT DISTINCT durationYear FROM Project")
	List<Integer> queryDuration();
}
