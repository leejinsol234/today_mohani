package com.mohani_be.models.accounts;

import com.mohani_be.controllers.accounts.AccountsTotalMoney;
import com.mohani_be.entities.Accounts;
import com.mohani_be.repositories.AccountsRepository;
import com.mohani_be.repositories.AccountsRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountsDeleteService {

    private final AccountsRepository repository;
    private final AccountsInfoService infoService;
    private final AccountsRepositoryImpl total;

    public void delete(Long idx) {
        Accounts accounts = infoService.get(idx);
        repository.delete(accounts);

        AccountsTotalMoney totalMoney = total.getTotal(accounts.getDate());
        accounts.setExpenditure(totalMoney.getExpenditure());
        accounts.setIncome(totalMoney.getIncome());

        repository.flush();
    }
}
