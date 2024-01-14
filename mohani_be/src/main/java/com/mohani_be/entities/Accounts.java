package com.mohani_be.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Accounts {

    @Id
    @GeneratedValue
    private long accounts; //금액

    @Column(nullable = false)
    private boolean in_ex; //수입인지 지출인지

    @Lob
    private String memo;
}
