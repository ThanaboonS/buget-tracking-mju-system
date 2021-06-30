package explorer.application.bean;

public class AddFileProjectBean {
	private int idProject;
	private String fileName;
    
	public AddFileProjectBean() {}
    public AddFileProjectBean(int idProject,String fileName) {
        this.idProject = idProject;
    	this.fileName = fileName;
        
    }

	public int getIdProject() {
		return idProject;
	}

	public void setIdProject(int idProject) {
		this.idProject = idProject;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}   
    
}
