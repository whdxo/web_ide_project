package com.editus.backend.domain.project.repository;

import com.editus.backend.domain.project.entity.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {
    Optional<Invitation> findByCodeAndDeletedFalse(String code);

    @Query("SELECT i FROM Invitation i WHERE i.code = :code " +
            "AND i.deleted = false " +
            "AND i.used = false " +
            "AND i.expiresAt > :now")
    Optional<Invitation> findValidInvitation(
            @Param("code") String code,
            @Param("now") LocalDateTime now);

    @Modifying
    @Query("UPDATE Invitation i SET i.deleted = true WHERE i.expiresAt < :now AND i.deleted = false")
    int markAsDeletedByExpiresAtBefore(@Param("now") LocalDateTime now);
}
