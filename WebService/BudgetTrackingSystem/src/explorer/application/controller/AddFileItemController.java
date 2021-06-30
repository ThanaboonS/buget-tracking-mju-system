package explorer.application.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import explorer.application.service.FileItemService;
import explorer.application.service.FileStorageService;
import explorer.application.service.ItemService;
import explorer.application.bean.AddFileItemBean;
import explorer.application.model.FileItem;
import explorer.application.model.Item;
import explorer.application.payload.UploadFileResponse;;

@RestController
@RequestMapping(value="/fileItem")
public class AddFileItemController {
	
	@Autowired
	private ItemService itemService;
	@Autowired
	private FileItemService fileItemService;
	
	@Autowired
	private FileStorageService fileStorageService;
	
	private Item item;
	private FileItem fileItem;
	
	
	public String addFileItem(@RequestBody AddFileItemBean file) {
		item = itemService.viewItem(file.getIdItem());
		fileItem = new FileItem();
		fileItem.setItem(item);
		fileItem.setFileName(file.getFileName());
		fileItemService.saveFileItem(fileItem);
		item.getFileItems().add(fileItem);
		itemService.saveItem(item);
		return "succ fileItem";
	}
	
	@PostMapping("/uploadFile")
	@CrossOrigin(origins = "http://localhost:3000")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file,@RequestParam("idItem") String idItem) {
        Calendar cal = Calendar.getInstance();
        String date = ""+cal.getTime().getTime();
		String fileName = fileStorageService.storeFileItem(file,date,idItem);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/fileProject/downloadFile/")
                .path(fileName)
                .toUriString();
        
        AddFileItemBean addFileItemBean = new AddFileItemBean();
        addFileItemBean.setFileName(fileName);
        addFileItemBean.setIdItem(idItem);
        addFileItem(addFileItemBean);
        
        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @PostMapping("/uploadMultipleFiles")
    @CrossOrigin
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files,@RequestParam("idItem") String idItem) {
        
    	return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file,idItem))
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
            //logger.info("Could not determine file type.");
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
