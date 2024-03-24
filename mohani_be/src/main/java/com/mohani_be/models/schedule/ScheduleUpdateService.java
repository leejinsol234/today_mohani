package com.mohani_be.models.schedule;

import com.mohani_be.controllers.schedule.ScheduleForm;
import com.mohani_be.entities.Schedule;
import com.mohani_be.repositories.ScheduleRepository;
import org.springframework.stereotype.Service;

@Service
public class ScheduleUpdateService {

    private final ScheduleRepository repository;

    public ScheduleUpdateService(ScheduleRepository repository){
        this.repository = repository;
    }

    public Schedule update(Long seq, ScheduleForm updateSchedule){
        Schedule existingSchedule = repository.findBySeq(seq);

        existingSchedule.setTitle(updateSchedule.getTitle());
        existingSchedule.setStartDate(updateSchedule.getStartDate());
        existingSchedule.setStartTime(updateSchedule.getStartTime());
        existingSchedule.setEndDate(updateSchedule.getEndDate());
        existingSchedule.setEndTime(updateSchedule.getEndTime());
        existingSchedule.setContent(updateSchedule.getContent());
        existingSchedule.setLoc(updateSchedule.getLoc());
        existingSchedule.setColor(updateSchedule.getColor());


        return repository.save(existingSchedule);
    }
}
