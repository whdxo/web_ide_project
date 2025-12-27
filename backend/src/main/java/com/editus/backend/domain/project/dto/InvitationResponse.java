package com.editus.backend.domain.project.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class InvitationResponse {
    private String invitationUrl;
    private String code;
    private LocalDateTime expiresAt;
}

