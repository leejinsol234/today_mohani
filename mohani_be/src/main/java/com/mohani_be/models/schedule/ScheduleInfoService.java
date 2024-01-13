package com.mohani_be.models.schedule;

import com.mohani_be.repositories.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScheduleInfoService {

    private final ScheduleRepository scheduleRepository;
}
