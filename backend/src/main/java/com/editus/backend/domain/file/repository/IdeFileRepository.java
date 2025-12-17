package com.editus.backend.domain.file.repository;

import com.editus.backend.domain.file.entity.IdeFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IdeFileRepository extends JpaRepository<IdeFile, Long> {
    List<IdeFile> findByProjectId(Long projectId);
    List<IdeFile> findByFolderId(Long folderId);
    long countByFolderId(Long folderId);
}