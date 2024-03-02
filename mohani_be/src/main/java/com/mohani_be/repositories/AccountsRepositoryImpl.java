package com.mohani_be.repositories;

import com.mohani_be.controllers.accounts.AccountsTotalMoney;
import com.mohani_be.entities.QAccounts;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AccountsRepositoryImpl implements AccountsRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    // 총 수입, 총 지출 계산
    @Override
    public AccountsTotalMoney getTotal(String date) {

        QAccounts accounts = QAccounts.accounts;

        Long expenditure = queryFactory.select(accounts.money.sum())
                .from(accounts)
                .where(accounts.date.eq(date).and(accounts.in_ex.eq(false)))
                .fetchOne();

        Long income = queryFactory.select(accounts.money.sum())
                .from(accounts)
                .where(accounts.date.eq(date).and(accounts.in_ex.eq(true)))
                .fetchOne();

        AccountsTotalMoney moneySummaryDTO = new AccountsTotalMoney();
        moneySummaryDTO.setExpenditure(expenditure != null ? expenditure : 0L);
        moneySummaryDTO.setIncome(income != null ? income : 0L);

        return moneySummaryDTO;
    }
}
