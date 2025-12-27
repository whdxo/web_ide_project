package com.editus.backend.global.security.jwt;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {

  // email로 RefreshToken 조회 (로그아웃 시 사용)
  Optional<RefreshToken> findByEmail(String email);

  // email로 RefreshToken 삭제 (로그아웃 시 사용)
  void deleteByEmail(String email);
}
