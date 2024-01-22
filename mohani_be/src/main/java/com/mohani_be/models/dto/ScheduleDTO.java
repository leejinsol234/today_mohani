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
    private String dateS;
    private String dateE;
    private String content;
    private String loc;


    public ScheduleDTO(final Schedule entity){
        this.seq = entity.getSeq();
        this.title = entity.getTitle();
        this.dateS = entity.getDateS();
        this.dateE = entity.getDateE();
        this.content = entity.getContent();
        this.loc = entity.getLoc();

    }

    public static Schedule toEntity(final ScheduleDTO dto){
        return Schedule.builder()
                .seq(dto.getSeq())
                .title(dto.getTitle())
                .dateS(dto.getDateS())
                .dateE(dto.getDateE())
                .content(dto.getContent())
                .loc(dto.getLoc())
                .build();
    }

}
