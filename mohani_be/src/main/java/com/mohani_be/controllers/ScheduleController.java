package com.mohani_be.controllers;

import com.mohani_be.entities.Schedule;
import com.mohani_be.repositories.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("mohani/schedule")
public class ScheduleController {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @GetMapping("/schedule")
    public String getSchedule(Model model){
        List<Schedule> schedules = scheduleRepository.findAll();
        model.addAttribute("schedule", schedules);
        model.addAttribute("newSchedule",new Schedule());
        return "schedule";
    }

    @PostMapping("/schedule")
    public String addSchedule(Schedule schedule){
        scheduleRepository.save(schedule);
        return "redirect:/schedule";
    }
}
