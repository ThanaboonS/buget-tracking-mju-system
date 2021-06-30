package explorer.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import explorer.application.model.Period;

@Repository
public interface PeriodRepository extends JpaRepository<Period,Long>{
	
	@Query("SELECT l FROM Period l WHERE l.idPeriod = ?1")
	Period queryPeriod(int idPeriod);

}
