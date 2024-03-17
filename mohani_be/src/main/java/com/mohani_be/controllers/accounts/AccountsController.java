package com.mohani_be.controllers.accounts;

import com.mohani_be.commons.Utils;
import com.mohani_be.commons.exceptions.BadRequestException;
import com.mohani_be.commons.rests.JSONData;
import com.mohani_be.entities.Accounts;
import com.mohani_be.entities.TotalMoney;
import com.mohani_be.models.accounts.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mohani/accounts")
public class AccountsController {

    private final AccountsSaveService saveService;
    private final AccountsDeleteService deleteService;
    private final AccountsInfoService infoService;
    private final AccountsUpdateService updateService;
    private final AccountsTotalMoneyInfoService moneyInfoService;

    @PostMapping("/save")
    public ResponseEntity<JSONData> save(@RequestBody @Valid AccountsForm form, Errors errors) {

        saveService.save(form, errors);

        errorProcess(errors);

        JSONData data = new JSONData();
        data.setStatus(HttpStatus.CREATED);
        data.setData(form);

        return ResponseEntity.status(data.getStatus()).body(data);
    }

    @GetMapping("/view/{memberNo}")
    public ResponseEntity<List<Accounts>> viewAccount(@PathVariable("memberNo") Long memberNo) {

        List<Accounts> accounts = infoService.findByMemberNo(memberNo);

        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/totalMoney/{memberNo}")
    public ResponseEntity<List<TotalMoney>> viewTotalMoney(@PathVariable("memberNo") Long memberNo) {

        List<TotalMoney> totalMoney = moneyInfoService.findByMemberNo(memberNo);

        return ResponseEntity.ok(totalMoney);
    }

    @PatchMapping("/update/{idx}")
    public ResponseEntity<JSONData> update(@PathVariable("idx") Long idx, @RequestBody @Valid AccountsForm form, Errors errors) {

        updateService.update(idx, form, errors);

        errorProcess(errors);

        JSONData data = new JSONData();
        data.setStatus(HttpStatus.CREATED);
        data.setData(form);

        return ResponseEntity.status(data.getStatus()).body(data);
    }

    @DeleteMapping("/del/{idx}")
    public ResponseEntity<?> del(@PathVariable("idx") Long idx) {

        deleteService.delete(idx);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    private void errorProcess(Errors errors){
        if(errors.hasErrors()){
            throw new BadRequestException(Utils.getMessages(errors));
        }
    }


}
