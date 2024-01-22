package com.mohani_be.models.schedule;

import com.mohani_be.entities.Schedule;
import com.mohani_be.repositories.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduleService {

    private final ScheduleRepository repository;

    public List<Schedule> create(final Schedule entity) {
        //Validations
        validate(entity);

        repository.save(entity);
        log.info("Entity id : {} is saved", entity.getSeq());
        return repository.findByEmail(entity.getEmail());
    }

    private void validate(final Schedule entity) {
        if (entity == null) {
            log.warn("Entity cannot be null");
            throw new RuntimeException("Entity cannot be null");
        }

        if(entity.getEmail() == null) {
            log.warn("Unknown user");
            throw new RuntimeException("Unknown user");
        }
    }

    public List<Schedule> retrieve(final String email){
        return repository.findByEmail(email);
    }

/*
    public List<Schedule> update(final Schedule scheduleEn){
        //1. 저장할 엔티티가 유효한지 확인한다.
        validate(scheduleEn);

        //2. 넘겨받은 엔티티 id를 이용해 Schedule(entity)을 가져온다. 존재하지 않는 엔티티는 업데이트할 수 없기 때문이다.
        final Optional<Schedule> original = repository.findBySeq(scheduleEn.getSeq());

        original.ifPresent(modified -> {
            //3. 반환된 Schedule(entity)이 존재하면 새 entity 값으로 덮어 씌운다.
            modified.setTitle(scheduleEn.getTitle());
            modified.setContent(scheduleEn.getContent());
            modified.setLoc(scheduleEn.getLoc());
            modified.setScheduleDate(scheduleEn.getScheduleDate());

            //4. 데이터베이스에 수정된 값을 저장한다.
            repository.save(modified);
        });

        return retrieve(scheduleEn.getEmail());
    }

 */
}

