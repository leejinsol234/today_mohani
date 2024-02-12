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
    private Long seq; // 번호

    @Column(nullable = false)
    private Long accounts; //금액

    @Column(nullable = false)
    private LocalDate date; // 날짜

    @Column(nullable = false)
    private boolean in_ex; //수입인지 지출인지

    @Lob
    private String memo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="memberNo")
    private Member member;
}
