package com.mohani_be.controllers.member;

import com.mohani_be.commons.Utils;
import com.mohani_be.commons.exceptions.BadRequestException;
import com.mohani_be.commons.rests.JSONData;
import com.mohani_be.entities.Member;
import com.mohani_be.models.member.MemberInfo;
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

    @PostMapping("/join")
    public ResponseEntity<JSONData> join(@RequestBody @Valid RequestJoin form, Errors errors) {
        saveService.save(form, errors);

        errorProcess(errors);

        JSONData data = new JSONData();
        data.setStatus(HttpStatus.CREATED);

        return ResponseEntity.status(data.getStatus()).body(data);
    }

    @PostMapping("/login")
    public ResponseEntity<JSONData> login(@RequestBody @Valid RequestLogin form, Errors errors) {

        errorProcess(errors);

        JSONData data = new JSONData();
        HttpHeaders headers = new HttpHeaders();

        return ResponseEntity.status(data.getStatus()).headers(headers).body(data);

    }

    @GetMapping("/info")
    public JSONData info(@AuthenticationPrincipal MemberInfo memberInfo) {

        Member member = memberInfo.getMember();

        return new JSONData(member);
    }

    private void errorProcess(Errors errors) {
        if (errors.hasErrors()) {
            throw new BadRequestException(Utils.getMessages(errors));
        }
    }
}
