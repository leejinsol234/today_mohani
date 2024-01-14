package com.mohani_be.models.member;

import com.mohani_be.controllers.RequestJoin;
import com.mohani_be.entities.Member;
import com.mohani_be.repositories.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberSaveService {

    private final MemberRepository repository;
    private final PasswordEncoder passwordEncoder;

    public void save(RequestJoin form) {

        // 회원 가입 처리
        String hash = passwordEncoder.encode(form.getPassword());
        Member member = Member.builder()
                .email(form.getEmail())
                .name(form.getName())
                .password(hash)
                .mobile(form.getMobile())
                .build();

        save(member);
    }

    public void save(Member member) {
        String mobile = member.getMobile();
        if (mobile != null) {
            mobile = mobile.replaceAll("\\D", "");
            member.setMobile(mobile);
        }

        repository.saveAndFlush(member);
    }
}
