package com.home.homemanage.model;

import lombok.Data;

import javax.persistence.*;

/**
 * 类名称:Permissions
 * 类描述:TODO
 * 创建人:Owner
 * 创建时间:2020/1/7 15:18
 * Version 1.0
 */
@Entity
@Table(name = "sys_permissions")
@Data
public class Permissions {

    @Id
    @GeneratedValue
    @Column(name = "ID", unique = true, length = 32, nullable = false)
    private String id;

    private String permissionsName;
}
