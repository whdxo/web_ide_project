package com.editus.backend.domain.schedule.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TodoUpdateRequest {

    private String content;

    private Boolean completed;

    private LocalDate dueDate;

    @Min(value = 0, message = "우선순위는 0, 1, 2 중 하나여야 합니다")
    @Max(value = 2, message = "우선순위는 0, 1, 2 중 하나여야 합니다")
    private Integer priority;

    private Long projectId;  // 프로젝트 변경 가능
}
