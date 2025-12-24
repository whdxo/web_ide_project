package com.editus.backend.domain.file.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class TreeResponse {
    private Long projectId;
    private List<TreeNodeResponse> nodes;
}