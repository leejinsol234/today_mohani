package com.mohani_be.models;

import com.mohani_be.commons.Utils;
import com.mohani_be.commons.exceptions.BadRequestException;
import com.mohani_be.entities.RefreshToken;
import com.mohani_be.models.member.MemberInfo;
import com.mohani_be.repositories.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;

@Service
@RequiredArgsConstructor
public class RefreshTokenSaveService {

    private final RefreshTokenRepository repository;

    public void save(RefreshToken token, Errors errors){

        errorProcess(errors);

        // SecurityContextHolder를 통해 현재 사용자의 인증 정보를 얻어온다
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MemberInfo memberInfo = (MemberInfo) authentication.getPrincipal();


        RefreshToken refreshToken = RefreshToken.builder()
                .tokenId(token.getTokenId())
                .token(token.getToken())
                .member(memberInfo.getMember())
                .build();

        save(refreshToken);


    }
    public RefreshToken save(RefreshToken refreshToken) {
        return repository.save(refreshToken);
    }

    private void errorProcess(Errors errors) {
        if (errors.hasErrors()) {
            throw new BadRequestException(Utils.getMessages(errors));
        }
    }
}
