package com.editus.backend.global.security.oauth.user;

public interface OAuth2UserInfo {
  String getProviderId();

  String getProvider();

  String getEmail();

  String getName();
}
