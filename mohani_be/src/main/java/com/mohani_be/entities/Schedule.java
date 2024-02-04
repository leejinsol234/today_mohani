package com.mohani_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;


@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Schedule extends Base{

    @Id
    @GeneratedValue
    private Long seq; //일정 번호

    @ManyToOne(fetch = FetchType.EAGER) // Lazy로 설정하면 DB상으로는 잘 저장되지만 500에러를 발생시키므로 EAGER로 변경
    @JoinColumn(name="memberNo")
    private Member member; // 변수명 변경

    @Column(nullable = false, length = 100)
    private String title; //일정 제목

    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;

    @Lob
    private String content; //일정 내용

    private String loc; //일정 장소

}
