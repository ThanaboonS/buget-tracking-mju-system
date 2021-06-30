package explorer.application.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name="FileItem")
public class FileItem {
	
	
	@ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "idItem", nullable = false)
	private Item item;
	
	@Id
	@Column(name="fileName")
	@NotBlank
	private String fileName;
	

	public Item getItem() {
		return item;
	}
	public void setItem(Item item) {
		this.item = item;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

}
