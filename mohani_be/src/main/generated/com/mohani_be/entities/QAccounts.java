package com.mohani_be.entities;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAccounts is a Querydsl query type for Accounts
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAccounts extends EntityPathBase<Accounts> {

    private static final long serialVersionUID = 2047526724L;

    public static final QAccounts accounts1 = new QAccounts("accounts1");

    public final NumberPath<Long> accounts = createNumber("accounts", Long.class);

    public final BooleanPath in_ex = createBoolean("in_ex");

    public final StringPath memo = createString("memo");

    public QAccounts(String variable) {
        super(Accounts.class, forVariable(variable));
    }

    public QAccounts(Path<? extends Accounts> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAccounts(PathMetadata metadata) {
        super(Accounts.class, metadata);
    }

}

