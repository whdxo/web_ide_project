package com.editus.backend.domain.file.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CreateFileRequest {

    private String name;

    private Long folderId;

    private String language;
}