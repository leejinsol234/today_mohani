package com.mohani_be.controllers.member;

import com.mohani_be.commons.validator.PasswordValidator;
import com.mohani_be.commons.validator.PhoneNumberValidator;
import com.mohani_be.repositories.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
@RequiredArgsConstructor
public class JoinValidator implements Validator, PasswordValidator, PhoneNumberValidator {

    private final MemberRepository repository;

    @Override
    public boolean supports(Class<?> clazz) {
        return clazz.isAssignableFrom(RequestJoin.class);
    }

    @Override
    public void validate(Object target, Errors errors) {

        RequestJoin form = (RequestJoin) target;

        String email = form.getEmail();
        String password = form.getPassword();
        String confirmPassword = form.getConfirmPassword();
        String phoneNumber = form.getPhoneNumber();

        // 1. 아이디 중복 여부 체크
        if (email != null && !email.isBlank() && repository.exists(email)) {
            errors.rejectValue("email", "Duplicate");
        }

        // 2. 비밀번호 복잡성 체크
        if (password != null && !password.isBlank() && (!alphaCheck(password, false) || !numberCheck(password) || !specialCharsCheck(password))) {
            errors.rejectValue("password", "Complexity");
        }

        // 3. 비밀번호 및 비밀번호 확인 일치 여부
        if (password != null && !password.isBlank() && confirmPassword != null && !confirmPassword.isBlank() && !password.equals(confirmPassword)) {
            errors.rejectValue("confirmPassword", "Mismatch");
        }

        // 4. 전화번호 형식 체크
        if (phoneNumber != null && !phoneNumber.isBlank() && !phoneNumCheck(phoneNumber)) {
            errors.rejectValue("phoneNumber", "Form");
        }

    }
}
