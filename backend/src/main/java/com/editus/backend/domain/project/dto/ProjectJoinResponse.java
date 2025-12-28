package com.editus.backend.domain.project.dto;

import com.editus.backend.domain.project.entity.Project;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProjectJoinResponse {
    private Project project;
    private boolean success;
}
