package com.editus.backend.domain.file.service;

import com.editus.backend.domain.file.dto.CreateFileRequest;
import com.editus.backend.domain.file.dto.FileResponse;
import com.editus.backend.domain.file.dto.UpdateFileContentRequest;
import com.editus.backend.domain.file.entity.Folder;
import com.editus.backend.domain.file.entity.IdeFile;
import com.editus.backend.domain.file.repository.FolderRepository;
import com.editus.backend.domain.file.repository.IdeFileRepository;
import com.editus.backend.domain.file.dto.CreateFolderRequest;
import com.editus.backend.domain.file.dto.FolderResponse;
import com.editus.backend.domain.file.entity.Folder;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FileTreeService {

    private final FolderRepository folderRepository;
    private final IdeFileRepository ideFileRepository;

    // 1) File CRUD
    // 파일 생성
    @Transactional
    public FileResponse createFile(Long projectId, CreateFileRequest req) {

        // 부모 폴더 존재 확인
        Folder folder = folderRepository.findById(req.getFolderId())
                .orElseThrow(() -> new IllegalArgumentException("폴더가 존재하지 않습니다."));

        // projectId 일치 검증
        if (!Objects.equals(folder.getProjectId(), projectId)) {
            throw new IllegalArgumentException("해당 프로젝트의 폴더가 아닙니다.");
        }

        IdeFile file = IdeFile.builder()
                .projectId(projectId)
                .folderId(req.getFolderId())
                .name(req.getName())
                .language(req.getLanguage())
                .content(req.getContent() == null ? "" : req.getContent())
                .build();

        IdeFile saved = ideFileRepository.save(file);
        return FileResponse.from(saved);
    }

    // 파일 조회
    @Transactional(readOnly = true)
    public FileResponse getFile(Long fileId) {

        IdeFile file = ideFileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("파일이 존재하지 않습니다."));

        return FileResponse.from(file);
    }

     // 파일 내용 저장(수정)
    @Transactional
    public FileResponse updateFileContent(Long fileId, UpdateFileContentRequest req) {
        IdeFile file = ideFileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("파일이 존재하지 않습니다."));

        // JPA 변경감지(Dirty Checking)
        file.updateContent(req.getContent());

        return FileResponse.from(file);
    }


    // 파일 삭제
    @Transactional
    public void deleteFile(Long fileId) {
        if (!ideFileRepository.existsById(fileId)) {
            throw new IllegalArgumentException("파일이 존재하지 않습니다.");
        }
        ideFileRepository.deleteById(fileId);
    }


    // 2) Folder CRUD

    /*  폴더 생성
     * - parentId가 있으면 부모 폴더 존재 + 같은 프로젝트인지 확인
     */
    @Transactional
    public FolderResponse createFolder(Long projectId, CreateFolderRequest req) {

        Long parentId = req.getParentId();

        if (parentId != null) {
            Folder parent = folderRepository.findById(parentId)
                    .orElseThrow(() -> new IllegalArgumentException("부모 폴더가 존재하지 않습니다."));

            if (!Objects.equals(parent.getProjectId(), projectId)) {
                throw new IllegalArgumentException("해당 프로젝트의 폴더가 아닙니다.");
            }
        }

        Folder folder = Folder.of(projectId, req.getName(), parentId);
        Folder saved = folderRepository.save(folder);
        return FolderResponse.from(saved);
    }

     // 폴더 삭제
    @Transactional
    public void deleteFolder(Long folderId) {

        Folder folder = folderRepository.findById(folderId)
                .orElseThrow(() -> new IllegalArgumentException("폴더가 존재하지 않습니다."));

        boolean hasChildFolder = folderRepository.existsByParentId(folderId);
        if (hasChildFolder) {
            throw new IllegalStateException("하위 폴더가 있어 삭제할 수 없습니다.");
        }

        boolean hasFile = ideFileRepository.existsByFolderId(folderId);
        if (hasFile) {
            throw new IllegalStateException("폴더 안에 파일이 있어 삭제할 수 없습니다.");
        }

        folderRepository.delete(folder);
    }


    /*  3) Tree 조회
    프로젝트 트리 조회
      - Folder + File 전체를 가져와 트리 JSON으로 조립
      */
    @Transactional(readOnly = true)
    public TreeNode getTree(Long projectId) {

        List<Folder> folders = folderRepository.findByProjectId(projectId);
        List<IdeFile> files = ideFileRepository.findByProjectId(projectId);

        Map<Long, TreeNode> folderNodeMap = new HashMap<>();
        for (Folder f : folders) {
            folderNodeMap.put(f.getId(),
                    TreeNode.folder(f.getId(), f.getName(), f.getParentId()));
        }

        TreeNode root = TreeNode.root(projectId);

        // 폴더 연결
        for (Folder f : folders) {
            TreeNode node = folderNodeMap.get(f.getId());
            if (f.getParentId() == null) {
                root.children.add(node);
            } else {
                TreeNode parent = folderNodeMap.get(f.getParentId());
                if (parent != null) parent.children.add(node);
                else root.children.add(node); // 안전장치
            }
        }

        // 파일 연결
        for (IdeFile file : files) {
            TreeNode fileNode = TreeNode.file(
                    file.getId(),
                    file.getName(),
                    file.getFolderId(),
                    file.getLanguage()
            );

            TreeNode parentFolder = folderNodeMap.get(file.getFolderId());
            if (parentFolder != null) parentFolder.children.add(fileNode);
            else root.children.add(fileNode); // 안전장치
        }

        sortTree(root);
        return root;
    }

    private void sortTree(TreeNode node) {
        node.children.sort((a, b) -> {
            if (a.type.equals(b.type)) return a.name.compareToIgnoreCase(b.name);
            return a.type.equals("FOLDER") ? -1 : 1;
        });
        for (TreeNode child : node.children) sortTree(child);
    }

    public static class TreeNode {
        public String type;     // ROOT / FOLDER / FILE
        public Long id;
        public Long projectId;  // ROOT에서만
        public String name;
        public Long parentId;   // 폴더 parentId, 파일은 folderId
        public String language; // 파일만
        public List<TreeNode> children = new ArrayList<>();

        public static TreeNode root(Long projectId) {
            TreeNode n = new TreeNode();
            n.type = "ROOT";
            n.projectId = projectId;
            n.name = "ROOT";
            return n;
        }

        public static TreeNode folder(Long id, String name, Long parentId) {
            TreeNode n = new TreeNode();
            n.type = "FOLDER";
            n.id = id;
            n.name = name;
            n.parentId = parentId;
            return n;
        }

        public static TreeNode file(Long id, String name, Long folderId, String language) {
            TreeNode n = new TreeNode();
            n.type = "FILE";
            n.id = id;
            n.name = name;
            n.parentId = folderId;
            n.language = language;
            return n;
        }
    }
}