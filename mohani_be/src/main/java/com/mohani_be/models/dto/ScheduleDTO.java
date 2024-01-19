package com.mohani_be.models.dto;

import com.mohani_be.entities.Schedule;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ScheduleDTO {
    private long scheduleNo;
    private String title;
    private String scheduleDate;
    private String content;
    private String loc;
    private LocalDateTime regDate;

    public ScheduleDTO(final Schedule scheduleEn){
        this.scheduleNo = scheduleEn.getScheduleNo();
        this.title = scheduleEn.getTitle();
        this.scheduleDate = scheduleEn.getScheduleDate();
        this.content = scheduleEn.getContent();
        this.loc = scheduleEn.getLoc();
        this.regDate = scheduleEn.getRegDate();
    }

    public static Schedule toEntity(final ScheduleDTO dto){
        return Schedule.builder()
                .scheduleNo(dto.getScheduleNo())
                .title(dto.getTitle())
                .scheduleDate(dto.getScheduleDate())
                .content(dto.getContent())
                .loc(dto.getLoc())
                .regDate(dto.getRegDate())
                .build();
    }

}
