package com.editus.backend.domain.file.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long projectId;

    @Column(nullable = false)
    private String name;

    // 상위 폴더 (루트면 null)
    private Long parentId;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // 생성 편의 메서드
    public static Folder of(Long projectId, String name, Long parentId) {
        return Folder.builder()
                .projectId(projectId)
                .name(name)
                .parentId(parentId)
                .build();
    }
}