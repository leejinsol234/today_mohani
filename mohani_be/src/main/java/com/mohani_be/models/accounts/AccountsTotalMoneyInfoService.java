package com.mohani_be.models.accounts;

import com.mohani_be.entities.TotalMoney;
import com.mohani_be.repositories.TotalMoneyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountsTotalMoneyInfoService {

    private final TotalMoneyRepository repository;

    public List<TotalMoney> findByMemberNo(Long memberNo) {

        return repository.findByMember_MemberNo(memberNo);
    }
}
