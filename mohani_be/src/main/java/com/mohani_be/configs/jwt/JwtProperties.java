package com.mohani_be.configs.jwt;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {

    private String header;
    private String secret;
    private Long accessTokenValidityInSeconds; // 토큰 유효 시간 설정 값
}
