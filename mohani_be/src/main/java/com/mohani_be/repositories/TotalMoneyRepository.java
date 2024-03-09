package com.mohani_be.repositories;

import com.mohani_be.entities.TotalMoney;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TotalMoneyRepository extends JpaRepository<TotalMoney, Long> {
    TotalMoney findByDateAndMember_MemberNo(String date, Long memberNo);

    List<TotalMoney> findByMember_MemberNo(Long memberNo);

    Optional<TotalMoney> findByDate(String date);
}
