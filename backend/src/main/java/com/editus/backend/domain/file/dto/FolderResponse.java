package com.editus.backend.domain.file.dto;

import com.editus.backend.domain.file.entity.Folder;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FolderResponse {

    private Long id;
    private Long projectId;
    private String name;
    private Long parentId;

    public static FolderResponse from(Folder folder) {
        return FolderResponse.builder()
                .id(folder.getId())
                .projectId(folder.getProjectId())
                .name(folder.getName())
                .parentId(folder.getParentId())
                .build();
    }
}