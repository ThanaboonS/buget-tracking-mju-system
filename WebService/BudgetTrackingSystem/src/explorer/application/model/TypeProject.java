package explorer.application.model;

import java.util.ArrayList;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;


@Entity
@Table(name = "typeProject")
public class TypeProject {
	
	@Id
	@Column(name="nameTypeProject" , length=50)
	private String nameTypeProject;
	@Transient
	private ArrayList<Project> project = new ArrayList<Project>();
	
	public ArrayList<Project> getProject() {
		return project;
	}
	public void setProject(ArrayList<Project> project) {
		this.project = project;
	}
	
	public String getNameTypeProject() {
		return nameTypeProject;
	}
	public void setNameTypeProject(String nameTypeProject) {
		this.nameTypeProject = nameTypeProject;
	}
	
}
