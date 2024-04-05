package com.mohani_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TotalMoney extends Base {

    @Id
    @GeneratedValue
    private Long idx;

    @Column
    private Long expenditure; // 총 지출

    @Column
    private Long income; // 총 수입

    @Column(nullable = false)
    private int month; // 월

    @Column(nullable = false)
    private int year; // 년도

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="memberNo")
    private Member member;
}
