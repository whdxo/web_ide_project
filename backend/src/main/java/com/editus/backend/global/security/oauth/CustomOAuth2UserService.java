package com.editus.backend.global.security.oauth;

import com.editus.backend.domain.auth.entity.User;
import com.editus.backend.domain.auth.repository.UserRepository;
import com.editus.backend.global.security.oauth.user.KakaoUserInfo;
import com.editus.backend.global.security.oauth.user.OAuth2UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

  private final UserRepository userRepository;

  @Override
  @Transactional
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    OAuth2User oAuth2User = super.loadUser(userRequest);
    log.info("OAuth2 User loaded attributes: {}", oAuth2User.getAttributes());

    String registrationId = userRequest.getClientRegistration().getRegistrationId();
    OAuth2UserInfo oAuth2UserInfo = null;

    if (registrationId.equals("kakao")) {
      oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
    } else {
      log.error("Unsupported provider: {}", registrationId);
      // 필요 시 예외 등 처리
    }

    if (oAuth2UserInfo != null) {
      saveOrUpdateUser(oAuth2UserInfo);
    }

    return oAuth2User;
  }

  private void saveOrUpdateUser(OAuth2UserInfo oAuth2UserInfo) {
    String email = oAuth2UserInfo.getEmail();
    String name = oAuth2UserInfo.getName();
    String provider = oAuth2UserInfo.getProvider();
    String providerId = oAuth2UserInfo.getProviderId();

    Optional<User> userOptional = userRepository.findByEmail(email);

    if (userOptional.isPresent()) {
      User user = userOptional.get();
      if (user.getProvider() == null) {
        log.info("기존 회원 소셜 연동: {}", email);
        user.setProvider(provider);
        user.setProviderId(providerId);
        userRepository.save(user); // JPA Dirty Checking으로 업데이트되지만 명시적으로 호출
      }
    } else {
      User user = User.builder()
          .name(name)
          .email(email)
          .password("") // 소셜 로그인은 비밀번호 없음
          .provider(provider)
          .providerId(providerId)
          .build();
      userRepository.save(user);
      log.info("신규 소셜 회원 가입: {}", email);
    }
  }
}
