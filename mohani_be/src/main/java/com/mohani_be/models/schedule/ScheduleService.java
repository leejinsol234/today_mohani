package com.mohani_be.models.schedule;

import com.mohani_be.entities.Schedule;
import com.mohani_be.repositories.ScheduleRepository;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    public String testService() {
        // TodoEntity 생성
        Schedule entity = Schedule.builder().title("My first todo item").build();
        // TodoEntity 저장
        scheduleRepository.save(entity);
        // TodoEntity 검색
        Schedule savedEntity = scheduleRepository.findById(entity.getScheduleNo()).get();
        return savedEntity.getTitle();
    }

    public List<Schedule> create(final Schedule scheduleEn) {
        //Validations
        validate(scheduleEn);
        log.info("Entity id : {} is saved", scheduleEn.getScheduleNo());
        return scheduleRepository.findByscheduleNo(scheduleEn.getScheduleNo());
    }

    private void validate(final Schedule scheduleEn) {
        if (scheduleEn == null) {
            log.warn("Entity cannot be null");
            throw new RuntimeException("Entity cannot be null");
        }

        if(scheduleEn.getScheduleNo() == 0) {
            log.warn("Unknown user");
            throw new RuntimeException("Unknown user");
        }
    }
}

