package com.mohani_be.controllers.accounts;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AccountsForm {

    private Long idx; // 번호

    private Long money; // 금액

    private String date; // 날짜

    private boolean in_ex; // true = 수입 , false = 지출

    @Size(max = 10) // 글자 수 10자로 제한
    private String memo;

}
