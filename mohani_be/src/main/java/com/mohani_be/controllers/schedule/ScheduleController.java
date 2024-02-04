package com.mohani_be.controllers.schedule;

import com.mohani_be.commons.Utils;
import com.mohani_be.commons.exceptions.BadRequestException;
import com.mohani_be.commons.rests.JSONData;
import com.mohani_be.entities.Schedule;
import com.mohani_be.models.schedule.ScheduleInfoService;
import com.mohani_be.models.schedule.ScheduleSaveService;
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

    @PostMapping("/post")
    public ResponseEntity<JSONData> post(@RequestBody @Valid ScheduleForm form, Errors errors) {
        saveService.save(form, errors);

        errorProcess(errors);

        JSONData data = new JSONData();
        data.setStatus(HttpStatus.CREATED);
        data.setData(form);


        return ResponseEntity.status(data.getStatus()).body(data);
    }

/*
    @GetMapping()
    public List<Schedule> getAllSchedules(){
        return repository.findAll();
    }

*/
    /*@GetMapping("/{memberNo}")
    public ResponseEntity<?> getSchedulesByMemberNo(@RequestParam Long memberNo, @Valid @RequestBody ScheduleForm form, Errors errors){
        Optional<Member> schedule = memberRepository.findByMemberNo(memberNo);
        System.out.println(schedule);

        if(schedule == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.status(HttpStatus.OK).body(form);
    }*/

    @GetMapping("/{memberNo}")
    public ResponseEntity<List<Schedule>> getSchedulesByMemberNo(@PathVariable("memberNo") Long memberNo) {

        List<Schedule> schedules = infoService.findByMemberNo(memberNo);
        System.out.println(schedules);

        if (schedules.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(schedules);

    }

    private void errorProcess(Errors errors) {
        if (errors.hasErrors()) {
            throw new BadRequestException(Utils.getMessages(errors));
        }
    }
}
