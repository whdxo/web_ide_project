package com.editus.backend.domain.schedule.repository;

import com.editus.backend.domain.schedule.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    // 사용자별 Todo 조회
    List<Todo> findByUserUserId(Long userId);

    // 사용자별 + 프로젝트별 조회
    List<Todo> findByUserUserIdAndProjectProjectId(Long userId, Long projectId);

    // 사용자별 + 프로젝트 없는 개인 todo 조회
    List<Todo> findByUserUserIdAndProjectIsNull(Long userId);

    // 사용자별 완료 여부로 필터링
    List<Todo> findByUserUserIdAndCompleted(Long userId, Boolean completed);

    // 사용자별 특정 날짜의 Todo 조회
    List<Todo> findByUserUserIdAndDueDate(Long userId, LocalDate dueDate);

    // 사용자별 날짜 범위로 조회
    List<Todo> findByUserUserIdAndDueDateBetween(Long userId, LocalDate startDate, LocalDate endDate);

    // 우선순위별 조회
    List<Todo> findByUserUserIdAndPriority(Long userId, Integer priority);
}
