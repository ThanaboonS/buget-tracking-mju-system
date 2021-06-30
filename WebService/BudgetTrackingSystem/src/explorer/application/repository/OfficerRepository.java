package explorer.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import explorer.application.model.Officer;



@Repository
public interface OfficerRepository extends JpaRepository<Officer, Long> {
	
}
