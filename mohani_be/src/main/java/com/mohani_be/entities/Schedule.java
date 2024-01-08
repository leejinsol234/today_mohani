package com.mohani_be.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Schedule {

    @Id
    private long scheduleNo;

    private String title;

    private String email;

}
