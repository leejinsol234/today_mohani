package com.mohani_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@Builder
@NoArgsConstructor @AllArgsConstructor
public class Accounts extends Base {

    @Id
    @GeneratedValue
    private Long idx; // 번호

    @Column(nullable = false)
    private Long accounts; //금액

    @Column(nullable = false)
    private String date; // 날짜

    @Column(nullable = false)
    private boolean in_ex; // true = 수입 , false = 지출

    @Lob
    private String memo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="memberNo")
    private Member member;
}
