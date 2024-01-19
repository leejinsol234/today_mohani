package com.mohani_be.repositories;

import com.mohani_be.entities.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule,Long>, QuerydslPredicateExecutor<Schedule> {

    List<Schedule> findByTitle(String title);

    //List<Schedule> findByScheduleTitleOrderByScheduleDateAsc(String scheduleDate);
}
