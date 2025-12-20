package com.editus.backend.domain.schedule.controller;

import com.editus.backend.domain.schedule.dto.request.TodoCreateRequest;
import com.editus.backend.domain.schedule.dto.request.TodoUpdateRequest;
import com.editus.backend.domain.schedule.dto.response.TodoResponse;
import com.editus.backend.domain.schedule.service.TodoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class TodoController {

    private final TodoService todoService;

    // TODO: 실제로는 @AuthenticationPrincipal 등으로 현재 사용자 정보 가져오기
    private Long getCurrentUserId() {
        return 1L; // 임시로 하드코딩
    }

    /**
     * Todo 목록 조회
     * GET /api/todos
     * Query Params: completed (optional), dueDate (optional), projectId (optional)
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getTodos(
            @RequestParam(required = false) Boolean completed,
            @RequestParam(required = false) LocalDate dueDate,
            @RequestParam(required = false) Long projectId
    ) {
        Long userId = getCurrentUserId();
        List<TodoResponse> todos;

        if (projectId != null) {
            todos = todoService.getTodosByUserIdAndProjectId(userId, projectId);
        } else if (completed != null) {
            todos = todoService.getTodosByUserIdAndCompleted(userId, completed);
        } else if (dueDate != null) {
            todos = todoService.getTodosByUserIdAndDate(userId, dueDate);
        } else {
            todos = todoService.getTodosByUserId(userId);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", todos);

        return ResponseEntity.ok(response);
    }

    /**
     * Todo 단건 조회
     * GET /api/todos/{todoId}
     */
    @GetMapping("/{todoId}")
    public ResponseEntity<Map<String, Object>> getTodo(@PathVariable Long todoId) {
        Long userId = getCurrentUserId();
        TodoResponse todo = todoService.getTodoById(todoId, userId);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", todo);

        return ResponseEntity.ok(response);
    }

    /**
     * Todo 생성
     * POST /api/todos
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createTodo(
            @Valid @RequestBody TodoCreateRequest request
    ) {
        Long userId = getCurrentUserId();
        TodoResponse created = todoService.createTodo(userId, request);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", created);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Todo 수정
     * PUT /api/todos/{todoId}
     */
    @PutMapping("/{todoId}")
    public ResponseEntity<Map<String, Object>> updateTodo(
            @PathVariable Long todoId,
            @Valid @RequestBody TodoUpdateRequest request
    ) {
        Long userId = getCurrentUserId();
        TodoResponse updated = todoService.updateTodo(todoId, userId, request);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", updated);

        return ResponseEntity.ok(response);
    }

    /**
     * Todo 완료 토글
     * PATCH /api/todos/{todoId}/toggle
     */
    @PatchMapping("/{todoId}/toggle")
    public ResponseEntity<Map<String, Object>> toggleTodo(@PathVariable Long todoId) {
        Long userId = getCurrentUserId();
        TodoResponse toggled = todoService.toggleTodoComplete(todoId, userId);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", toggled);

        return ResponseEntity.ok(response);
    }

    /**
     * Todo 삭제
     * DELETE /api/todos/{todoId}
     */
    @DeleteMapping("/{todoId}")
    public ResponseEntity<Map<String, Object>> deleteTodo(@PathVariable Long todoId) {
        Long userId = getCurrentUserId();
        todoService.deleteTodo(todoId, userId);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Todo deleted successfully");

        return ResponseEntity.ok(response);
    }
}
