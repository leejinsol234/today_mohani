package com.mohani_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor @AllArgsConstructor
public class Accounts extends Base {

    @Id
    @GeneratedValue
    private Long idx; // 번호

    @Column(nullable = false)
    private Long money; // 금액

    @Column(nullable = false)
    private String date; // 날짜

    @Column(nullable = false)
    private boolean in_ex; // true = 수입 , false = 지출

    @Column(nullable = false)
    private int month; // 월

    @Column(nullable = false)
    private int year; // 년도

    @Column
    private String memo; // 수입, 지출에 대한 설명

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="memberNo")
    private Member member;

}
