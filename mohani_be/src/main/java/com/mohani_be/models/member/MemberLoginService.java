package com.mohani_be.models.member;

import com.mohani_be.commons.Utils;
import com.mohani_be.commons.exceptions.BadRequestException;
import com.mohani_be.configs.jwt.TokenProvider;
import com.mohani_be.controllers.member.LoginValidator;
import com.mohani_be.controllers.member.RequestLogin;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;

@Service
@RequiredArgsConstructor
public class MemberLoginService {

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final LoginValidator loginValidator;

    public String login(RequestLogin form, Errors errors) {

        loginValidator.validate(form, errors);
        if (errors.hasErrors()) {
            throw new MemberNotFoundException(Utils.getMessages(errors));
        }

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(form.getEmail(), form.getPassword());

        // email, password 체크
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 인증 정보를 가지고 JWT 토큰 발급
        String accessToken = tokenProvider.createToken(authentication);

        return accessToken;
    }
}
