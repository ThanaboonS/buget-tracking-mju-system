package explorer.application.model;


import java.util.ArrayList;

import javax.persistence.*;
import javax.validation.constraints.NotNull;





@Entity
@Table(name="officer")
@PrimaryKeyJoinColumn(name="username")
public class Officer extends Member{
	@Column(length=100)
	@NotNull
	private String position;
	public Officer() {
		super();
	}

	

	@Transient
	private ArrayList<Project> projects = new ArrayList<Project>();
	
	public ArrayList<Project> getProjects() {
		return projects;
	}
	public void setProjects(ArrayList<Project> projects) {
		this.projects = projects;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	
	

	
	

}
