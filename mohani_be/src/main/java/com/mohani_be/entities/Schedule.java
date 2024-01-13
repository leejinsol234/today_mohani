package com.mohani_be.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;


@Data
@Entity
public class Schedule {

    @Id
    private long scheduleNo;

    @Column(nullable = false, length = 100)
    private String title;

    private LocalDate date;

}
