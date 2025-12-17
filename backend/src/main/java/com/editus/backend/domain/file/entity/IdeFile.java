package com.editus.backend.domain.file.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "ide_file",
        indexes = {
                @Index(name = "idx_ide_file_project", columnList = "project_id"),
                @Index(name = "idx_ide_file_folder", columnList = "folder_id")
        }
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class IdeFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_id", nullable = false)
    private Long projectId;

    @Column(name = "folder_id", nullable = false)
    private Long folderId;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(length = 50)
    private String language;

    @Lob
    @Column(columnDefinition = "MEDIUMTEXT")
    private String content;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    private void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
        if (this.content == null) this.content = "";
    }

    @PreUpdate
    private void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // 생성 편의 메서드(선택)
    public static IdeFile of(Long projectId, Long folderId, String name, String language) {
        return IdeFile.builder()
                .projectId(projectId)
                .folderId(folderId)
                .name(name)
                .language(language)
                .content("")
                .build();
    }

    public void updateContent(String content) {
        this.content = content;
    }
}