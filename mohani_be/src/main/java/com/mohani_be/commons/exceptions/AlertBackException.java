package com.mohani_be.commons.exceptions;

import org.springframework.http.HttpStatus;

public class AlertBackException extends AlertException{
    public AlertBackException(String message, HttpStatus status) {
        super(message, status);
    }
}
