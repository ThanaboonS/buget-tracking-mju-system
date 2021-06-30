package explorer.application.model;

import java.util.ArrayList;
import java.util.Calendar;



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



import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="period")
public class Period {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="idPeriod")	
	private int idPeriod;
	
	@Column(name="noPeriod")
	@NotNull
	private int noPeriod;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "idProject", nullable = false)
	private Project project;
	
	@Transient
	private ArrayList<Item> item = new ArrayList<Item>();
	
	
	@Column(name="budgetPeriod")
	@NotNull
	private double budgetPeriod;
	@Column(name="startPeriod")
	@NotNull
	
	private Calendar startPeriod;
	@Column(name="endPeriod")
	@NotNull
	private Calendar endPeriod;
	
	
	
	
	public int getNoPeriod() {
		return noPeriod;
	}
	public void setNoPeriod(int noPeriod) {
		this.noPeriod = noPeriod;
	}
	public ArrayList<Item> getItem() {
		return item;
	}
	public void setItem(ArrayList<Item> item) {
		this.item = item;
	}

	public Project getProject() {
		return project;
	}
	public void setProject(Project project) {
		this.project = project;
	}
	public int getIdPeriod() {
		return idPeriod;
	}
	public void setIdPeriod(int idPeriod) {
		this.idPeriod = idPeriod;
	}
	public double getBudgetPeriod() {
		return budgetPeriod;
	}
	public void setBudgetPeriod(double budgetPeriod) {
		this.budgetPeriod = budgetPeriod;
	}
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="UTC")
	public Calendar getStartPeriod() {
		return startPeriod;
	}
	public void setStartPeriod(Calendar startPeriod) {
		this.startPeriod = startPeriod;
	}
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="UTC")
	public Calendar getEndPeriod() {
		return endPeriod;
	}
	public void setEndPeriod(Calendar endPeriod) {
		this.endPeriod = endPeriod;
	}
	

}
