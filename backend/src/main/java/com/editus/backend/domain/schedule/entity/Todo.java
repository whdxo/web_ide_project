package com.editus.backend.domain.schedule.entity;

import com.editus.backend.domain.auth.entity.User;
import com.editus.backend.domain.project.entity.Project;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "todo")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = true)  // nullable: 개인 todo도 가능
    private Project project;

    @Column(nullable = false, length = 500)
    private String content;

    @Column(nullable = false)
    private Boolean completed = false;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(nullable = false)
    private Integer priority = 1; // 0: 낮음, 1: 보통, 2: 높음

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // 비즈니스 메서드
    public void toggleComplete() {
        this.completed = !this.completed;
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public void updateDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public void updatePriority(Integer priority) {
        if (priority < 0 || priority > 2) {
            throw new IllegalArgumentException("Priority must be 0, 1, or 2");
        }
        this.priority = priority;
    }

    public void updateProject(Project project) {
        this.project = project;
    }
}
