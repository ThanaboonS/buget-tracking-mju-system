package explorer.application.bean;

public class AddPeriodBean {
	private int idProject;
	private int noPeriod;
	private String startPeriod;
	private String endPeriod;
	private double budgetPeriod;
	
	
	public double getBudgetPeriod() {
		return budgetPeriod;
	}
	public void setBudgetPeriod(double budgetPeriod) {
		this.budgetPeriod = budgetPeriod;
	}
	public int getIdProject() {
		return idProject;
	}
	public void setIdProject(int idProject) {
		this.idProject = idProject;
	}
	public int getNoPeriod() {
		return noPeriod;
	}
	public void setNoPeriod(int noPeriod) {
		this.noPeriod = noPeriod;
	}
	public String getStartPeriod() {
		return startPeriod;
	}
	public void setStartPeriod(String startPeriod) {
		this.startPeriod = startPeriod;
	}
	public String getEndPeriod() {
		return endPeriod;
	}
	public void setEndPeriod(String endPeriod) {
		this.endPeriod = endPeriod;
	}
	
}
