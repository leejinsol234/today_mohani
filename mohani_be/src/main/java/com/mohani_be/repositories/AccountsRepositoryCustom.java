package com.mohani_be.repositories;

import com.mohani_be.entities.TotalMoney;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountsRepositoryCustom {

    TotalMoney getTotal(String date, Long memberNo); // 추가 시 총 수입, 총 합계 계산
}
