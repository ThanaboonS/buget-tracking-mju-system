package explorer.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import explorer.application.model.Member;


@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {
	
	@Query("SELECT l FROM Member l WHERE l.username = ?1 AND l.password =?2")
	Member checkLogin(String username,String password);
	
	@Query("SELECT l FROM Member l WHERE l.username = ?1")
	Member queryProfile(String username);
	
	
	
}
