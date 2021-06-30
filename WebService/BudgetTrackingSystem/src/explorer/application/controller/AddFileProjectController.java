package explorer.application.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import explorer.application.model.FileProject;
import explorer.application.model.Project;
import explorer.application.payload.UploadFileResponse;
import explorer.application.service.FileProjectService;
import explorer.application.service.FileStorageService;
import explorer.application.service.ProjectService;

@RestController
@RequestMapping(value="/fileProject")
public class AddFileProjectController {
	
	 private static final Logger logger = LoggerFactory.getLogger(AddFileProjectController.class);

	 @Autowired
	 private FileStorageService fileStorageService;
	
	@Autowired
	private FileProjectService fileProjectService;
	@Autowired
	private ProjectService projectService; 
	
	@PostMapping("addFileProject")
	@CrossOrigin(origins = "http://localhost:3000")
	public String addFileProject(int idProject,String fileName) {	
		
		Project p = projectService.viewProject(idProject);
		
		FileProject fp = new FileProject();
		fp.setProject(p);
		fp.setNameFile(fileName);		
		fileProjectService.saveFileProject(fp);
		
		p.getFileProjects().add(fp);
		projectService.saveProject(p);
		
		return "succ add file project";
	}
	
	@PostMapping("/uploadFile")
	@CrossOrigin(origins = "http://localhost:3000")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file,@RequestParam("idProject") int idProject) {
        Calendar cal = Calendar.getInstance();
        String date = ""+cal.getTime().getTime();
		String fileName = fileStorageService.storeFile(file,date,idProject);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/fileProject/downloadFile/")
                .path(fileName)
                .toUriString();
        
        addFileProject(idProject,fileName);
        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @PostMapping("/uploadMultipleFiles")
    @CrossOrigin
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files,@RequestParam("idProject") int idProject) {
        
    	return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file,idProject))
                .collect(Collectors.toList());        
    }

    @GetMapping("/downloadFile/{fileName:.+}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

}
