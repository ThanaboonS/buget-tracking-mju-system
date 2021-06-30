package explorer.application.bean;

public class EditProjectBean {
	private int idProject;
	private int durationYear;
	private double budget;
	private String typeProject;
	private String nameProject;
	private String dateStartProject;
	
	
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
	public int getDurationYear() {
		return durationYear;
	}
	public void setDurationYear(int durationYear) {
		this.durationYear = durationYear;
	}
	public String getTypeProject() {
		return typeProject;
	}
	public void setTypeProject(String typeProject) {
		this.typeProject = typeProject;
	}
	public String getNameProject() {
		return nameProject;
	}
	public void setNameProject(String nameProject) {
		this.nameProject = nameProject;
	}
	public String getDateStartProject() {
		return dateStartProject;
	}
	public void setDateStartProject(String dateStartProject) {
		this.dateStartProject = dateStartProject;
	}


	
	
}
