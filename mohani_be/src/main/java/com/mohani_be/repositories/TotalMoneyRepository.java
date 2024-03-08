package com.mohani_be.repositories;

import com.mohani_be.entities.TotalMoney;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TotalMoneyRepository extends JpaRepository<TotalMoney, Long> {
    TotalMoney findByDateAndMember_MemberNo(String date, Long memberNo);
}
