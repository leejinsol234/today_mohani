package com.mohani_be.repository;

import com.mohani_be.entities.Schedule;
import com.mohani_be.repositories.ScheduleRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDateTime;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.yml")
public class ScheduleRepositoryTest {

    @Autowired
    ScheduleRepository scheduleRepository;

    @Test
    @DisplayName("일정 저장 테스트")
    public void createScheduleDataTest(){
        Schedule schedule = new Schedule();
        schedule.setTitle("일정 제목");
        schedule.setContent("일정 내용");
        schedule.setScheduleDate("202401151240");
        schedule.setRegDate(LocalDateTime.now());
        schedule.setScheduleNo(schedule.getScheduleNo());
        schedule.setLoc("부평");

        Schedule saveScheduleData = scheduleRepository.save(schedule);
        System.out.println(saveScheduleData);
    }
}
