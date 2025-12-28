package com.editus.backend.domain.project.repository;

import com.editus.backend.domain.auth.entity.User;
import com.editus.backend.domain.project.entity.Project;
import com.editus.backend.domain.project.entity.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Long> {

    boolean existsByProjectAndUser(Project project, User user);

    List<ProjectMember> findByProject(Project project);

    void deleteByProjectAndUser(Project project, User user);

    @Query("SELECT pm FROM ProjectMember pm JOIN FETCH pm.user WHERE pm.project.projectId = :projectId")
    List<ProjectMember> findByProjectIdWithUser(@Param("projectId") Long projectId);
}
