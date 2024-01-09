package com.mohani_be.controllers;

import com.mohani_be.entities.Schedule;
import com.mohani_be.repositories.ScheduleRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class ScheduleController {

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