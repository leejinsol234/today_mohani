package com.mohani_be.entities;

import com.mohani_be.commons.contants.MemberType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @Builder
@NoArgsConstructor @AllArgsConstructor
public class Member extends Base{

    @Id @GeneratedValue
    private Long memberNo;

    @Column (length = 60, nullable = false, unique = true)
    private String email;

    @Column (length = 60, nullable = false)
    private String password;

    @Column (length = 35, nullable = false)
    private String username;

    @Column (length = 13, nullable = false)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(length = 15, nullable = false)
    private MemberType type = MemberType.USER;

}
