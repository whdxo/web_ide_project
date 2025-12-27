package com.editus.backend.domain.file.service;

import com.editus.backend.domain.file.dto.DownloadUrlResponse;
import com.editus.backend.domain.file.dto.UploadUrlResponse;
import com.editus.backend.domain.file.entity.IdeFile;
import com.editus.backend.domain.file.repository.IdeFileRepository;
import com.editus.backend.infra.s3.S3PresignService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class FileContentService {

    private final IdeFileRepository ideFileRepository;
    private final S3PresignService s3PresignService;

    public UploadUrlResponse uploadUrl(Long fileId) {
        IdeFile file = ideFileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("파일이 존재하지 않습니다."));

        if (file.getContentKey() == null || file.getContentKey().isBlank()) {
            String key = "projects/%d/files/%d/content"
                    .formatted(file.getProjectId(), file.getId());
            file.setContentKey(key);
        }

        String uploadUrl = s3PresignService.presignPut(file.getContentKey());
        return new UploadUrlResponse(file.getId(), file.getContentKey(), uploadUrl);
    }

    @Transactional(readOnly = true)
    public DownloadUrlResponse downloadUrl(Long fileId) {
        IdeFile file = ideFileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("파일이 존재하지 않습니다."));

        if (file.getContentKey() == null || file.getContentKey().isBlank()) {
            throw new IllegalStateException("파일이 아직 S3에 저장되지 않았습니다.");
        }

        String downloadUrl = s3PresignService.presignGet(file.getContentKey());
        return new DownloadUrlResponse(file.getId(), downloadUrl);
    }
}