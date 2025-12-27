package com.editus.backend.domain.file.repository;

import com.editus.backend.domain.file.entity.IdeFile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface IdeFileRepository extends JpaRepository<IdeFile, Long> {
    List<IdeFile> findByProjectId(Long projectId);

    Optional<IdeFile> findByProjectIdAndFolderIdAndName(
            Long projectId,
            Long folderId,
            String name
    );

    boolean existsByFolderId(Long folderId);
    boolean existsByProjectIdAndFolderIdAndName(
            Long projectId,
            Long folderId,
            String name)
            ;
}