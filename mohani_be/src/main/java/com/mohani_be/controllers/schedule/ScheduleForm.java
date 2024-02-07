package com.mohani_be.controllers.schedule;

import com.mohani_be.entities.Member;
import com.mohani_be.entities.Schedule;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleForm {

    //private String mode = "post";

    private Long seq;

    private Member memberNo;

    @NotBlank
    private String title;

    private LocalDate startDate;
    private LocalDate endDate;

    private LocalTime startTime;
    private LocalTime endTime;

    private String content;
    private String loc;

    public ScheduleForm(final Schedule entity) {
        this.seq = entity.getSeq();
        this.title = entity.getTitle();
        this.memberNo = entity.getMemberNo();
        this.startDate = entity.getStartDate();
        this.endDate = entity.getEndDate();
        this.startTime = entity.getStartTime();
        this.endTime = entity.getEndTime();
        this.content = entity.getContent();
        this.loc = entity.getLoc();
    }

    public static Schedule toEntity(final ScheduleForm form){
        return Schedule.builder()
                .seq(form.getSeq())
                .memberNo(form.getMemberNo())
                .title(form.getTitle())
                .content(form.getContent())
                .startDate(form.getStartDate())
                .endDate(form.getEndDate())
                .startTime(form.getStartTime())
                .endTime(form.getEndTime())
                .loc(form.getLoc())
                .build();
    }
}