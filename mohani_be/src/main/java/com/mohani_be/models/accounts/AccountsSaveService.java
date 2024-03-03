package com.mohani_be.models.accounts;

import com.mohani_be.controllers.accounts.AccountsForm;
import com.mohani_be.controllers.accounts.AccountsFormValidator;
import com.mohani_be.controllers.accounts.AccountsTotalMoney;
import com.mohani_be.entities.Accounts;
import com.mohani_be.models.member.MemberInfo;
import com.mohani_be.repositories.AccountsRepository;
import com.mohani_be.repositories.AccountsRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;

@Service
@RequiredArgsConstructor
public class AccountsSaveService {

    private final AccountsRepository repository;
    private final AccountsFormValidator validator;
    private final AccountsRepositoryImpl total;

    public void save(AccountsForm form, Errors errors) {

        validator.validate(form, errors);

        if(errors.hasErrors()){
            return;
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MemberInfo memberInfo = (MemberInfo) authentication.getPrincipal();

        Accounts accounts = Accounts.builder()
                .idx(form.getIdx())
                .money(form.getMoney())
                .in_ex(form.isIn_ex())
                .date(form.getDate())
                .memo(form.getMemo())
                .member(memberInfo.getMember())
                .build();

        save(accounts);

        AccountsTotalMoney totalMoney = total.getTotal(accounts.getDate());
        accounts.setExpenditure(totalMoney.getExpenditure());
        accounts.setIncome(totalMoney.getIncome());
        save(accounts);
    }

    public Accounts save(Accounts accounts) {return repository.save(accounts);}

}
