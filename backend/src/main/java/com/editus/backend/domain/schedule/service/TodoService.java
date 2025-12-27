package com.editus.backend.domain.schedule.service;

import com.editus.backend.domain.auth.entity.User;
import com.editus.backend.domain.auth.repository.UserRepository;
import com.editus.backend.domain.project.entity.Project;
import com.editus.backend.domain.project.repository.ProjectRepository;
import com.editus.backend.domain.schedule.dto.request.TodoCreateRequest;
import com.editus.backend.domain.schedule.dto.request.TodoUpdateRequest;
import com.editus.backend.domain.schedule.dto.response.TodoResponse;
import com.editus.backend.domain.schedule.entity.Todo;
import com.editus.backend.domain.schedule.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TodoService {

    private final TodoRepository todoRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    // 사용자의 모든 Todo 조회
    public List<TodoResponse> getTodosByUserId(Long userId) {
        return todoRepository.findByUserUserId(userId)
                .stream()
                .map(TodoResponse::from)
                .collect(Collectors.toList());
    }

    // 프로젝트별 Todo 조회
    public List<TodoResponse> getTodosByUserIdAndProjectId(Long userId, Long projectId) {
        return todoRepository.findByUserUserIdAndProjectProjectId(userId, projectId)
                .stream()
                .map(TodoResponse::from)
                .collect(Collectors.toList());
    }

    // 완료 여부로 필터링
    public List<TodoResponse> getTodosByUserIdAndCompleted(Long userId, Boolean completed) {
        return todoRepository.findByUserUserIdAndCompleted(userId, completed)
                .stream()
                .map(TodoResponse::from)
                .collect(Collectors.toList());
    }

    // 특정 날짜의 Todo 조회
    public List<TodoResponse> getTodosByUserIdAndDate(Long userId, LocalDate dueDate) {
        return todoRepository.findByUserUserIdAndDueDate(userId, dueDate)
                .stream()
                .map(TodoResponse::from)
                .collect(Collectors.toList());
    }

    // Todo 단건 조회
    public TodoResponse getTodoById(Long todoId, Long userId) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found: " + todoId));

        // 권한 체크: 본인의 Todo만 조회 가능
        if (!todo.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("접근 권한이 없습니다");
        }

        return TodoResponse.from(todo);
    }

    // Todo 생성
    @Transactional
    public TodoResponse createTodo(Long userId, TodoCreateRequest request) {
        // User 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        // Project 조회 (있으면)
        Project project = null;
        if (request.getProjectId() != null) {
            project = projectRepository.findById(request.getProjectId())
                    .orElseThrow(() -> new RuntimeException("Project not found: " + request.getProjectId()));

            // 권한 체크: 본인 프로젝트인지 확인
            if (!project.getOwner().getUserId().equals(userId)) {
                throw new RuntimeException("접근 권한이 없는 프로젝트입니다");
            }
        }

        Todo todo = Todo.builder()
                .user(user)
                .project(project)
                .content(request.getContent())
                .dueDate(request.getDueDate())
                .priority(request.getPriority())
                .completed(false)
                .build();

        Todo saved = todoRepository.save(todo);
        return TodoResponse.from(saved);
    }

    // Todo 수정
    @Transactional
    public TodoResponse updateTodo(Long todoId, Long userId, TodoUpdateRequest request) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found: " + todoId));

        // 권한 체크
        if (!todo.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("접근 권한이 없습니다");
        }

        // 수정
        if (request.getContent() != null) {
            todo.updateContent(request.getContent());
        }
        if (request.getCompleted() != null) {
            if (request.getCompleted() != todo.getCompleted()) {
                todo.toggleComplete();
            }
        }
        if (request.getDueDate() != null) {
            todo.updateDueDate(request.getDueDate());
        }
        if (request.getPriority() != null) {
            todo.updatePriority(request.getPriority());
        }
        if (request.getProjectId() != null) {
            Project project = projectRepository.findById(request.getProjectId())
                    .orElseThrow(() -> new RuntimeException("Project not found: " + request.getProjectId()));

            if (!project.getOwner().getUserId().equals(userId)) {
                throw new RuntimeException("접근 권한이 없는 프로젝트입니다");
            }

            todo.updateProject(project);
        }

        return TodoResponse.from(todo);
    }

    // Todo 완료 토글
    @Transactional
    public TodoResponse toggleTodoComplete(Long todoId, Long userId) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found: " + todoId));

        // 권한 체크
        if (!todo.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("접근 권한이 없습니다");
        }

        todo.toggleComplete();
        return TodoResponse.from(todo);
    }

    // Todo 삭제
    @Transactional
    public void deleteTodo(Long todoId, Long userId) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found: " + todoId));

        // 권한 체크
        if (!todo.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("접근 권한이 없습니다");
        }

        todoRepository.delete(todo);
    }
}
