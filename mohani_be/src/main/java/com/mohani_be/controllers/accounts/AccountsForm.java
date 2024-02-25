package com.mohani_be.controllers.accounts;

import lombok.Data;

@Data
public class AccountsForm {

    private Long idx; // 번호


    private Long accounts; //금액


    private String date; // 날짜


    private boolean in_ex; // true = 수입 , false = 지출

    private String memo;

}
