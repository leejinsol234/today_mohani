package com.mohani_be.models.accounts;

import com.mohani_be.commons.exceptions.CommonException;
import org.springframework.http.HttpStatus;

public class AccountsNotFoundException extends CommonException {
    public AccountsNotFoundException(String message, HttpStatus status) {
        super(message, status);
    }
}
