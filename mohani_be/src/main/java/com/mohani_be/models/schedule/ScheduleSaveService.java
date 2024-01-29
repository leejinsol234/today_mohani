package com.mohani_be.models.schedule;

import com.mohani_be.controllers.schedule.ScheduleForm;
import com.mohani_be.controllers.schedule.ScheduleFormValidator;
import com.mohani_be.entities.Schedule;
import com.mohani_be.repositories.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;


@Service
@RequiredArgsConstructor
public class ScheduleSaveService {

    private final ScheduleRepository repository;
    private final ScheduleFormValidator validator;

    public void save(ScheduleForm form, Errors errors){
        validator.validate(form, errors);

        if(errors.hasErrors()){
            return;
        }

        Schedule schedule = Schedule.builder()
                .title(form.getTitle())
                .content(form.getContent())
                .startDate(form.getStartDate())
                .endDate(form.getEndDate())
                .startTime(form.getStartTime())
                .endTime(form.getEndTime())
                .loc(form.getLoc())
                .build();

        save(schedule);
    }

    public Schedule save(Schedule schedule) {
        return repository.save(schedule);
    }

}

