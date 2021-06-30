package explorer.application.model;

import java.util.ArrayList;

import javax.persistence.*;

import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name = "researcher")
@PrimaryKeyJoinColumn(name = "username")
public class Researcher extends Member {

	@Column(name = "faculty",length=100)
	@NotBlank
	private String faculty;
	@Column(name = "major",length=100)
	@NotBlank
	private String major;

	// @OneToMany(mappedBy = "researcher")
//	@JoinColumn(name = "username", nullable = false)	
	@Transient
	private ArrayList<ResearcherProject> rsc = new ArrayList<ResearcherProject>();

	public ArrayList<ResearcherProject> getRsc() {
		return rsc;
	}

	public void setRsc(ArrayList<ResearcherProject> rsc) {
		this.rsc = rsc;
	}

	public String getFaculty() {
		return faculty;
	}

	public void setFaculty(String faculty) {
		this.faculty = faculty;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

}
