package com.mohani_be.models.member;

import com.mohani_be.commons.exceptions.InvalidRefreshTokenException;
import com.mohani_be.configs.jwt.TokenProvider;
import com.mohani_be.controllers.member.RequestLogin;
import com.mohani_be.entities.RefreshToken;
import com.mohani_be.models.RefreshTokenSaveService;
import com.mohani_be.repositories.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberLoginService {

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final RefreshTokenRepository refreshTokenRepository;
    private final RefreshTokenSaveService saveService;

    public String login(RequestLogin form) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(form.getEmail(), form.getPassword());

        // email, password 체크
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 인증 정보를 가지고 JWT 토큰 발급
        String accessToken = tokenProvider.createToken(authentication);

        return accessToken;
    }

    public String reLogin() {

        String refreshToken = tokenProvider.createRefreshToken();

        return refreshToken;
    }

    public void matches(String refreshToken, Long memberNo) {
        RefreshToken savedToken = refreshTokenRepository.findByMember_MemberNo(memberNo)
                .orElseThrow(InvalidRefreshTokenException::new);

        if (!tokenProvider.equals(savedToken.getToken())) {
            refreshTokenRepository.delete(savedToken);
            throw new InvalidRefreshTokenException();
        }
        saveService.save(savedToken);
    }
}
