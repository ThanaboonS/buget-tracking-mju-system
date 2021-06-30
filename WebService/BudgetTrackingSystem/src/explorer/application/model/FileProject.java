package explorer.application.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name="FileProject")
public class FileProject {
	
	
	@Id
	@Column(name="nameFileProject")
	@NotBlank
	private String nameFile;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="idProject")
	@NotNull
	private Project project;
	
	
	public String getNameFile() {
		return nameFile;
	}

	public void setNameFile(String nameFile) {
		this.nameFile = nameFile;
	}
	
	 public Project getProject() {
		 return project;
	 }
	 public void setProject(Project project) {
		 this.project=project;
	 }

}
