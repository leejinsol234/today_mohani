package com.mohani_be.repositories;

import com.mohani_be.controllers.accounts.AccountsTotalMoney;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountsRepositoryCustom {

    AccountsTotalMoney getTotal(String date);
}
