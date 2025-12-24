package com.editus.backend.global.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@Builder
@AllArgsConstructor
@RedisHash(value = "refreshToken", timeToLive = 1209600) // 14일 (초 단위)
public class RefreshToken {

  @Id
  private String token; // Refresh Token 값 자체를 ID로 사용

  @Indexed // email로 검색 가능하도록
  private String email;

  private Long userId;
}
