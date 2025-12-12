package com.editus.backend.domain.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordChangeDto {

    @NotBlank(message = "현재 비밀번호는 필수입니다.")
    private String oldPassword;

    @NotBlank(message = "새 비밀번호는 필수입니다.")
    @Size(min = 4, max = 20, message = "새 비밀번호는 4자 이상 20자 이하여야 합니다.")
    private String newPassword;
}
