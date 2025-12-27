package com.editus.backend.domain.schedule.dto.response;

import com.editus.backend.domain.schedule.entity.Todo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoResponse {

    private Long id;
    private String content;
    private Boolean completed;
    private LocalDate dueDate;
    private Integer priority;
    private String priorityLabel; // "LOW", "MEDIUM", "HIGH" (프론트용)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 프론트엔드 호환을 위한 필드
    private String title;  // content와 동일
    private String projectName;  // 프로젝트명 (nullable)
    private Long projectId;  // 프로젝트 ID (nullable)

    public static TodoResponse from(Todo todo) {
        String priorityLabel = switch (todo.getPriority()) {
            case 0 -> "LOW";
            case 2 -> "HIGH";
            default -> "MEDIUM";
        };

        String projectName = null;
        Long projectId = null;
        if (todo.getProject() != null) {
            projectName = todo.getProject().getName();
            projectId = todo.getProject().getProjectId();
        }

        return TodoResponse.builder()
                .id(todo.getId())
                .content(todo.getContent())
                .title(todo.getContent()) // 프론트와 호환
                .completed(todo.getCompleted())
                .dueDate(todo.getDueDate())
                .priority(todo.getPriority())
                .priorityLabel(priorityLabel)
                .projectName(projectName)  // 프로젝트명 추가!
                .projectId(projectId)
                .createdAt(todo.getCreatedAt())
                .updatedAt(todo.getUpdatedAt())
                .build();
    }
}
