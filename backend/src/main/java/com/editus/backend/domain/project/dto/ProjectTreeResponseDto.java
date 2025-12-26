package com.editus.backend.domain.project.dto;

import com.editus.backend.domain.file.dto.FileNodeDto;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class ProjectTreeResponseDto {
    @JsonProperty("projectId")
    private Long projectId;
    private String name;
    @JsonProperty("rootFolders")
    private List<FileNodeDto> rootFolders;

    public ProjectTreeResponseDto(Long projectId, String name, List<FileNodeDto> rootFolders) {
        this.projectId = projectId;
        this.name = name;
        this.rootFolders = rootFolders;
    }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public List<FileNodeDto> getRootFolders() { return rootFolders; }
    public void setRootFolders(List<FileNodeDto> rootFolders) { this.rootFolders = rootFolders; }
}
