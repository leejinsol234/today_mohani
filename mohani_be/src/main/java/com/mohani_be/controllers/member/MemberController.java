package com.mohani_be.controllers.member;

import com.mohani_be.commons.Utils;
import com.mohani_be.commons.exceptions.BadRequestException;
import com.mohani_be.commons.rests.JSONData;
import com.mohani_be.entities.Member;
import com.mohani_be.models.member.MemberInfo;
import com.mohani_be.models.member.MemberLoginService;
import com.mohani_be.models.member.MemberSaveService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mohani")
public class MemberController {

    private final MemberSaveService saveService;
    private final MemberLoginService loginService;

    @PostMapping("/join")
    public ResponseEntity<JSONData> join(@RequestBody @Valid RequestJoin form, Errors errors) {
        saveService.save(form, errors);

        errorProcess(errors);

        JSONData data = new JSONData();
        data.setStatus(HttpStatus.CREATED);
        data.setData(form); // 데이터 확인 용도로 임시 추가

        return ResponseEntity.status(data.getStatus()).body(data);
    }

    @PostMapping("/login")
    public ResponseEntity<JSONData> login(@RequestBody @Valid RequestLogin form, Errors errors) {

        errorProcess(errors);

        String accessToken = loginService.login(form, errors);

        /**
         * 1. 응답 body - JSONData 형식으로
         * 2. 응답 헤더 - Authorization: Bearer 토큰
         */

        JSONData data = new JSONData(accessToken);
        data.setData(form); // 데이터 확인 용도로 임시 추가
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);

        return ResponseEntity.status(data.getStatus()).headers(headers).body(data);
    }

    @GetMapping("/info")
    public JSONData info(@AuthenticationPrincipal MemberInfo memberInfo) {

        Member member = memberInfo.getMember();
        //String userNm = member.getUsername();

        /*Member member = Member.builder()
                .username(memberInfo.getUsername())
                .build();*/

        return new JSONData(member);
    }

    private void errorProcess(Errors errors) {
        if (errors.hasErrors()) {
            throw new BadRequestException(Utils.getMessages(errors));
        }
    }
}
