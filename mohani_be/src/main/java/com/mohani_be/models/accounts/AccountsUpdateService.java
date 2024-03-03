package com.mohani_be.models.accounts;

import com.mohani_be.controllers.accounts.AccountsForm;
import com.mohani_be.controllers.accounts.AccountsFormValidator;
import com.mohani_be.controllers.accounts.AccountsTotalMoney;
import com.mohani_be.entities.Accounts;
import com.mohani_be.repositories.AccountsRepository;
import com.mohani_be.repositories.AccountsRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;

@Service
@RequiredArgsConstructor
public class AccountsUpdateService {

    private final AccountsRepository repository;
    private final AccountsFormValidator validator;
    private final AccountsInfoService infoService;
    private final AccountsRepositoryImpl total;

    public void update(Long idx, AccountsForm form, Errors errors) {

        validator.validate(form, errors);

        if(errors.hasErrors()){
            return;
        }

        Accounts accountData = infoService.get(idx);

        accountData.setIn_ex(form.isIn_ex());
        accountData.setMoney(form.getMoney());
        accountData.setMemo(form.getMemo());

        update(accountData);

        AccountsTotalMoney totalMoney = total.getTotal(accountData.getDate());
        accountData.setExpenditure(totalMoney.getExpenditure());
        accountData.setIncome(totalMoney.getIncome());
        update(accountData);
    }

    public Accounts update(Accounts accounts) {return repository.save(accounts);}
}
