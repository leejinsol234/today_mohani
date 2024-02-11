package com.mohani_be.controllers.schedule;

import com.mohani_be.commons.Utils;
import com.mohani_be.commons.exceptions.BadRequestException;
import com.mohani_be.entities.Schedule;
import com.mohani_be.models.schedule.ScheduleDeleteService;
import com.mohani_be.models.schedule.ScheduleInfoService;
import com.mohani_be.models.schedule.ScheduleSaveService;
import com.mohani_be.models.schedule.ScheduleUpdateService;
import com.mohani_be.repositories.ScheduleRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/mohani")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleSaveService saveService;
    private final ScheduleRepository repository;
    private final ScheduleInfoService infoService;
    private final ScheduleDeleteService deleteService;
    private final ScheduleUpdateService updateService;


    @PostMapping("/main")
    public ResponseEntity<?> post(@RequestBody @Valid ScheduleForm form, Errors errors){
        saveService.save(form, errors);

        if(errors.hasErrors()){
            return ResponseEntity.badRequest().body("유효성 검사 실패");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(form);
    }


    @GetMapping("/{memberNo}")
    public ResponseEntity<List<Schedule>> getSchedulesByMemberNo(@PathVariable("memberNo") Long memberNo){
        List<Schedule> schedules = infoService.findByMemberNo(memberNo);

        if(schedules.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(schedules);
    }

    @DeleteMapping("/{seq}")
    public ResponseEntity<?> delete(@PathVariable("seq") Long seq){
        deleteService.delete(seq);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{seq}")
    public ResponseEntity<?> update(@PathVariable("seq")Long seq, @RequestBody @Valid ScheduleForm updateSchedule, Errors errors){
        Schedule schedule = updateService.update(seq, updateSchedule);

        return ResponseEntity.ok(schedule);
    }

    private void errorProcess(Errors errors){
        if(errors.hasErrors()){
            throw new BadRequestException(Utils.getMessages(errors));
        }
    }

}
