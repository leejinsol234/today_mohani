package com.mohani_be.models.dto;

import com.mohani_be.entities.Schedule;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ScheduleDTO {
    private long seq;
    private String title;
    private String scheduleDate;
    private String content;
    private String loc;

    public ScheduleDTO(final Schedule scheduleEn){
        this.seq = scheduleEn.getSeq();
        this.title = scheduleEn.getTitle();
        this.scheduleDate = scheduleEn.getScheduleDate();
        this.content = scheduleEn.getContent();
        this.loc = scheduleEn.getLoc();

    }

    public static Schedule toEntity(final ScheduleDTO dto){
        return Schedule.builder()
                .seq(dto.getSeq())
                .title(dto.getTitle())
                .scheduleDate(dto.getScheduleDate())
                .content(dto.getContent())
                .loc(dto.getLoc())
                .build();
    }

}
