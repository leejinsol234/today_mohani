package com.mohani_be.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Accounts {

    @Id
    private long accounts;
}
