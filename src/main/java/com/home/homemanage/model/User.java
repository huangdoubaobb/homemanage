package com.home.homemanage.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 类名称:User
 * 类描述:TODO
 * 创建人:Owner
 * 创建时间:2020/1/6 19:41
 * Version 1.0
 */
@Entity
@Table(name = "t_user")
public class User {

    @Id
    @GeneratedValue
    private long id;
}
