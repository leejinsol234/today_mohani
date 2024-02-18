package com.mohani_be.entities;

import com.mohani_be.commons.exceptions.InvalidRefreshTokenException;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@AllArgsConstructor
public class RefreshToken extends Base {

    @Id @GeneratedValue
    private Long tokenId;

    @Column
    private String token;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="memberNo")
    private Member member;

    protected RefreshToken() {

    }

    public RefreshToken(Member member, String token) {
        this.member = member;
        this.token = token;
    }

    public void validateSameToken(String token) {
        if (!this.token.equals(token)) {
            throw new InvalidRefreshTokenException();
        }
    }
}
