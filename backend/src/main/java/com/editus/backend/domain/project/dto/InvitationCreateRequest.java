package com.editus.backend.domain.project.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class InvitationCreateRequest {
    private Integer expiresInHours; // Optional, default 24
}
