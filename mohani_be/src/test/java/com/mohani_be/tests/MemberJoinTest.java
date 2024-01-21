package com.mohani_be.tests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mohani_be.controllers.member.RequestJoin;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
public class MemberJoinTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("회원 가입 테스트")
    void joinTest() throws Exception {
        RequestJoin form = RequestJoin.builder()
                .email("user01@test.com")
                .password("_aA123456")
                .confirmPassword("_aA123456")
                .name("사용자01")
                .phoneNumber("010-1111-1111")
                .agree(true)
                .build();

        // ObjectMapper: Spring 내장 클래스
        // Java -> JSON으로, JSON을 Java 형태로 변환해준다
        ObjectMapper om = new ObjectMapper();
        String params = om.writeValueAsString(form);

        mockMvc.perform(
                post("/mohani/join")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .characterEncoding("UTF-8")
                        .content(params)
                        //.with(csrf().asHeader()) // test를 위해 csrf() 토큰 추가
                ).andDo(print());
    }

}
