package com.home.homemanage.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

/**
 * 类名称:Permissions
 * 类描述:TODO
 * 创建人:Owner
 * 创建时间:2020/1/7 15:18
 * Version 1.0
 */
@Entity
@Table(name = "sys_menu")
@Data
public class Menu {

    @Id
    @GeneratedValue
    @Column(name = "menu_id", unique = true, length = 32, nullable = false)
    private String menuId;

    /**
     * 上级菜单ID
     */
    @Column(name = "parent_id", nullable = false,length = 32)
    private Long parentId;

    /**
     * 菜单/按钮名称
     */
    @Column(name = "menu_name", nullable = false,length = 10)
    @NotBlank(message = "{required}")
    @Size(max = 10, message = "{noMoreThan}")
    private String menuName;

    /**
     * 菜单URL
     */
    @Column(name = "url", nullable = false,length = 50)
    @Size(max = 50, message = "{noMoreThan}")
    private String url;

    /**
     * 权限标识
     */
    @Column(name = "perms", nullable = false,length = 50)
    @Size(max = 50, message = "{noMoreThan}")
    private String perms;

    /**
     * 图标
     */
    @Column(name = "icon", nullable = false,length = 50)
    @Size(max = 50, message = "{noMoreThan}")
    private String icon;

    /**
     * 类型 0菜单 1按钮
     */
    @Column(name = "type", nullable = false)
    @NotBlank(message = "{required}")
    private String type;

    /**
     * 排序
     */
    @Column(name = "order_num", nullable = false)
    private Long orderNum;

    /** 创建日期 */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_date", nullable = false)
    @CreatedDate
    private Date createDate;

    /** 修改时间 */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "update_date", nullable = false)
    private Date updateDate;
}
