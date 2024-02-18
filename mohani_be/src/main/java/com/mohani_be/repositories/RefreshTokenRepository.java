package com.mohani_be.repositories;

import com.mohani_be.entities.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long>, QuerydslPredicateExecutor<RefreshToken> {

    Optional<RefreshToken> findByMember_MemberNo(Long memberNo);
}
