package com.mohani_be.models.schedule;


import com.mohani_be.entities.Schedule;
import com.mohani_be.repositories.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleInfoService {

    private final ScheduleRepository repository;

    // memberNo로 일정 조회 하기
    public List<Schedule> findByMemberNo(Long memberNo) {
        return repository.findByMember_MemberNo(memberNo);
    }
}
