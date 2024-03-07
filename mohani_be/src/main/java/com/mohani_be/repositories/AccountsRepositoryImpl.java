package com.mohani_be.repositories;

import com.mohani_be.entities.Member;
import com.mohani_be.entities.QAccounts;
import com.mohani_be.entities.TotalMoney;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AccountsRepositoryImpl implements AccountsRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final TotalMoneyRepository moneyRepository;

    // 총 수입, 총 지출 계산
    @Override
    public TotalMoney getTotal(String date, Long memberNo) {

        QAccounts accounts = QAccounts.accounts;

        Long expenditure = queryFactory.select(accounts.money.sum())
                .from(accounts)
                .where(accounts.date.eq(date).and(accounts.in_ex.eq(false)))
                .fetchOne();

        Long income = queryFactory.select(accounts.money.sum())
                .from(accounts)
                .where(accounts.date.eq(date).and(accounts.in_ex.eq(true)))
                .fetchOne();

        // 기존에 해당 날짜의 데이터가 있는지 확인
        TotalMoney existingTotalMoney = moneyRepository.findByDateAndMember_MemberNo(date, memberNo);

        // 기존 데이터가 없으면 새로운 TotalMoney 엔티티 생성
        if (existingTotalMoney == null) {
            return saveNewTotalMoney(date, expenditure, income, memberNo);
        } else { // 기존 데이터가 있으면 수정
            return updateExistingTotalMoney(existingTotalMoney, expenditure, income);
        }
    }

    // 새로운 TotalMoney 엔티티를 저장하고 반환
    private TotalMoney saveNewTotalMoney(String date, Long expenditure, Long income, Long memberNo) {
        return moneyRepository.save(
                TotalMoney.builder()
                        .date(date)
                        .expenditure(expenditure != null ? expenditure : 0L)
                        .income(income != null ? income : 0L)
                        .member(Member.builder().memberNo(memberNo).build())
                        .build()
        );
    }

    // 기존 TotalMoney 엔티티를 업데이트하고 반환
    private TotalMoney updateExistingTotalMoney(TotalMoney existingTotalMoney, Long expenditure, Long income) {
        // 기존 데이터가 있으면 수정
        if (expenditure != null) {
            existingTotalMoney.setExpenditure(expenditure);
        }
        if (income != null) {
            existingTotalMoney.setIncome(income);
        }
        return moneyRepository.save(existingTotalMoney);
    }
}
