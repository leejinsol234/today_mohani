package com.mohani_be.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;


@Data
@Entity
public class Schedule {

    @Id
    @GeneratedValue
    private long scheduleNo; //일정 번호


    @Column(nullable = false, length = 100)
    private String title; //일정 제목

    @Column(nullable = false, length = 12)
    private String scheduleDate;
    //일정 날짜,시간(yyyyMMddhhmm). 년월일 등을 자유롭게 사용하기 위해 Date type이 아닌 문자열로 사용

    private String content; //일정 내용

    private String loc; //일정 장소

    @Column(nullable = false)
    private LocalDateTime regDate; //일정 작성일





}
