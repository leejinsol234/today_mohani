package com.mohani_be.repository;

import com.mohani_be.entities.Schedule;
import com.mohani_be.repositories.ScheduleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.yml")
public class ScheduleRepositoryTest {

    @Autowired
    ScheduleRepository scheduleRepository;


    @BeforeEach
    public void createSchedules(){
        for(int i=1; i<=5; i++) {
            Schedule schedule = new Schedule();
            schedule.setTitle("일정 제목" + i);
            schedule.setContent("일정 내용" + i);
            schedule.setScheduleDate("202401151240");
            schedule.setRegDate(LocalDateTime.now());
            schedule.setScheduleNo(schedule.getScheduleNo());
            schedule.setLoc("부평");

            Schedule saveSchedule = scheduleRepository.save(schedule);
        }
    }

    @Test
    @DisplayName("일정 제목 조회 테스트")
    public void findByTitleTest(){
        this.createSchedules();
        List<Schedule> schedules = scheduleRepository.findByTitle("일정 제목1");
        for(Schedule schedule : schedules){
            System.out.println(schedule);
        }

    }

//    @Test
//    @DisplayName("가까운 일정 오름차순 조회")
//    public void findByScheduleTitleOrderByScheduleDateAsc(){
//        this.createSchedules();
//        List<Schedule> schedules = scheduleRepository.findByScheduleTitleOrderByScheduleDateAsc("0");
//        for(Schedule schedule : schedules){
//            System.out.println(schedule);
//        }
//    }
}
