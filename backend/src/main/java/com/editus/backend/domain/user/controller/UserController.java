package com.editus.backend.domain.user.controller;

import com.editus.backend.global.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping("/join")
    public ResponseEntity<ApiResponse<Map<String, Object>>> join(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        response.put("userId", 1L);
        response.put("email", request.get("email"));
        response.put("name", request.get("name"));
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getMe() {
        Map<String, Object> user = new HashMap<>();
        user.put("userId", 1L);
        user.put("name", "박영선");
        user.put("email", "test@example.com");
        user.put("createdAt", LocalDateTime.now().toString());
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> updateUser(@PathVariable Long userId, @RequestBody Map<String, Object> request) {
        Map<String, Object> user = new HashMap<>();
        user.put("userId", userId);
        user.put("name", request.get("name")); // Updated name
        user.put("email", "test@example.com");
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long userId) {
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
