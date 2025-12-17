package com.editus.backend.domain.file.dto;

import com.editus.backend.domain.file.entity.IdeFile;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class FileResponse {
    private Long id;
    private Long projectId;
    private Long folderId;
    private String name;
    private String language;
    private String content;
    private LocalDateTime updatedAt;

    public static FileResponse from(IdeFile f) {
        return FileResponse.builder()
                .id(f.getId())
                .projectId(f.getProjectId())
                .folderId(f.getFolderId())
                .name(f.getName())
                .language(f.getLanguage())
                .content(f.getContent())
                .updatedAt(f.getUpdatedAt())
                .build();
    }
}