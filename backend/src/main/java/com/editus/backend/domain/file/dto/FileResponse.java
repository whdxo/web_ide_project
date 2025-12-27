package com.editus.backend.domain.file.dto;

import com.editus.backend.domain.file.entity.IdeFile;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FileResponse {

    private Long id;
    private Long folderId;
    private String name;
    private String language;
    private String content;

    public static FileResponse from(IdeFile file) {
        return FileResponse.builder()
                .id(file.getId())
                .folderId(file.getFolderId())
                .name(file.getName())
                .language(file.getLanguage())
                .content(file.getContent())
                .build();
    }
}