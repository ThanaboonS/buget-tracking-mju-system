package explorer.application.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import explorer.application.model.Project;
import explorer.application.model.Researcher;
import explorer.application.model.ResearcherProject;


@Repository
public interface ResearcherProjectRepository extends JpaRepository<ResearcherProject,Long>{
	
	@Query("select re from ResearcherProject re where re.researcherProjectPK.project = :project")
    List<ResearcherProject> findByProject(@Param("project") Project project);

	@Query("select pr from ResearcherProject pr where pr.researcherProjectPK.researcher = :researcher")
    List<ResearcherProject> findByResearcher(@Param("researcher") Researcher researcher);
	
	@Modifying
    @Transactional
    @Query(value = "DELETE FROM researcher_project WHERE project_id_project = :project_id_project and researcher_username = :researcher_username" , nativeQuery = true)
    void deleteResearcherInProject(@Param("project_id_project") int project_id_project ,@Param("researcher_username") String researcher_username);
}
