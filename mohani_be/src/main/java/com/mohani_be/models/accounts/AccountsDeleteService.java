package com.mohani_be.models.accounts;

import com.mohani_be.entities.Accounts;
import com.mohani_be.entities.TotalMoney;
import com.mohani_be.repositories.AccountsRepository;
import com.mohani_be.repositories.AccountsRepositoryImpl;
import com.mohani_be.repositories.TotalMoneyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountsDeleteService {

    private final AccountsRepository repository;
    private final AccountsInfoService infoService;
    private final AccountsRepositoryImpl total;
    private final TotalMoneyRepository moneyRepository;

    public void delete(Long idx) {
        Accounts accounts = infoService.get(idx);
        repository.delete(accounts);
        repository.flush();

        // 총 수입, 총 지출
        TotalMoney totalMoney = total.getTotal(accounts.getDate(), accounts.getMember().getMemberNo());
        totalMoney.setExpenditure(totalMoney.getExpenditure());
        totalMoney.setIncome(totalMoney.getIncome());

        moneyRepository.save(totalMoney);
    }
}
