package com.mohani_be.repositories;

import com.mohani_be.entities.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule,Long>, QuerydslPredicateExecutor<Schedule> {

/*
    List<Schedule> findAll();

    List<Schedule> findByMemberNo(Long memberNo);
*/

    // memberNo로 일정 조회
    List<Schedule> findByMember_MemberNo(Long memberNo);



}
