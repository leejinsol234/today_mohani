package com.mohani_be.models.schedule;

import com.mohani_be.commons.exceptions.AlertBackException;
import org.springframework.http.HttpStatus;

public class ScheduleNotFoundException extends AlertBackException {
    public ScheduleNotFoundException(String message, HttpStatus status) {
        super(message, status);
    }
}
