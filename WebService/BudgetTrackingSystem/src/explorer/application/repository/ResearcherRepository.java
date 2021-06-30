package explorer.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import explorer.application.model.Researcher;


@Repository
public interface ResearcherRepository extends JpaRepository<Researcher ,Long>{
	
	
	@Query("SELECT l FROM Researcher l WHERE l.name = ?1")
	Researcher queryNameResearcher(String name);
	
	@Query("SELECT l FROM Researcher l WHERE l.username = ?1")
	Researcher queryResearcher(String username);
}
