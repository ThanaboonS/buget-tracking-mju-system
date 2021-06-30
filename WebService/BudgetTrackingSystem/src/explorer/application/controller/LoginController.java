package explorer.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import explorer.application.model.Member;
import explorer.application.service.MemberService;






@RestController
@RequestMapping(value = "/vlog")
public class LoginController {	

	@Autowired
	private MemberService memberService;	
	

//	@GetMapping("/query")
//	@CrossOrigin(origins = "http://localhost:3000")
//	public List<Member> getUsers(){
//		return memberService.findAll();
//	}
	
	@PostMapping("/login")
	@CrossOrigin(origins = "http://localhost:3000")
	public Member checkLogin(@RequestBody Member member) {
		if(memberService.checkUser(member.getUsername(), member.getPassword())!=null) {
			return memberService.checkUser(member.getUsername(), member.getPassword());
		}else {
			return null;
		}
	}
	
	
	
	
	
	

}
