package com.mohani_be.repositories;

import com.mohani_be.entities.TotalMoney;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TotalMoneyRepository extends JpaRepository<TotalMoney, Long> {

    Optional<TotalMoney> findByIdx(Long idx);

}
