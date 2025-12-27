package com.editus.backend.domain.project.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ProjectMemberResponse {
    private Long userId;
    private String name;
    private String email;
    private LocalDateTime joinedAt;
    // private boolean isOwner; // Frontend uses role now
    private String role; // "OWNER", "EDITOR", "USER"
}
