package com.editus.backend.domain.project.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class InvitationInfoResponse {
    private String projectName;
    private String inviterName;
    private LocalDateTime expiresAt;
}
