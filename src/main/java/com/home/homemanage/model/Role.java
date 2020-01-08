package com.home.homemanage.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;
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
    @Column(name = "role_id", unique = true, length = 32, nullable = false)
    private String roleId;

    private String roleName;

    private String remark;

    /** 创建日期 */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_date", nullable = false)
    @CreatedDate
    private Date createDate;

    /** 修改时间 */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "update_date", nullable = false)
    private Date updateDate;

    @JoinTable(name="role_menu",
            joinColumns={@JoinColumn(name="role_id")},
            inverseJoinColumns={@JoinColumn(name="menu_id")}
    )
    @ManyToMany
    List<Menu> permissions;
}
