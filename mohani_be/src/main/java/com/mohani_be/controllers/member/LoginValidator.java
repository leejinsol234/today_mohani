package com.mohani_be.controllers.member;

import com.mohani_be.entities.Member;
import com.mohani_be.repositories.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class LoginValidator implements Validator{

    private final MemberRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean supports(Class<?> clazz) {
        return clazz.isAssignableFrom(RequestLogin.class);
    }

    @Override
    public void validate(Object target, Errors errors) {

        RequestLogin form = (RequestLogin) target;

        Optional<Member> memberOptional = repository.findByEmail(form.getEmail());

        // 값이 일치하지 않았을 때 "No value present" 메시지가 출력되는 이유는
        // Optional 객체에서 .get() 메서드를 호출하여 값을 가져오려고 할 때,
        // 해당 값이 존재하지 않는 경우 발생하는 예외(NoSuchElementException)
        // 이를 방지하기 위해서는 .get() 메서드 호출 전에 Optional이 실제로 값을 갖고 있는지 여부를 확인해야 한다.

        // 1. 아이디(이메일) 존재 여부 확인
        // 값이 비어있는지 확인하여 NoSuchElementException 예외 처리
        if (memberOptional.isEmpty()) {
            errors.rejectValue("email", "Exists");
            return;
        }

        String pass = memberOptional.get().getPassword();
        String password = form.getPassword();

        // 2. 비밀번호 일치 여부 확인
        if (password != null && !password.isBlank() && !passwordEncoder.matches(password, pass)) {
            errors.rejectValue("password", "Exists");
        }
    }
}
