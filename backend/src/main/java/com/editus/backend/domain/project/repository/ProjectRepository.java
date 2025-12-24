package com.editus.backend.domain.project.repository;

import com.editus.backend.domain.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    // 사용자가 소유한 프로젝트 조회
    List<Project> findByOwnerUserId(Long userId);

    // 프로젝트명으로 검색
    List<Project> findByOwnerUserIdAndNameContaining(Long userId, String name);
}
