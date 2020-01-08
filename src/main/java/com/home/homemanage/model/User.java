package com.home.homemanage.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
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
    @Column(name = "user_id", unique = true, nullable = false, length = 32)
    private String userId;

    /** 登录账号 */
    @Column(name = "login_name", nullable = false, length = 50)
    @Size(max = 50)
    private String loginName;

    /** 用户名称 */
    @Column(name = "user_name", nullable = false, length = 50)
    private String userName;

    /** 登录密码 */
    @Column(name = "password", nullable = false, length = 32)
    @JsonIgnore
    private String password;

    @Column(name = "sex", nullable = false)
    @NotBlank(message = "{required}")
    private byte sex;

    /**
     * 邮箱
     */
    @Column(name = "email", nullable = true, length = 50)
    @Size(max = 50, message = "{noMoreThan}")
    @Email(message = "{email}")
    private String email;

    /**
     * 联系电话
     */
    @Column(name = "mobile", nullable = true)
    private String mobile;

    /** 用户状态 */
    @Column(name = "enabled", nullable = false, length = 1)
    private Integer enabled;

    /** 注册日期 */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_date", nullable = false)
    @CreatedDate
    private Date createDate;

    /** 修改时间 */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "update_date", nullable = false)
    private Date updateDate;

    /**
     * 最近访问时间
     */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "last_login_time", nullable = false)
    private Date lastLoginTime;

    /**
     * 用户的角色
     */
    @ManyToOne(cascade={CascadeType.MERGE,CascadeType.REFRESH},optional=false)//可选属性optional=false,表示author不能为空。删除文章，不影响用户
    @JoinColumn(name="role_id")
    private Role role;
}
