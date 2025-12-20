package com.editus.backend.domain.schedule.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TodoCreateRequest {

    @NotBlank(message = "Todo 내용은 필수입니다")
    private String content;

    private LocalDate dueDate;

    @Min(value = 0, message = "우선순위는 0, 1, 2 중 하나여야 합니다")
    @Max(value = 2, message = "우선순위는 0, 1, 2 중 하나여야 합니다")
    private Integer priority = 1;

    private Long projectId;  // nullable: 프로젝트 없으면 개인 todo
}
