package com.mohani_be.models.accounts;

import com.mohani_be.entities.Accounts;
import com.mohani_be.repositories.AccountsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountsDeleteService {

    private final AccountsRepository repository;
    private final AccountsInfoService infoService;

    public void delete(Long idx) {
        Accounts accounts = infoService.get(idx);
        repository.delete(accounts);
        repository.flush();
    }
}
