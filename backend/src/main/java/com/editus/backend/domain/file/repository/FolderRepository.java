package com.editus.backend.domain.file.repository;

import com.editus.backend.domain.file.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FolderRepository extends JpaRepository<Folder, Long> {
    List<Folder> findByProjectId(Long projectId);

    boolean existsByParentId(Long parentId);

    boolean existsByProjectIdAndParentIdAndName(
            Long projectId,
            Long parentId,
            String name);

    // 프로젝트 삭제 시 폴더 삭제
    void deleteByProjectId(Long projectId);
}