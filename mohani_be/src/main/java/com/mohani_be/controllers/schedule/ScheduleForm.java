package com.mohani_be.controllers.schedule;

import com.mohani_be.entities.Member;
import com.mohani_be.entities.Schedule;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleForm {

    private Long seq;

    private Member memberNo;

    @NotBlank
    private String title;

    private String startDate;
    private String endDate;

    private String startTime;
    private String endTime;

    private String content;

    private String loc;

    public ScheduleForm(final Schedule entity) {
        this.seq = entity.getSeq();
        this.title = entity.getTitle();
        this.memberNo = entity.getMember();
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
                .member(form.getMemberNo())
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
