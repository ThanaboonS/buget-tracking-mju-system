package explorer.application.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name = "member")
@Inheritance(strategy=InheritanceType.JOINED)
public class Member  {
	
	@Id
	@Column(name="username",length=24)
	private String username;
	
	@Column(name="password",length=24)
	@NotBlank
	private String password;
	@Column(name="typeUser",length=10)
	@NotBlank
	private String typeUser;	
	
	@Column(name="name",length=100)
	@NotBlank
	private String name;	
	@Column(name="address")
	@NotBlank
	private String address;	
	@Column(name="tel",length=10)
	@NotBlank
	private String tel;	
	@Column(name="email",length=100,unique=true)
	@NotBlank
	private String email;	
	@Column(name="idCard",length = 13,unique=true)
	@NotNull
	private String idCard;
	@Column(name="idLine",length = 24)	
	private String idLine;
	
	public Member() {}
	
	
	
	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public String getAddress() {
		return address;
	}



	public void setAddress(String address) {
		this.address = address;
	}



	public String getTel() {
		return tel;
	}



	public void setTel(String tel) {
		this.tel = tel;
	}



	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public String getIdCard() {
		return idCard;
	}



	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}



	public String getIdLine() {
		return idLine;
	}



	public void setIdLine(String idLine) {
		this.idLine = idLine;
	}



	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getTypeUser() {
		return typeUser;
	}
	public void setTypeUser(String typeUser) {
		this.typeUser = typeUser;
	}
	
	
	
}
