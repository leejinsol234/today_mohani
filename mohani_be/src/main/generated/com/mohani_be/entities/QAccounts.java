package com.mohani_be.entities;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAccounts is a Querydsl query type for Accounts
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAccounts extends EntityPathBase<Accounts> {

    private static final long serialVersionUID = 2047526724L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAccounts accounts = new QAccounts("accounts");

    public final QBase _super = new QBase(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath date = createString("date");

    public final NumberPath<Long> idx = createNumber("idx", Long.class);

    public final BooleanPath in_ex = createBoolean("in_ex");

    public final QMember member;

    public final StringPath memo = createString("memo");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final NumberPath<Long> money = createNumber("money", Long.class);

    public QAccounts(String variable) {
        this(Accounts.class, forVariable(variable), INITS);
    }

    public QAccounts(Path<? extends Accounts> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAccounts(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAccounts(PathMetadata metadata, PathInits inits) {
        this(Accounts.class, metadata, inits);
    }

    public QAccounts(Class<? extends Accounts> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

