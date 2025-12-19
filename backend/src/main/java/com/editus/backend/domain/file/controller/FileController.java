package com.editus.backend.domain.file.controller;

import com.editus.backend.domain.file.dto.CreateFileRequest;
import com.editus.backend.domain.file.dto.FileResponse;
import com.editus.backend.domain.file.service.FileTreeService;
import com.editus.backend.domain.file.dto.CreateFolderRequest;
import com.editus.backend.domain.file.dto.FolderResponse;
import com.editus.backend.domain.file.dto.UpdateFileContentRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FileController {

    private final FileTreeService fileTreeService;

    @PostMapping("/projects/{projectId}/files")
    public FileResponse createFile(@PathVariable Long projectId,
                                   @Valid @RequestBody CreateFileRequest req) {
        return fileTreeService.createFile(projectId, req);
    }

    @PostMapping("/projects/{projectId}/folders")
    public FolderResponse createFolder(@PathVariable Long projectId,
                                       @Valid @RequestBody CreateFolderRequest req) {
        return fileTreeService.createFolder(projectId, req);
    }

    @PutMapping("/files/{fileId}")
    public FileResponse updateFileContent(@PathVariable Long fileId,
                                          @Valid @RequestBody UpdateFileContentRequest req) {
        return fileTreeService.updateFileContent(fileId, req);
    }

    @GetMapping("/files/{fileId}")
    public FileResponse getFile(@PathVariable Long fileId) {
        return fileTreeService.getFile(fileId);
    }

    @GetMapping("/projects/{projectId}/tree")
    public FileTreeService.TreeNode getTree(@PathVariable Long projectId) {
        return fileTreeService.getTree(projectId);
    }

    @DeleteMapping("/files/{fileId}")
    public void deleteFile(@PathVariable Long fileId) {
        fileTreeService.deleteFile(fileId);
    }

    @DeleteMapping("/folders/{folderId}")
    public void deleteFolder(@PathVariable Long folderId) {
        fileTreeService.deleteFolder(folderId);
    }
}