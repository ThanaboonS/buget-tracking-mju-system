package explorer.application.model;


import java.util.Calendar;
import java.util.ArrayList;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
@Table(name = "project")

public class Project {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="idProject")
	private int idProject;
	@Column(name="nameProject",unique=true)
	@NotBlank
	private String nameProject;
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "idTypeProject", nullable = false)
	private TypeProject typeProject;
	@Column(name="dateStartProject")
	@NotNull
	private Calendar dateStartProject;
//	@Column(name="dateEndProject")
//	@NotNull
//	private Calendar dateEndProject;
	@Column(name="budget")
	@NotNull
	private double budget;	
	@Column(name="durationYear")
	@NotNull
	private int durationYear;
	@Column(name="statusProject",length=24)
	@NotBlank
	private String statusProject;
	
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "username", nullable = false)
	private Officer officer;
	


	@Transient
	private ArrayList<ResearcherProject> rsc = new ArrayList<ResearcherProject>();

	@Transient
	private ArrayList<FileProject> fileProjects = new ArrayList<FileProject>();

	@Transient
	private ArrayList<Period> periods = new ArrayList<Period>();	
	
	public ArrayList<ResearcherProject> getRsc() {
		return rsc;
	}
	public void setRsc(ArrayList<ResearcherProject> rsc) {
		this.rsc = rsc;
	}
	public ArrayList<Period> getPeriods() {
		return periods;
	}
	public void setPeriods(ArrayList<Period> periods) {
		this.periods = periods;
	}
	public ArrayList<FileProject> getFileProjects() {
		return fileProjects;
	}
	public void setFileProjects(ArrayList<FileProject> fileProjects) {
		this.fileProjects = fileProjects;
	}
	public Officer getOfficer() {
		return officer;
	}

	public void setOfficer(Officer officer) {
		this.officer = officer;
	}
	
	
	
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="UTC")
	public Calendar getDateStartProject() {
		return dateStartProject;
	}
	public void setDateStartProject(Calendar dateStartProject) {
		this.dateStartProject = dateStartProject;
	}
//	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd,HH:00", timezone="CET")
//	public Calendar getDateEndProject() {
//		return dateEndProject;
//	}
//	public void setDateEndProject(Calendar dateEndProject) {
//		this.dateEndProject = dateEndProject;
//	}
	public double getBudget() {
		return budget;
	}
	public void setBudget(double budget) {
		this.budget = budget;
	}
	public int getIdProject() {
		return idProject;
	}
	public void setIdProject(int idProject) {
		this.idProject = idProject;
	}
	public String getNameProject() {
		return nameProject;
	}
	public void setNameProject(String nameProject) {
		this.nameProject = nameProject;
	}
	public TypeProject getTypeProject() {
		return typeProject;
	}
	public void setTypeProject(TypeProject typeProject) {
		this.typeProject = typeProject;
	}
	
	public int getDurationYear() {
		return durationYear;
	}
	public void setDurationYear(int durationYear) {
		this.durationYear = durationYear;
	}
	public String getStatusProject() {
		return statusProject;
	}
	public void setStatusProject(String statusProject) {
		this.statusProject = statusProject;
	}
	

}
