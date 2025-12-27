package com.editus.backend.domain.project.repository;

import com.editus.backend.domain.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    // 사용자가 소유한 프로젝트 조회
    List<Project> findByOwnerUserId(Long userId);

    // 프로젝트명으로 검색
    List<Project> findByOwnerUserIdAndNameContaining(Long userId, String name);

    // 사용자가 멤버로 참여 중인 모든 프로젝트 조회 (본인 소유 포함)
    @Query("SELECT DISTINCT p FROM Project p " +
            "LEFT JOIN ProjectMember pm ON p.projectId = pm.project.projectId " +
            "WHERE p.owner.userId = :userId OR pm.user.userId = :userId")
    List<Project> findAllProjectsByUserId(@Param("userId") Long userId);
}
