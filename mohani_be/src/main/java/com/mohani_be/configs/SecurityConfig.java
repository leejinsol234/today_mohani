package com.mohani_be.configs;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Spring Security에서 지원하는 인증과 권한 부여 설정을 작성

    @Autowired
    private CorsFilter corsFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // HttpSecurity를 통해 Http 요청에 대한 보안 설정

        // 세션 정책
        // IF_REQUIRED - 스프링시큐리티가 필요시 생성 (기본)

        http.csrf(c -> c.disable())
                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED));

        // 일반
        http.exceptionHandling(c -> {
            c.authenticationEntryPoint((req, res, e) -> {
                res.sendError(HttpServletResponse.SC_UNAUTHORIZED); // 401 권한 없음
            });

            // 로그인 후 권한이 없을 떄
            c.accessDeniedHandler((req, res, e) -> {
                res.sendError(HttpServletResponse.SC_FORBIDDEN); // 403 금지됨
            });
        });


        http.authorizeHttpRequests(c -> {
            c.requestMatchers(
                    "/mohani/join", // 회원가입
                    "/mohani/login", // 로그인
                    "/mohani/schedule",
                    "/mohani/**").permitAll()
                    .anyRequest().authenticated(); // 나머지 URL은 모두 회원 인증
        });


        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}