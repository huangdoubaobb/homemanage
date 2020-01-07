package com.home.homemanage.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

/**
 * 类名称:User
 * 类描述:TODO
 * 创建人:Owner
 * 创建时间:2020/1/6 19:41
 * Version 1.0
 */
@Entity
@Table(name = "sys_user")
@Data
public class User {

    @Id
    @GeneratedValue
    @Column(name = "ID", unique = true, nullable = false, length = 32)
    private String id;

    /** 登录账号 */
    @Column(name = "login_name", nullable = false, length = 50)
    @Size(max = 50)
    private String loginName;

    /** 用户名称 */
    @Column(name = "user_name", nullable = true, length = 50)
    private String userName;

    /** 登录密码 */
    @Column(name = "password", nullable = false, length = 32)
    @JsonIgnore
    private String password;


    /** 用户状态 */
    @Column(name = "enabled", nullable = false, length = 1)
    private Integer enabled;

    /** 注册日期 */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_date", nullable = false)
    @CreatedDate
    private Date createDate;

    /** 注册日期 */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "update_date", nullable = false)
    @CreatedDate
    private Date updateDate;

    /**
     * 用户的角色
     */
    @ManyToOne(cascade = {}, fetch = FetchType.EAGER)
    @JoinColumn(name = "ROLE_ID")
    private Role role;
}
