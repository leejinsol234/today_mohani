package com.mohani_be.configs;

import com.mohani_be.configs.jwt.CustomJwtFilter;
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

    @Autowired
    private CustomJwtFilter customJwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // HttpSecurity를 통해 Http 요청에 대한 보안 설정

        // 세션 정책 (SessionCreationPolicy)
        // IF_REQUIRED - 스프링 시큐리티가 필요시 생성 (기본)
        // STATELESS - 스프링 시큐리티가 생성하지도 않고 기존의 것을 사용하지도 않음(JWT와 같은 토큰 방식을 쓸때 사용)

        http.csrf(c -> c.disable())
                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(customJwtFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

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
                    "/mohani/main",
                    "/mohani",
                    "/mohani/info",
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