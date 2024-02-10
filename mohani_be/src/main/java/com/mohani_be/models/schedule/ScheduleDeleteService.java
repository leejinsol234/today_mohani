package com.mohani_be.models.schedule;


import com.mohani_be.entities.Schedule;
import com.mohani_be.repositories.ScheduleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class ScheduleDeleteService {

    private final ScheduleInfoService infoService;
    private final ScheduleRepository repository;

    public void delete(Long seq){
        Schedule schedule = infoService.get(seq);
        repository.delete(schedule);
        repository.flush();
    }
}
