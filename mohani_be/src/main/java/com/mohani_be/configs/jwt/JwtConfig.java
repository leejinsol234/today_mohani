package com.mohani_be.configs.jwt;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(JwtProperties.class)
public class JwtConfig {

    @Bean
    public TokenProvider tokenProvider(JwtProperties jwtProperties) {

        System.out.println("jwtProperties: " + jwtProperties);
        return new TokenProvider(jwtProperties.getSecret(), jwtProperties.getAccessTokenValidityInSeconds());
    }
}
