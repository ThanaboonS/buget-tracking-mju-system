package explorer.application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import explorer.application.bean.QueryProfileBean;
import explorer.application.model.Member;
import explorer.application.service.MemberService;

@RestController
@RequestMapping(value = "/queryMember")
public class QueryMemberController {
	
	@Autowired
	private MemberService memberService;
	
	@PostMapping("/getMember")
	@CrossOrigin(origins = "http://localhost:3000")
	public Member getMember(@RequestBody QueryProfileBean body) {		
		if(memberService.queryProfile(body.getUsername())!=null) {
			return memberService.queryProfile(body.getUsername());
		}else {
			return null;
		}		
	}
}
