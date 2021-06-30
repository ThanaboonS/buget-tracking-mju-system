package explorer.application.model;

import java.util.Calendar;
import java.util.ArrayList;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="item")
public class Item {
	@Id
	@Length(max = 24)
	private String idItem;	
	@ManyToOne(cascade=CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "idPeriod", nullable = false)
	private Period period;
	@Column(name="dateBook")
	@NotNull
	private Calendar dateBook;
	@Column(name="titleItem",length = 100)
	@NotBlank
	private String titleItem;
	@Column(name="budgetItem")
	@NotNull
	private double budgetItem;
	@Column(name="startItem")
	@NotNull	
	private Calendar startItem;
	@Column(name="endItem")
	@NotNull
	private Calendar endItem;	
	@Column(name="detail",columnDefinition="TEXT")
	@NotBlank
	private String detail;
	@Transient	
	private ArrayList<FileItem> fileItems = new ArrayList<FileItem>();
	
	public ArrayList<FileItem> getFileItems() {
		return fileItems;
	}
	public void setFileItems(ArrayList<FileItem> fileItems) {
		this.fileItems = fileItems;
	}
	public String getIdItem() {
		return idItem;
	}
	public void setIdItem(String idItem) {
		this.idItem = idItem;
	}
	public Period getPeriod() {
		return period;
	}
	public void setPeriod(Period period) {
		this.period = period;
	}
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="UTC")
	public Calendar getDateBook() {
		return dateBook;
	}
	public void setDateBook(Calendar dateBook) {
		this.dateBook = dateBook;
	}
	public String getTitleItem() {
		return titleItem;
	}
	public void setTitleItem(String titleItem) {
		this.titleItem = titleItem;
	}
	public double getBudgetItem() {
		return budgetItem;
	}
	public void setBudgetItem(double budgetItem) {
		this.budgetItem = budgetItem;
	}
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="UTC")
	public Calendar getStartItem() {
		return startItem;
	}
	public void setStartItem(Calendar startItem) {
		this.startItem = startItem;
	}
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="UTC")
	public Calendar getEndItem() {
		return endItem;
	}
	public void setEndItem(Calendar endItem) {
		this.endItem = endItem;
	}
	
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	
}
