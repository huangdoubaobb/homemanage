package com.home.homemanage.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

/**
 * 类名称:Role
 * 类描述:TODO
 * 创建人:Owner
 * 创建时间:2020/1/7 15:08
 * Version 1.0
 */
@Entity
@Table(name = "sys_role")
@Data
public class Role {

    /** 主键 */
    @Id
    @GeneratedValue
    @Column(name = "ID", unique = true, length = 32, nullable = false)
    private String id;

    private String roleName;

    @JoinTable(name="sys_role_to_permissions",
            //中间表product_id字段
            joinColumns={@JoinColumn(name="employee_id",referencedColumnName="id")},
            inverseJoinColumns={@JoinColumn(name="project_id",referencedColumnName="id")}
    )
    @ManyToMany
    List<Permissions> permissions;
}
