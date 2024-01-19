package com.mohani_be.controllers;

import com.mohani_be.entities.Schedule;
import com.mohani_be.models.dto.ResponseDTO;
import com.mohani_be.models.dto.ScheduleDTO;
import com.mohani_be.models.schedule.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("mohani")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @GetMapping("/schedule")
    public ResponseEntity<?> scheduleInfo(){
        String str = scheduleService.testService();
        List<String> list = new ArrayList<>();
        list.add(str);
        ResponseDTO<String> response = ResponseDTO.<String>builder().data(list).build();
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<?> createSchedule(@RequestBody ScheduleDTO dto){
        try{
            String temporaryMemberEmail = "temporary_user"; //임시 사용자 계정

            //1. Schedule Entity로 변환한다.
            Schedule scheduleEn = ScheduleDTO.toEntity(dto);

//            //2. 생성 당시에는 email이 없어야 하기 때문에 email을 null로 초기화한다.
//            scheduleEn.setEmail(null);
//
//            //3. 임시 유저 아이디를 설정해준다.
//            //(인증 및 인가 기능 없으므로 한 유저만 로그인 없이 사용 가능한 셈이다.
//            scheduleEn.setEmail(temporaryMemberEmail);

            //4. 서비스를 이용해 Schedule 엔티티 생성
            List<Schedule> schedules = scheduleService.create(scheduleEn);

            //5. 반환받은 엔티티 리스트를 ScheduleDTO 리스트로 변환한다.
            List<ScheduleDTO> dtos = schedules.stream().map(ScheduleDTO::new).collect(Collectors.toList());

            //6. 변환된 ScheduleDTO 리스트를 이용해 ResponseDTO를 초기화한다.
            ResponseDTO<ScheduleDTO> response = ResponseDTO.<ScheduleDTO>builder().data(dtos).build();

            //7. ResponseDTO를 반환
            return ResponseEntity.ok().body(response);
        } catch (Exception e){
            //8. 예외 발생 시 dto 대신 error에 메시지를 넣어 리턴한다.
            String error = e.getMessage();
            ResponseDTO<ScheduleDTO> response = ResponseDTO.<ScheduleDTO>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

}
