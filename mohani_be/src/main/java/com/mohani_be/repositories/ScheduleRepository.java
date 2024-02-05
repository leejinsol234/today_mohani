package com.mohani_be.repositories;

import com.mohani_be.entities.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule,Long>, QuerydslPredicateExecutor<Schedule> {
    List<Schedule> findByMember_MemberNo(Long memberNo);


}
