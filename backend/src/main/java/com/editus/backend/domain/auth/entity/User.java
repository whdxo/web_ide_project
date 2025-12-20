package com.editus.backend.domain.auth.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false, unique = true, length = 50)
    private String email;

    @Column(length = 100)
    private String password;

    @Column(length = 20)
    private String provider;

    @Column(name = "provider_id", length = 50)
    private String providerId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Builder
    public User(String name, String email, String password, String provider, String providerId) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.provider = provider;
        this.providerId = providerId;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
