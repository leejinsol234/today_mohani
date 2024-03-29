package com.mohani_be.commons.exceptions;

import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Map;

public class BadRequestException extends CommonException {

    public BadRequestException(Map<String, List<String>> messages) {
        super(messages, HttpStatus.BAD_REQUEST); // 400에러

    }

    public BadRequestException(String message) {
        super(message, HttpStatus.BAD_REQUEST); // 400에러
    }

}
