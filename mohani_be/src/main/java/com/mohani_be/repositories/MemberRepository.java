package com.mohani_be.repositories;

import com.mohani_be.entities.Member;
import com.mohani_be.entities.QMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>, QuerydslPredicateExecutor<Member> {

    // email 조회 가능하게 추가
    // Optional로 null값 처리
    Optional<Member> findByEmail(String email);

    // email 존재 여부 검증 처리
    default boolean exists(String email) {
        return exists(QMember.member.email.eq(email));
    }

}
