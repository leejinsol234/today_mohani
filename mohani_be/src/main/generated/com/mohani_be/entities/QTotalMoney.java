package com.mohani_be.entities;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTotalMoney is a Querydsl query type for TotalMoney
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTotalMoney extends EntityPathBase<TotalMoney> {

    private static final long serialVersionUID = 659319738L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTotalMoney totalMoney = new QTotalMoney("totalMoney");

    public final QBase _super = new QBase(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath date = createString("date");

    public final NumberPath<Long> expenditure = createNumber("expenditure", Long.class);

    public final NumberPath<Long> idx = createNumber("idx", Long.class);

    public final NumberPath<Long> income = createNumber("income", Long.class);

    public final QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public QTotalMoney(String variable) {
        this(TotalMoney.class, forVariable(variable), INITS);
    }

    public QTotalMoney(Path<? extends TotalMoney> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTotalMoney(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTotalMoney(PathMetadata metadata, PathInits inits) {
        this(TotalMoney.class, metadata, inits);
    }

    public QTotalMoney(Class<? extends TotalMoney> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

