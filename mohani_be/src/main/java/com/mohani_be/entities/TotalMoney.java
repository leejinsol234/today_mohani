package com.mohani_be.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TotalMoney {

    @Id
    @GeneratedValue
    private Long idx;

    @Column
    private Long expenditure; // 총 지출

    @Column
    private Long income; // 총 수입

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="memberNo")
    private Member member;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="date")
    private Accounts accounts;
}
