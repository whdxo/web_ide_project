package com.editus.backend.domain.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProjectDto {
    @JsonProperty("project_id")
    private Long projectId;

    private String name;
    private String description;

    @JsonProperty("owner_id")
    private Long ownerId;

    @JsonProperty("created_at")
    private String createdAt;

    @JsonProperty("project_type")
    private String projectType;

    @JsonProperty("current_user_role")
    private String currentUserRole;

    @JsonProperty("can_delete")
    private boolean canDelete;

    @JsonProperty("can_invite")
    private boolean canInvite;

    @JsonProperty("can_leave")
    private boolean canLeave;

    public ProjectDto() {}

    public ProjectDto(Long projectId, String name, String description, Long ownerId, String createdAt, String projectType,
                      String currentUserRole, boolean canDelete, boolean canInvite, boolean canLeave) {
        this.projectId = projectId;
        this.name = name;
        this.description = description;
        this.ownerId = ownerId;
        this.createdAt = createdAt;
        this.projectType = projectType;
        this.currentUserRole = currentUserRole;
        this.canDelete = canDelete;
        this.canInvite = canInvite;
        this.canLeave = canLeave;
    }

    public static ProjectDtoBuilder builder() {
        return new ProjectDtoBuilder();
    }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Long getOwnerId() { return ownerId; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }
    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
    public String getProjectType() { return projectType; }
    public void setProjectType(String projectType) { this.projectType = projectType; }
    public String getCurrentUserRole() { return currentUserRole; }
    public void setCurrentUserRole(String currentUserRole) { this.currentUserRole = currentUserRole; }
    public boolean isCanDelete() { return canDelete; }
    public void setCanDelete(boolean canDelete) { this.canDelete = canDelete; }
    public boolean isCanInvite() { return canInvite; }
    public void setCanInvite(boolean canInvite) { this.canInvite = canInvite; }
    public boolean isCanLeave() { return canLeave; }
    public void setCanLeave(boolean canLeave) { this.canLeave = canLeave; }

    public static class ProjectDtoBuilder {
        private Long projectId;
        private String name;
        private String description;
        private Long ownerId;
        private String createdAt;
        private String projectType;
        private String currentUserRole;
        private boolean canDelete;
        private boolean canInvite;
        private boolean canLeave;

        public ProjectDtoBuilder projectId(Long projectId) {
            this.projectId = projectId;
            return this;
        }
        public ProjectDtoBuilder name(String name) {
            this.name = name;
            return this;
        }
        public ProjectDtoBuilder description(String description) {
            this.description = description;
            return this;
        }
        public ProjectDtoBuilder ownerId(Long ownerId) {
            this.ownerId = ownerId;
            return this;
        }
        public ProjectDtoBuilder createdAt(String createdAt) {
            this.createdAt = createdAt;
            return this;
        }
        public ProjectDtoBuilder projectType(String projectType) {
            this.projectType = projectType;
            return this;
        }
        public ProjectDtoBuilder currentUserRole(String currentUserRole) {
            this.currentUserRole = currentUserRole;
            return this;
        }
        public ProjectDtoBuilder canDelete(boolean canDelete) {
            this.canDelete = canDelete;
            return this;
        }
        public ProjectDtoBuilder canInvite(boolean canInvite) {
            this.canInvite = canInvite;
            return this;
        }
        public ProjectDtoBuilder canLeave(boolean canLeave) {
            this.canLeave = canLeave;
            return this;
        }
        public ProjectDto build() {
            return new ProjectDto(projectId, name, description, ownerId, createdAt, projectType,
                    currentUserRole, canDelete, canInvite, canLeave);
        }
    }
}
