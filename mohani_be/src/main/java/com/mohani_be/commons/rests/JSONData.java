package com.mohani_be.commons.rests;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@NoArgsConstructor @RequiredArgsConstructor
public class JSONData {

    private boolean success = true;
    private HttpStatus status = HttpStatus.OK;

    @NonNull
    private Object data;
    private Object message; // 오류 메세지를 여러개 처리하기 위해 Object 설정
}
