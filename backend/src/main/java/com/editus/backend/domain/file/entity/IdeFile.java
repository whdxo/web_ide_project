package com.editus.backend.domain.file.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "ide_file")
public class IdeFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long projectId;

    // folderId가 null이면 루트에 파일 생성
    private Long folderId;

    /* ===== 파일 메타데이터 ===== */
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String language;

    @Lob
    @Column(nullable = true)
    private String content;

    @Column(name = "content_key")
    private String contentKey;

    /* ===== 타임스탬프 ===== */
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    /* ===== 비즈니스 메서드 ===== */
    public void updateContent(String content) {
        this.content = content;
    }

    public void updateLanguage(String language) {
        this.language = language;
    }

    public void setContentKey(String contentKey) {
        this.contentKey = contentKey;
    }
}