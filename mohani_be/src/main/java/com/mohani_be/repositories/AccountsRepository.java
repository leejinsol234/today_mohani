package com.mohani_be.repositories;

import com.mohani_be.entities.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountsRepository extends JpaRepository<Accounts, Long>, QuerydslPredicateExecutor<Accounts>  {

    List<Accounts> findByMember_MemberNo(Long memberNo);

    Optional<Accounts> findByIdx(Long idx);
}
