package com.mohani_be.repositories;

import com.mohani_be.entities.TotalMoney;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TotalMoneyRepository extends JpaRepository<TotalMoney, Long> {

    TotalMoney findByMonthAndYearAndMember_MemberNo(int month, int year, Long memberNo);

    List<TotalMoney> findByMember_MemberNo(Long memberNo);

}
