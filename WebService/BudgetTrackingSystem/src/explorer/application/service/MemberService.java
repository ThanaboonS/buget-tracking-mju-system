package explorer.application.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import explorer.application.model.Member;
import explorer.application.repository.MemberRepository;



@Service
public class MemberService {	
	
	
	@Autowired
	private MemberRepository memberRepository;

	public MemberService() {
		
	}
	
//	public Login saveLogin(Login login) {
//		
//		return loginRepository.save(login);
//	}
	
	public List<Member> findAll(){
		return memberRepository.findAll();
	}
	
	public Member checkUser(String username, String password) {
		return memberRepository.checkLogin(username, password);
	}
	
	public Member queryProfile(String username) {
		return memberRepository.queryProfile(username);
	}
	
	
	
	
	
	

}
