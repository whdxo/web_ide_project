package com.editus.backend.global.exception;

public class ProjectAccessDeniedException extends RuntimeException {
    public ProjectAccessDeniedException(String message) {
        super(message);
    }
}
