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
    public TotalMoney getTotal(int month, int year, Long memberNo) {

        QAccounts accounts = QAccounts.accounts;

        // 해당 월의 지출 합계 구하기
        Long expenditure = queryFactory.select(accounts.money.sum())
                .from(accounts)
                .where(accounts.year.eq(year).and(accounts.month.eq(month))
                        .and(accounts.in_ex.eq(false))
                        .and(accounts.member.memberNo.eq(memberNo)))
                .fetchOne();

        // 해당 월의 수입 합계 구하기
        Long income = queryFactory.select(accounts.money.sum())
                .from(accounts)
                .where(accounts.year.eq(year).and(accounts.month.eq(month))
                        .and(accounts.in_ex.eq(true))
                        .and(accounts.member.memberNo.eq(memberNo)))
                .fetchOne();

        // 기존에 해당 월의 데이터가 있는지 확인
        TotalMoney existingTotalMoney = moneyRepository.findByMonthAndYearAndMember_MemberNo(month, year, memberNo);

        // 기존 데이터가 없으면 새로운 TotalMoney 엔티티 생성
        if (existingTotalMoney == null) {
            return saveNewTotalMoney(month, year, expenditure, income, memberNo);
        } else { // 기존 데이터가 있으면 수정
            return updateExistingTotalMoney(existingTotalMoney, expenditure, income);
        }
    }

    // 새로운 TotalMoney 엔티티를 저장하고 반환
    private TotalMoney saveNewTotalMoney(int month, int year, Long expenditure, Long income, Long memberNo) {
        return moneyRepository.save(
                TotalMoney.builder()
                        .month(month)
                        .year(year)
                        .expenditure(expenditure != null ? expenditure : 0L)
                        .income(income != null ? income : 0L)
                        .member(Member.builder().memberNo(memberNo).build())
                        .build()
        );
    }

    // 기존 TotalMoney 엔티티를 업데이트하고 반환
    private TotalMoney updateExistingTotalMoney(TotalMoney existingTotalMoney, Long expenditure, Long income) {
        // 기존 데이터가 있으면 수정
        existingTotalMoney.setExpenditure(expenditure != null ? expenditure : 0L);
        existingTotalMoney.setIncome(income != null ? income : 0L);

        return moneyRepository.save(existingTotalMoney);
    }
}
