package com.mohani_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Schedule extends Base{

    @Id
    @GeneratedValue
    private Long seq; //일정 번호

    //fetch = FetchType.LAZY 로딩으로 인한 JSON 반환 오류
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="memberNo")
    private Member member;

    @Column(nullable = false, length = 100)
    private String title; //일정 제목

    private String startDate;
    private String endDate;
    private String startTime;
    private String endTime;

    @Lob
    private String content; //일정 내용

    private String loc; //일정 장소

}
