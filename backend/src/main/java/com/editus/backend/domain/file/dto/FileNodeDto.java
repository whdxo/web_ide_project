package com.editus.backend.domain.file.dto;

import java.util.List;

public class FileNodeDto {
    private Long id;
    private String name;
    private String type; // "FILE" or "FOLDER"
    private List<FileNodeDto> children;

    public FileNodeDto(Long id, String name, String type, List<FileNodeDto> children) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.children = children;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public List<FileNodeDto> getChildren() { return children; }
    public void setChildren(List<FileNodeDto> children) { this.children = children; }
}
