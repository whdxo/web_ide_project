package com.editus.backend.domain.file.service;

import com.editus.backend.domain.file.dto.CreateFileRequest;
import com.editus.backend.domain.file.dto.FileResponse;
import com.editus.backend.domain.file.entity.IdeFile;
import com.editus.backend.domain.file.repository.FolderRepository;
import com.editus.backend.domain.file.repository.IdeFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FileService {

    private final IdeFileRepository ideFileRepository;
    private final FolderRepository folderRepository;

    @Transactional
    public FileResponse createFile(Long projectId, CreateFileRequest req) {

        //테스트용
        if (req.getName() == null || req.getName().isBlank()) {
            throw new IllegalArgumentException("파일명(name)은 필수입니다.");
        }
        if (req.getFolderId() == null) {
            throw new IllegalArgumentException("folderId는 필수입니다.");
        }

        // 폴더 존재 여부 체크(최소 안전장치)
        folderRepository.findById(req.getFolderId())
                .orElseThrow(() -> new IllegalArgumentException("폴더가 존재하지 않습니다."));

        IdeFile file = IdeFile.of(projectId, req.getFolderId(), req.getName(), req.getLanguage());
        IdeFile saved = ideFileRepository.save(file);

        return FileResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public FileResponse getFile(Long fileId) {
        IdeFile file = ideFileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("파일이 존재하지 않습니다."));

        return FileResponse.from(file);
    }
}