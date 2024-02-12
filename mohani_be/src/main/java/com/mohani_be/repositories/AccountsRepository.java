package com.mohani_be.repositories;

import com.mohani_be.entities.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountsRepository extends JpaRepository<Accounts, Long>, QuerydslPredicateExecutor<Accounts>  {
}
