package explorer.application.bean;

import explorer.application.model.Project;

public class AddProjectAndSetPeriodBean {
	private String username;
	private String nameProject;
	private String nameTypeProject;
	private String reader;
	private double budget;	
	private int durationYear;
	private String statusProject;
	private String getUsername() {
		return username;
	}
	private void setUsername(String username) {
		this.username = username;
	}
	private String getNameProject() {
		return nameProject;
	}
	private void setNameProject(String nameProject) {
		this.nameProject = nameProject;
	}
	private String getNameTypeProject() {
		return nameTypeProject;
	}
	private void setNameTypeProject(String nameTypeProject) {
		this.nameTypeProject = nameTypeProject;
	}
	private String getReader() {
		return reader;
	}
	private void setReader(String reader) {
		this.reader = reader;
	}
	private double getBudget() {
		return budget;
	}
	private void setBudget(double budget) {
		this.budget = budget;
	}
	private int getDurationYear() {
		return durationYear;
	}
	private void setDurationYear(int durationYear) {
		this.durationYear = durationYear;
	}
	private String getStatusProject() {
		return statusProject;
	}
	private void setStatusProject(String statusProject) {
		this.statusProject = statusProject;
	}
	private String getStartProject() {
		return startProject;
	}
	private void setStartProject(String startProject) {
		this.startProject = startProject;
	}
	private String startProject;
	
	
	
}
