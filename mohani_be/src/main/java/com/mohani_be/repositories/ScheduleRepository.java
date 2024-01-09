package com.mohani_be.repositories;

import com.mohani_be.entities.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ScheduleRepository extends JpaRepository<Schedule,Long>, QuerydslPredicateExecutor<Schedule> {
}
