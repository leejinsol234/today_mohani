package com.mohani_be.commons.exceptions;

import com.mohani_be.commons.Utils;
import org.springframework.http.HttpStatus;

public class InvalidRefreshTokenException extends CommonException{


    public InvalidRefreshTokenException() {
        super(Utils.getMessage("UnAuthorization", "error"), HttpStatus.UNAUTHORIZED); // 401 에러
    }
}
