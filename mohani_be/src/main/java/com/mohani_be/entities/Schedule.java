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
public class Schedule extends BaseMember{

    @Id
    @GeneratedValue
    private long seq; //일정 번호

    @Column(nullable = false, length = 100)
    private String title; //일정 제목

    @Column(nullable = false, length = 12)
    private String scheduleDate;
    //일정 날짜,시간(yyyyMMddhhmm). 년월일 등을 자유롭게 사용하기 위해 Date type이 아닌 문자열로 사용
    //문자열을 날짜 표현으로 바꿔서 테스트하기 위해 보완 필요함!!

    private String content; //일정 내용

    private String loc; //일정 장소

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="memberNo")
    private Member member;

    private String userEmail;


}
