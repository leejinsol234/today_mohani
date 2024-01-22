package com.mohani_be.models.member;

import com.mohani_be.commons.contants.MemberType;
import com.mohani_be.controllers.member.JoinValidator;
import com.mohani_be.controllers.member.RequestJoin;
import com.mohani_be.entities.Member;
import com.mohani_be.repositories.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;

@Service
@RequiredArgsConstructor
public class MemberSaveService {

    private final MemberRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JoinValidator joinValidator;

    public void save(RequestJoin form, Errors errors) {

        joinValidator.validate(form, errors);
        if (errors.hasErrors()) {
            return;
        }

        // 회원 가입 처리
        String hash = passwordEncoder.encode(form.getPassword());
        Member member = Member.builder()
                .email(form.getEmail())
                .name(form.getName())
                .password(hash)
                .phoneNumber(form.getPhoneNumber())
                //.type(MemberType.USER)
                .build();

        save(member);
    }

    public void save(Member member) {
        String phone = member.getPhoneNumber();
        if (phone != null) {
            phone = phone.replaceAll("\\D", "");
            member.setPhoneNumber(phone);
        }

        repository.saveAndFlush(member);
    }
}
