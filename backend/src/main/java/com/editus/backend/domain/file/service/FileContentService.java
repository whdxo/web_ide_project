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

    @Transactional
    public UploadUrlResponse createUploadUrl(Long fileId) {
        IdeFile file = ideFileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("파일이 존재하지 않습니다."));

        String contentKey = "projects/" + file.getProjectId() + "/files/" + file.getId();

        String uploadUrl = s3PresignService.presignPut(contentKey);

        file.setContentKey(contentKey); // DB에는 contentKey만 저장

        return UploadUrlResponse.builder()
                .uploadUrl(uploadUrl)
                .contentKey(contentKey)
                .build();
    }

    @Transactional(readOnly = true)
    public DownloadUrlResponse createDownloadUrl(Long fileId) {
        IdeFile file = ideFileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("파일이 존재하지 않습니다."));

        if (file.getContentKey() == null || file.getContentKey().isBlank()) {
            throw new IllegalStateException("아직 업로드된 contentKey가 없습니다.");
        }

        String downloadUrl = s3PresignService.presignGet(file.getContentKey());

        return DownloadUrlResponse.builder()
                .downloadUrl(downloadUrl)
                .build();
    }
}