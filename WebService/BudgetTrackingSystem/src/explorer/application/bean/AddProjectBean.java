package explorer.application.bean;

import java.util.ArrayList;

import explorer.application.model.Period;

public class AddProjectBean {
	private String username;

	private String nameProject;
	private String nameTypeProject;
	private String reader;
	private double budget;
	private int durationYear;
	private String statusProject;
	private String startProject;
	private ArrayList<Period> periodArray;

	public ArrayList<Period> getPeriodArray() {
		return periodArray;
	}

	public void setPeriodArray(ArrayList<Period> periodArray) {
		this.periodArray = periodArray;
	}

	public String getStartProject() {
		return startProject;
	}

	

	public void setNameTypeProject(String nameTypeProject) {
		this.nameTypeProject = nameTypeProject;
	}

	public void setStartProject(String startProject) {
		this.startProject = startProject;
	}

	public String getReader() {
		return reader;
	}

	public void setReader(String reader) {
		this.reader = reader;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getNameProject() {
		return nameProject;
	}

	public void setNameProject(String nameProject) {
		this.nameProject = nameProject;
	}

	public String getNameTypeProject() {
		return nameTypeProject;
	}

	public void setIdTypeProject(String nameTypeProject) {
		this.nameTypeProject = nameTypeProject;
	}

	public double getBudget() {
		return budget;
	}

	public void setBudget(double budget) {
		this.budget = budget;
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
