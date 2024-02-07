package com.mohani_be.controllers.schedule;

import com.mohani_be.entities.Member;
import com.mohani_be.models.schedule.ScheduleSaveService;
import com.mohani_be.repositories.MemberRepository;
import com.mohani_be.repositories.ScheduleRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/mohani")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleSaveService saveService;
    private final ScheduleRepository repository;
    private final MemberRepository memberRepository;


    @PostMapping("/post")
    public ResponseEntity<?> post(@RequestBody @Valid ScheduleForm form, Errors errors){
        saveService.save(form, errors);

        if(errors.hasErrors()){
            return ResponseEntity.badRequest().body("유효성 검사 실패");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(form);
    }

/*
    @GetMapping()
    public List<Schedule> getAllSchedules(){
        return repository.findAll();
    }

*/
    @GetMapping("/{memberNo}")
    public ResponseEntity<?> getSchedulesByMemberNo(Long memberNo, @Valid @RequestBody ScheduleForm form, Errors errors){
        Optional<Member> schedule = memberRepository.findByMemberNo(memberNo);
        if(schedule == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(schedule);
    }








}
