package com.editus.backend.domain.file.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class TreeNodeResponse {

    private String type;
    private Long id;
    private Long parentId;
    private String name;

    // 파일만 사용 (폴더는 null)
    private String language;

    @Builder.Default
    private List<TreeNodeResponse> children = new ArrayList<>();
}