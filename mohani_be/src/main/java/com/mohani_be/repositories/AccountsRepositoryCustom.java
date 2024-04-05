package com.mohani_be.repositories;

import com.mohani_be.entities.TotalMoney;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountsRepositoryCustom {

    TotalMoney getTotal(int month, int year, Long memberNo); // 이 달의 수입, 이 달의 지출 계산
}
