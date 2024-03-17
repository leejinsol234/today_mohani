package com.mohani_be.models.accounts;

import com.mohani_be.entities.TotalMoney;
import com.mohani_be.repositories.TotalMoneyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountsTotalMoneyInfoService {

    private final TotalMoneyRepository repository;

    public List<TotalMoney> findByMemberNo(Long memberNo) {

        return repository.findByMember_MemberNo(memberNo);
    }

    public TotalMoney get(String date) {

        TotalMoney totalMoney = repository.findByDate(date).orElseThrow(() -> new AccountsNotFoundException("데이터를 찾을 수 없습니다.", HttpStatus.NOT_FOUND));

        return totalMoney;
    }
}
