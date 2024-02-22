package com.mohani_be.models.member;

import com.mohani_be.commons.exceptions.CommonException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Map;

public class MemberNotFoundException extends CommonException {
    public MemberNotFoundException(Map<String, List<String>> messages) {
        super(messages, HttpStatus.BAD_REQUEST); // 400에러

    }
}
