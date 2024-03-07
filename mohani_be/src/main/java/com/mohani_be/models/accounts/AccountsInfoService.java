package com.mohani_be.models.accounts;

import com.mohani_be.entities.Accounts;
import com.mohani_be.entities.TotalMoney;
import com.mohani_be.repositories.AccountsRepository;
import com.mohani_be.repositories.AccountsRepositoryImpl;
import com.mohani_be.repositories.TotalMoneyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountsInfoService {

    private final AccountsRepository repository;
    private final AccountsRepositoryImpl total;
    private final TotalMoneyRepository moneyRepository;

    public List<Accounts> findByMemberNo(Long memberNo){
        return repository.findByMember_MemberNo(memberNo);
    }

    public Accounts get(Long idx) {

        Accounts accounts = repository.findByIdx(idx).orElseThrow(() -> new AccountsNotFoundException("데이터를 찾을 수 없습니다.", HttpStatus.NOT_FOUND));

        // 총 수입, 총 지출
        TotalMoney totalMoney = total.getTotal(accounts.getDate(), accounts.getMember().getMemberNo());
        totalMoney.setExpenditure(totalMoney.getExpenditure());
        totalMoney.setIncome(totalMoney.getIncome());

        moneyRepository.save(totalMoney);

        return accounts;

    }
}
