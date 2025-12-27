package com.editus.backend.domain.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreateProjectRequest {
    private String name;
    private String description;
    
    @JsonProperty("owner_id")
    private Long ownerId;
    
    @JsonProperty("project_type")
    private String projectType; // PERSONAL, TEAM
}
